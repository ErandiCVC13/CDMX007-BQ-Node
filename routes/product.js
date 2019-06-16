const Product = require("../models/Product");
const { requireAuth, requireAdmin } = require("../middleware/auth");

module.exports = (app, next) => {
  app.get("/products", requireAuth, (req, resp) => {
    // console.log(req.query)
    if (!req.query) {
      Product.find().then(data => resp.json(data));
    }
    if (req.query) {
      Product.find(req.query).then(data => resp.json(data));
    }
  });

  app.get("/products/:id", requireAuth, (req, resp) => {
    Product.find({ _id: req.params.id }).then(data => resp.json(data));
  });

  app.post("/products", requireAdmin, (req, resp) => {
    const { name, price } = req.body;

    if (!name || !price) {
      return next(400);
    }

    Product.create({ name, price })
      // .then(() => Product.find())
      .then(data => resp.json(data))
      .catch(err =>
        /duplicate key/.test(err.message) ? next(403) : next(500)
      );
  });

  app.put("/products/:id", requireAdmin, (req, resp, next) => {
    Product.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true })
      .exec()
      .then(doc => {
        Product.find().then(data => {
          resp.json(doc);
        });
      })
      .catch(next);
  });

  app.delete("/products/:id", requireAdmin, (req, resp, next) => {
    Product.findByIdAndRemove(
      { _id: req.params.id },
      req.body,
      (err, Product) => {
        // As always, handle any potential errors:
        if (err) return res.status(500).send(err);
        // We'll create a simple object to send back with a message and the id of the document that was removed
        // You can really do this however you want, though.
        const response = {
          message: "Product successfully deleted",
          _id: Product.id
        };
        return resp.status(200).send(response);
      }
    );
  });

  return next();
};
