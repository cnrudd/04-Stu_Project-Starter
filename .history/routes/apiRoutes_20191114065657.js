var db = require("../models");

module.exports = function(app) {
  // Get all examples
  app.get("/api/examples", async (req, res) => {
    try {
      const data = await db.Example.findAll({
        include: [db.Post],
      });
      res.json(data);
    } catch (error) {
      res.status(400).json({error: {name: error.name, msg: error.message}});
    }
  });


  // Create a new example
  app.post("/api/examples", function(req, res) {
    db.Example.create(req.body).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
      res.json(dbExample);
    });
  });
};
