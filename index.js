const express = require("express");
const mongoose = require("mongoose");
const Product = require("./models/Product");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;
app.use(cors());
// Middleware để parse JSON
app.use(express.json());

// Kết nối MongoDB
mongoose
  .connect(
    process.env.URI ||
      "mongodb+srv://doquockhanh:doquockhanh@doquockhanh.idqr4.mongodb.net/product",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Kết nối MongoDB thành công!"))
  .catch((err) => console.log("Lỗi kết nối MongoDB: ", err));

// Sử dụng router
const router = express.Router();

// Lấy danh sách sản phẩm
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// Lấy danh sách sản phẩm
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const products = await Product.findOne({ id });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Thêm sản phẩm mới
router.post("/", async (req, res) => {
  const product = new Product({
    id: req.body.id,
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    currentPrice: req.body.currentPrice,
    image: req.body.image,
  });

  try {
    const ProductExist = await Product.findOne({ id: req.body.id });
    if (ProductExist) {
      return res
        .status(500)
        .json("id product was existed, let enter another id");
    }
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Cập nhật sản phẩm
router.put("/:id", async (req, res) => {
  try {
    const product = await Product.findOne({ id: req.params.id });

    if (!product) return res.status(404).json({ message: "Product not found" });

    product.id = req.body.id || product.id;
    product.name = req.body.name || product.name;
    product.description = req.body.description || product.description;
    product.price = req.body.price || product.price;
    product.currentPrice = req.body.currentPrice || product.currentPrice;
    product.image = req.body.image || product.image;

    const updatedProduct = await product.updateOne();
    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Xóa sản phẩm
router.delete("/:id", async (req, res) => {
  try {
    const product = await Product.findOne({ id: req.params.id });
    if (!product) return res.status(404).json({ message: "Product not found" });

    await Product.deleteOne({ id: req.params.id });
    res.json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Áp dụng router cho API
app.use("/api/products", router);

// Lắng nghe trên cổng port
app.listen(port, () => {
  console.log(`Ứng dụng đang chạy trên cổng ${port}`);
});
