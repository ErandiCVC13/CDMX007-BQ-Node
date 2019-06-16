const Order = require("../models/Order");
const { requireAuth, requireAdmin } = require("../middleware/auth");

module.exports = (app, next) => {
  app.get("/orders", requireAuth, (req, resp) => {
    // console.log(req.query)
    if (!req.query) {
      Order.find().then(data => resp.json(data));
    }
    if (req.query) {
      Order.find(req.query).then(data => resp.json(data));
    }
  });

  app.get("/orders/:id", requireAuth, (req, resp) => {
    Order.find({ _id: req.params.id }).then(data => resp.json(data));
  });

  app.post("/orders", requireAdmin, (req, resp) => {
    const { name, price } = req.body;

    if (!name || !price) {
      return next(400);
    }

    Order.create({ name, price })
      // .then(() => Product.find())
      .then(data => resp.json(data))
      .catch(err =>
        /duplicate key/.test(err.message) ? next(403) : next(500)
      );
  });

  app.put("/orders/:id", requireAdmin, (req, resp, next) => {
    Order.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true })
      .exec()
      .then(doc => {
        Order.find().then(data => {
          resp.json(doc);
        });
      })
      .catch(next);
  });

  app.delete("/orders/:id", requireAdmin, (req, resp, next) => {
    Order.findByIdAndRemove({ _id: req.params.id }, req.body, (err, Order) => {
      // As always, handle any potential errors:
      if (err) return res.status(500).send(err);
      // We'll create a simple object to send back with a message and the id of the document that was removed
      // You can really do this however you want, though.
      const response = {
        message: "Order successfully deleted",
        _id: Order.id
      };
      return resp.status(200).send(response);
    });
  });

  return next();
};
