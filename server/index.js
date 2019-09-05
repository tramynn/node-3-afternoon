require("dotenv").config();
const express = require("express");
const massive = require("massive");
const pc = require("./controllers/productsController");
//invoking express
const app = express();

const { SERVER_PORT, CONNECTION_STRING } = process.env;
// execute some logic when the promise is fulfilled, so chain a .then to it
// capture db instance in the first parameter
// set dbInstance onto app and have function return app.set
massive(CONNECTION_STRING)
  .then(dbInstance => {
    app.set("db", dbInstance);
    console.log("Database is connected");
  })
  .catch(err => console.log(err));
//middleware
app.use(express.json());

//endpoints
app.post("/api/products", pc.createProduct);
app.get("/api/products", pc.getProducts);
app.get("/api/products/:id", pc.getProduct);
app.put("/api/products/:id", pc.updateProduct);
app.delete("/api/products/:id", pc.deleteProduct);

app.listen(SERVER_PORT, () => {
  console.log(`Server listening on ${SERVER_PORT}`);
});
