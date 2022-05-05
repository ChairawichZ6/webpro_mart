const express = require("express");
const path = require("path");
const pool = require("../config");
const multer = require("multer");
const fs = require("fs");
const { constants } = require("buffer");
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

// add product
router.post("/products", upload.single("myImage"), async function (req, res, next) {

    const file = req.file;
    // let pathArray = [];

    if (!file) {
      return res.status(400).json({ message: "Please upload a file" });
    }
    const price = req.body.product_price;
    const detail = req.body.des_product;
    const name = req.body.product_name;

    try {
      const [rows, fields] = await pool.query(
        'INSERT INTO products(product_price, product_name, des_product, img) VALUES(?, ?, ?, ?);',
        [price, name, detail, file.path.substring(6)]
      );
      // console.log(rows)
      res.send('บันทึกสำเร็จ')

    } catch (err) {
      console.log(err)
      return res.status(400).json(err);
    }
});

// get product
router.get("/poducts", async function (req, res, next) {
  try {
    const [rows, fields] = await pool.query('SELECT * FROM products');
    res.json(rows)
  } catch (err) {
    res.status(500).json(err)
  }
});

// get Detail Product
router.get("/ProductDetail/:product_id", async function (req, res, next) {
  try{
    const [rows, field] = await pool.query(
      "SELECT * FROM products WHERE product_code=?",
      [req.params.product_id]
    )
      console.log(rows)
      return res.json(rows)
  }
  catch(err){
    console.log(err)
  }
});

// delete Product
router.delete("/products/:proId", async function (req, res, next) {
  const conn = await pool.getConnection();
  await conn.beginTransaction();

  try {
    const [image, imagefields] = await conn.query(
      "SELECT img FROM products WHERE product_code=? ",
      [req.params.proId]
    );
    // console.log(image[0].img)
    // console.log(path.dirname(require.main.filename))
    const appDir = path.dirname(require.main.filename)
    const p = path.join(appDir, 'static', image[0].img)
    // console.log(p)
    fs.unlinkSync("./static/" + image[0].img);

    const [rows, fields] = await conn.query(
      "DELETE FROM products WHERE product_code=?",
      [req.params.proId]
    );
    await conn.commit();
    return res.status(204).send();

  } catch (err) {
    console.log(err)
    await conn.rollback();
    return res.status(500).json(err);
  } finally {
    conn.release();
  }
});

exports.router = router;