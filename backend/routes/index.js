const express = require("express");
const pool = require("../config");

router = express.Router();

router.get("/", async function (req, res, next) {
  try {
    const search = req.query.search || ''
    let sql = 'SELECT * FROM products'
    let cond = []

    if (search.length > 0) {
      sql = 'SELECT * FROM products WHERE product_name LIKE ?'
      cond = [`${search}%`]
    }
    const [rows, fields] = await pool.query(sql, cond);
    return res.json(rows);
  } catch (err) {
    return res.status(500).json(err)
  }
});

router.get("/coupon", async function (req, res, next) {
  try {
    const [rows, fields] = await pool.query('SELECT * FROM coupon');
    res.json(rows)
  } catch (err) {
    res.status(500).json(err)
  }
});

exports.router = router;
