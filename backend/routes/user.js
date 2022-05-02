const express = require("express");
const pool = require("../config");
const Joi = require('joi');
const bcrypt = require('bcrypt');
const { generateToken } = require("../utils/token");
const { isLoggedIn } = require('../middlewares');

router = express.Router();

// ส่วนของ Register
const passwordValidator = (value, helpers) => {
    if (value.length < 8) {
        throw new Joi.ValidationError('Password must contain at least 8 characters')
    }
    if (!(value.match(/[a-z]/) && value.match(/[A-Z]/) && value.match(/[0-9]/))) {
        throw new Joi.ValidationError('Password must be harder 55')
    }
    return value
}

const usernameValidator = async (value, helpers) => {
    const [rows, fields] = await pool.query(
        "SELECT username FROM users WHERE username = ?",
        [value]
    )
    // แสดงว่าชื่อซ้ำ ถ้า rows > 0
    if (rows.length > 0) {
        const message = 'This user is already taken'
        throw new Joi.ValidationError(message, { message })
        // throw new Joi.ValidationError('This user is already taken')
        // throw new Joi.ValidationError('DUP_ERROR', {
        //     message: 'This user is already taken'
        // })
    }
    return value
}

const signupSchema = Joi.object({
    email: Joi.string().email().required().max(100), // ต้องกรอก และ เป็น email ที่ถูกต้อง,
    phone: Joi.string().required().pattern(/0[0-9]{9}/),
    fname: Joi.string().required().min(5).max(150),
    lname: Joi.string().required().min(5).max(150),
    password: Joi.string().required().custom(passwordValidator),
    confirm_password: Joi.string().required().equal(Joi.ref('password')),
    username: Joi.string().required().min(5).external(usernameValidator),
    birthdate: Joi.date().required(),
    address: Joi.string().required(),
    age: Joi.required()

})

router.post('/user/signup', async (req, res, next) => {
    try {
        await signupSchema.validateAsync(req.body, { abortEarly: false })
    } catch (err) {
        console.log(err)
        return res.status(400).json(err)
    }

    const conn = await pool.getConnection()
    await conn.beginTransaction()

   const username = req.body.username
   const password = await bcrypt.hash(req.body.password, 8)
   const email = req.body.email
   const fname = req.body.fname
   const lname = req.body.lname
   const birthdate = req.body.birthdate
   const age = req.body.age
   const address = req.body.address
   const phone = req.body.phone

   try {
        await conn.query(
            'INSERT INTO users(username, password, email, fname, lname, birthdate, age, address, phone) ' +
            'VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [username, password, email, fname, lname, birthdate, age, address, phone]
        )
        conn.commit()
        res.status(201).send()
    } catch (err) {
        conn.rollback()
        res.status(400).json(err.toString());
    } finally {
        conn.release()
    }
})

// ส่วนของ Login
const loginSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required()
})

router.post('/user/login', async (req, res, next) => {
    try {
        await loginSchema.validateAsync(req.body, { abortEarly: false })
    } catch (err) {
        return res.status(400).send(err)
    }
    const username = req.body.username
    const password = req.body.password

    const conn = await pool.getConnection()
    await conn.beginTransaction()

    try {
        // Check if username is correct
        const [users] = await conn.query(
            'SELECT * FROM users WHERE username=?',
            [username]
        )
        const user = users[0]
        // console.log(user)
        if (!user) {
            throw new Error('Incorrect username or password 1')
        }

        // Check if password is correct
        if (!(await bcrypt.compare(password, user.password))) {
            throw new Error('Incorrect username or password 2')
        }
        // if (!(password == user.password)) {
        //     throw new Error('Incorrect username or password 2')
        // }

        // Check if token already existed
        const [tokens] = await conn.query(
            'SELECT * FROM tokens WHERE user_id=?',
            [user.user_id]
        )
        let token = tokens[0]?.token
        // console.log(token)

        if (!token) {
            // Generate and save token into database
            token = generateToken()
            await conn.query(
                'INSERT INTO tokens(user_id, token) VALUES (?, ?)',
                [user.user_id, token]
            )
        }

        conn.commit()
        res.status(200).json({'token': token})
    } catch (error) {
        conn.rollback()
        res.status(400).json(error.toString())
    } finally {
        conn.release()
    }
})

router.get('/user/me', isLoggedIn, async (req, res, next) => {
    res.json(req.user)
})

router.delete('/user/logout', isLoggedIn, async (req, res, next) => {
    const conn = await pool.getConnection();
    await conn.beginTransaction();

    try {
        const [rows, fields] = await conn.query(
            'DELETE FROM tokens WHERE user_id = ?',
            [req.user.user_id]
        )
        await conn.commit()
        res.json("Logout")
        res.redirect('/user/login')
    } catch (error) {
        res.status(500).json(error)
    }finally {
        conn.release();
    }
})


exports.router = router