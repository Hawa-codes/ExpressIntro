const express = require("express");

const appp = express();

const users = [
  { id: 1, name: "Hawa" },
  { id: 2, name: "Shukroh" },
  { id: 3, name: "John" },
];

appp.get("/", (req, res) => {
    res.status(200).json({
        message: "Welcome to the homepage"
    });
});

appp.get("/users", (req, res) => {
    res.status(200).json({users})
})

appp.get("/users/:id", (req, res) => {
    const id = req.params.id;
    
    const user = users.find((u) => u.id == id);

    if (!user) {
    return res.status(404).json({
      message: "user not found",
      error: true,
    });
  }
  return res.status(200).json(user);
})

appp.listen(4000, () => {
  console.log("Server is running on port 4000");
});

const app = express();

const products = [
  { id: 1, name: "Laptop", price: 500000 },
  { id: 2, name: "Phone", price: 200000 },
  { id: 3, name: "Headphones", price: 50000 },
];

app.get("/", (req, res) => {
    res.status(200).json({
        message: "Welcome to Products API",
    });
});

app.get("/products", (req, res) => {
    res.status(200).json({ products })
});

app.get("/products/:id", (req, res) => {
    const id = req.params.id;

    const product = products.find((p) => p.id == id);
  
    if(!products) {
        return res.status(404).json({
        message: "Product not found",
        error: true,
        });
    }

    return res.status(200).json(products);
})