const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const routes = require("./routes/books");
const URI = require("./config/index");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URI || URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected successfully"))
  .catch((err) => console.log(err));

app.use(express.json());

app.use("/api/books", routes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, 'client/build')));
  // app.get("*", (req, res) => {
  //   res.sendFile(path.join(__dirname,'../client/build/index.html'));
  // });
  app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'../client/build/index.html'));
});
}

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("hello I am MERN");
});

app.listen(PORT, () => console.log(`listening to port ${PORT} successfuly`));
