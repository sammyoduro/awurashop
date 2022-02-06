const loop = require("../helpers/loop");
const categoryModel = require("../model/category.model");

module.exports = {
  getPage: async (req, res) => {
    var categoryList = await categoryModel.find({}).sort({ _id: -1 });
    res.render("category/index", {
      categoryList,
      breadcrumb:
        "<li class='breadcrumb-item'><a href='/Dashboard'>Dashboards</a></li><li class='breadcrumb-item active' aria-current='page'>Categories</li>",
    });
  },
  getNewCat: (req, res) => {
    res.render("category/new", {
      breadcrumb:
        "<li class='breadcrumb-item'><a href='/Dashboard'>Dashboards</a></li><li class='breadcrumb-item'><a href='/Categories'>Categories</a></li><li class='breadcrumb-item active' aria-current='page'>New Category</li>",
    });
  },
  createNewCat: (req, res) => {
    try {
      //   validation
      req.checkBody("title", "field is required").notEmpty().trim();
      if (req.body.description != "") {
        req.checkBody("description", "field is required").notEmpty().trim();
      }
      let parseErrors = req.validationErrors();
      parseErrors = parseErrors ? loop.passErrData(parseErrors) : "";

      if (parseErrors) {
        res.send({ status: 0, parseErrors });
      } else {
        // save data
        var Category = new categoryModel();
        Category.title = req.body.title;
        Category.description = req.body.description;
        Category.save(() => {
          res.json({
            status: 1,
            succMsg: `Category (${req.body.title}) saved!`,
          });
          res.end();
        });
      }
    } catch (error) {
      console.log(error);
    }
  },
};
