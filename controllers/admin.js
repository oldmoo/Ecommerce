const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/add-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true,
  });
};

exports.postAddProduct = (req, res, next) => {
  const { title, imageUrl, price, description } = req.body;
  const product = new Product({
    title,
    price,
    description,
    imageUrl,
    userId: req.user,
  });

  product
    .save()
    .then((prod) => {
      res.redirect("/");
    })
    .catch((err) => console.log(err));
};

exports.getProducts = async (req, res, next) => {
  const products = await Product.find();
  if (products !== null) {
    res.render("admin/products", {
      products: products,
      pageTitle: "Admin Products",
      path: "/admin/products",
    });
  }
};

exports.getEditProduct = async (req, res) => {
  const id = req.params.id;
  const edited = req.query.edit;
  if (edited) {
    const products = await Product.findById(id);
    res.render("admin/edit-product", {
      prods: products,
      pageTitle: "Edit Products",
      path: "/admin/edit-product",
      edited: edited,
    });
  }
};

exports.postEditProduct = (req, res, next) => {
  const { title, imageUrl, price, description, productId } = req.body;

  Product.findById(productId.trim())
    .then((product) => {
      product.title = title;
      product.price = price;
      product.description = description;
      product.imageUrl = imageUrl;
      product.save();
      res.redirect("/admin/products");
    })
    .catch((err) => console.log(err));
};

exports.postDeleteProduct = (req, res, next) => {
  const { productId } = req.body;
  Product.findByIdAndDelete(productId.trim())
    .then((product) => res.redirect("/admin/products"))
    .catch((err) => console.log(err));
};
