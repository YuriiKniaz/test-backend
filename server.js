const mongoose = require("mongoose");

const app = require("./app");



mongoose
  .connect('mongodb+srv://Yurii:XSmO0sUI9qzuMU2R@project-secret.gjntfj9.mongodb.net', { dbName: "test-asignment" })
  .then(() => {
    app.listen(3000);
    console.log("Database succefuly connected");
  })
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });