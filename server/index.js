require("dotenv").config();
const express = require("express");
const massive = require("massive");

const app = express();

const { SERVER_PORT, CONNECTION_STRING } = process.env;
// execute some logic when the promise is fulfilled, so chain a .then to it
// capture db instance in the first parameter
// set dbInstance onto app and have function return app.se
massive(CONNECTION_STRING)
  .then(dbInstance => {
    app.set("db", dbInstance);
  })
  .catch(err => console.log(err));

app.use(express.json());

app.listen(SERVER_PORT, () => {
  console.log(`Server listening on ${SERVER_PORT}`);
});
