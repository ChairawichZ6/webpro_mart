const express = require("express");
const pool = require("../config");
const Joi = require('joi')
const bcrypt = require('bcrypt')

router = express.Router();

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

exports.router = router