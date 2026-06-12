const express = require("express");
const { error } = require("node:console");

const app = express();

const users = [
  { id: 1, name: "Hawa" },
  { id: 2, name: "Shukroh" },
  { id: 3, name: "John" },
];

const products = [
  { id: 1, name: "Laptop", price: 500000 },
  { id: 2, name: "Phone", price: 200000 },
  { id: 3, name: "Headphones", price: 50000 },
];

app.get("/", (req, res) => {
    res.status(200).json({
        message: "Welcome to the homepage"
    });
});

app.get("/users", (req, res) => {
    res.status(200).json({users})
})

app.get("/users/:id", (req, res) => {
    const id = req.params.id;
    
    const user = users.find((u) => u.id == id);

    if (!user) {
    return res.status(404).json({
      message: "user not found",
      error: true,
    });
  }
  return res.status(200).json(user);
});

app.post("/user", (req, res) => {
    const { name } = req.body;
    const user = { id: Math.random(), name};
    users.push(user);
    res.status(201).json({
        message: "user created successfully",
        user,
    });
});

app.patch("/user/:id", (req, res) => {
    const { body, params } = req;
    const email = body.email
    if (!email) {
    return res.status(422).json({
      message: "Email is missing",
      error: true,
    });
  }

  const userIndex = users.findIndex(({ id }) => id == params.id);
  if (userIndex === -1) {
    return res.status(404).json({
      message: "user not found",
      error: true,
    });
  }
  users[userIndex].email = body.email;
  res.status(200).json({
    message: "user updated successfully",
    data: users[userIndex],
  });
});

app.put("/user/:id", (req, res) => {
    const { body, params } = req
    const { name, email, age } = body;

  if (!name || !email || !age) {
    return res.status(422).json({
      message: "All fields are required",
      error: true,
    });
  }
})

// How do you create another route called /products ?
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

    return res.status(200).json(product);
});

app.listen(4003, () => {
  console.log("Server is running on port 4000");
});

/* 
Express Basics
What is Express.js?
What does express() do?
What is the difference between Node.js and Express.js?
What is a route?
Routes
What does .get() mean?
What is the difference between / and /users?
How do you create another route called /about?
What happens if a route doesn't exist?
*/

