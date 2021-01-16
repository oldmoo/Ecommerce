const Product = require("../models/product");

exports.getProducts = async (req, res, next) => {
  const products = await Product.find();
  res.render("shop/product-list", {
    prods: products,
    pageTitle: "All Products",
    path: "/products",
  });
};

exports.getProduct = async (req, res, next) => {
  const id = req.params.id;
  const product = await Product.findById(id);

  res.render("shop/product-detail", {
    product: product,
    path: "/product",
    pageTitle: product.title,
  });
};

exports.getIndex = async (req, res, next) => {
  const products = await Product.find();
  res.render("shop/index", {
    prods: products,
    pageTitle: "Shop",
    path: "/",
  });
};

exports.getCart = (req, res, next) => {
  console.log(req.user);
  // req.user.then((usr) => console.log(usr)).catch((err) => console.log(err));
  req.user
    .populate("cart.items.productId")
    .execPopulate()
    .then((product) => {
      console.log(product);
      res.render("shop/cart", {
        path: "/cart",
        pageTitle: "Your Cart",
        products: product,
      });
    })
    .catch((err) => console.log(err));
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.prodId;
  Product.findById(prodId.trim())
    .then((product) => {
      return req.user.addToCart(product).then((result) => {
        console.log(result);
        res.redirect("/cart");
      });
    })
    .catch((err) => console.log(err));

  res.redirect("/cart");
};
exports.getOrders = (req, res, next) => {
  res.render("shop/orders", {
    path: "/orders",
    pageTitle: "Your Orders",
  });
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    path: "/checkout",
    pageTitle: "Checkout",
  });
};
