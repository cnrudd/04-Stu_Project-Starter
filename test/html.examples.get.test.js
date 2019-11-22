var chai = require("chai");
var chaiHttp = require("chai-http");
var server = require("../server");
var db = require("../models");
var expect = chai.expect;

// Setting up the chai http plugin
chai.use(chaiHttp);

var request;

describe("HTML GET / & /example/1", function() {
  // Before each test begins, create a new request server for testing
  // & delete all examples from the db
  beforeEach(function() {
    request = chai.request(server);
    return db.sequelize.sync({ force: true });
  });

  it("homepage should show 1st example's text", function(done) {
    // Add some examples to the db to test with
    db.Example.bulkCreate([
      { text: "First Example", description: "First Description" },
      { text: "Second Example", description: "Second Description" }
    ]).then(function() {
      // Request the route that returns all examples
      request.get("/").end(function(err, res) {
        // Run assertions on the response
        expect(err).to.be.null;

        expect(res.status).to.equal(200);

        expect(res.text).to.include("First Example");

        // The `done` function is used to end any asynchronous tests
        done();
      });
    });
  });

  it("single item page should show 1st example's description", function(done) {
    // Add some examples to the db to test with
    db.Example.bulkCreate([
      { text: "First Example", description: "First Description" },
      { text: "Second Example", description: "Second Description" }
    ]).then(function() {
      // Request the route that returns all examples
      request.get("/example/1").end(function(err, res) {
        // Run assertions on the response
        expect(err).to.be.null;

        expect(res.status).to.equal(200);

        expect(res.text).to.include("First Description");

        // The `done` function is used to end any asynchronous tests
        done();
      });
    });
  });
});
