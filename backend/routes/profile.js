const express = require("express");
const pool = require("../config");
const path = require("path");

router = express.Router();

router.put("/profile/:userId", async function (req, res, next) {
    try{
      const [rows, fields] = await pool.query(
        'UPDATE users SET fname=?, lname=?, phone=?, email=?, address=? WHERE user_id=?',
        [req.body.fname, req.body.lname, req.body.phone, req.body.email, req.body.address, req.params.userId]
      )
      console.log(rows)
      res.json({
        fname: req.body.fname,
        lname: req.body.lname,
        phone: req.body.phone,
        email: req.body.email,
        address: req.body.address,
      });

    }catch(error){
      res.status(500).json(err)
    }

});

exports.router = router;

