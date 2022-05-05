const express = require("express");
const pool = require("../config");

router = express.Router();

router.get("/cart/:user_id", async function (req, res, next) {
    try{
      const [rows, field] = await pool.query(
        "SELECT * FROM orders JOIN order_item USING(order_id) JOIN products USING(product_code) WHERE user_id=?",
        [req.params.user_id]
      )
        console.log(rows)
        return res.json(rows)
    }
    catch(err){
      console.log(err)
    }
  });
  
  exports.router = router;