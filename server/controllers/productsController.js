const createProduct = (req, res, next) => {
  // create a variable for the db instance off of req.app
  const dbInstance = req.app.get("db");
  // de-structure all properties from req.body
  const { name, description, price, image_url } = req.body;

  dbInstance
    .createProduct([name, description, price, image_url])
    .then(() => {
      res.sendStatus(200);
    })
    .catch(err => console.log(err));
};
// get all products
const getProducts = (req, res, next) => {
  const dbInstance = req.app.get("db");
  dbInstance
    .readProducts()
    .then(products => {
      res.status(200).json(products);
    })
    .catch(err => {
      res.status(500).json({
        errorMessage:
          "Oops! Something went wrong. Our engineers have been informed"
      });
      console.log(err);
    });
};
// get one product
const getProduct = (req, res, next) => {
  const dbInstance = req.app.get("db");
  //desctructure id property from req.params
  const { id } = req.params;
  dbInstance
    .readProduct(id)
    .then(product => {
      res.status(200).json(product);
    })
    .catch(err => {
      res.status(500).json({
        errorMessage:
          "Oops! Something went wrong. Our engineers have been informed"
      });
      console.log(err);
    });
};
// update product
const updateProduct = (req, res, next) => {
  const dbInstance = req.app.get("db");
  // desctructure id from req
  const { params, query } = req;

  dbInstance
    .updateProduct([params.id, query.desc]) // id bc only updating a specific product from the query in desc order
    .then(() => {
      res.sendStatus(200);
    })
    .catch(err => {
      res.status(500).json({
        errorMessage:
          "Oops! Something went wrong. Our engineers have been informed"
      });
      console.log(err);
    });
};
// delete product
const deleteProduct = (req, res, next) => {
  const dbInstance = req.app.get("db");
  // destructure and set id to req.params
  const { id } = req.params;
  dbInstance
    .deleteProduct(id)
    .then(() => {
      res.sendStatus(200);
    })
    .catch(err => {
      res.status(500).json({
        errorMessage:
          "Oops! Something went wrong. Our engineers have been informed"
      });
      console.log(err);
    });
};

module.exports = {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct
};
