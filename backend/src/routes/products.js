"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const store_1 = require("../data/store");
const router = (0, express_1.Router)();
router.get("/", (req, res) => {
    res.json(store_1.products);
});
router.post("/", (req, res) => {
    const { name, price } = req.body;
    const newProduct = {
        id: store_1.products.length + 1,
        name,
        price
    };
    store_1.products.push(newProduct);
    res.status(201).json(newProduct);
});
exports.default = router;
//# sourceMappingURL=products.js.map