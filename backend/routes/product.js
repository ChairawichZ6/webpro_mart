const express = require("express");
const path = require("path");
const pool = require("../config");
const multer = require("multer");
// const fs = require("fs");
// const { isLoggedIn } = require('../middlewares');

router = express.Router()

// SET STORAGE
var storage = multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, "./static/uploads");
    },
    filename: function (req, file, callback) {
      callback(
        null,
        file.fieldname + "-" + Date.now() + path.extname(file.originalname)
      );
    },
  });
const upload = multer({ storage: storage });

router.post("/products", upload.array("myImage", 5), async function (res, req, next) {

    const file = req.files;
    let pathArray = [];

    if (!file) {
      return res.status(400).json({ message: "กรุณา upload รูปภาพ" });
    }
    const price = req.body.product_price;
    const detail = req.body.des_product;
    const name = req.body.product_name;

    req.files.forEach((file, index) => {
      let path = [file.path.substring(6)];
      pathArray.push(path);
    });

    try {
      const [rows, fields] = await pool.query(
        'INSERT INTO products(product_price, product_name, des_product, img VALUES(?, ?, ?, ?)',
        [price, name, detail, pathArray]
      );
      console.log(rows)
      res.send('บันทึกสำเร็จ')

    } catch (err) {
      console.log(err)
      return res.status(400).json(err);
    }
});

exports.router = router;