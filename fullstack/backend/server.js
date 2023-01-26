const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());

const { Schema } = mongoose;
const productSchema = new Schema(
  {
    lesson: {
      type: String,
      //   required: true,
    },
    name: {
      type: String,
      //   required: true,
    },
    userName: {
      type: String,
      //   required: true,
    },
    price: {
      type: Number,
      //   required: true,
    },
  },
  { timestamps: true }
);

const Products = mongoose.model("product", productSchema);
const PORT = process.env.PORT;
const PASSWORD = process.env.PASSWORD;
const DB = process.env.DB_URL.replace("<password>", PASSWORD);

app.get("/product", (req, res) => {
  Products.find({}, (err, docs) => {
    if (!err) {
      res.send(docs);
    } else {
      res.status(500).json({ message: err });
    }
  });
});
app.get("/product/:id", (req, res) => {
  const id = req.params;
  Products.find(id, (err, docs) => {
    if (!err) {
      res.send(docs);
    } else {
      res.status(500).json({ message: err });
    }
  });
});

app.post("/product", (req, res) => {
  let products = new Products({
    lesson: req.body.lesson,
    name: req.body.name,
    userName: req.body.userName,
    price: req.body.price,
  });
  products.save();
  res.send("succes");
});

app.delete("/product/:id", (req, res) => {
  const id = req.params;
  Products.findByIdAndDelete(id, (err) => {
    if (!err) {
      res.send("delete");
    } else {
      res.status(500).json({ message: err });
    }
  });
});

mongoose.connect(DB, (err) => {
  if (!err) {
    console.log("Succes");
    app.listen(PORT, () => {
      console.log(`this port ${PORT}`);
    });
  }
});
