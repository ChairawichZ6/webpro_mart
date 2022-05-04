const express = require("express");
const pool = require("../config");

router = express.Router();

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
  
  exports.router = router;
  