const express = require("express");

const router = express.Router();

const shopController = require("../controllers/shop");

router.get("/", shopController.getIndex);

router.get("/products", shopController.getProducts);

router.get("/products/:productId", shopController.getProduct);

router
  .route("/cart")
  .get(shopController.getCart)
  .post(shopController.postCart);

router.get("/orders", shopController.getOrders);

router.post("/cart-delete-item", shopController.postCartDeleteProduct);

router.post("/create-order", shopController.postOrder);

module.exports = router;
