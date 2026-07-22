const express = require("express");
const { error } = require("node:console");

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

const validateUser = (req, res, next) => {
  const { id } = req.params;
  const user = users.find((u) => u.id == id);
  if (!user) {
    return res.status(404).json({
      message: "user not found",
      error: true,
    });
  }
  req.user = user;
  next();
};

const users = [
  { id: 1, name: "Hawa", email: "hawa@gmail.com", age: 22 },
  { id: 2, name: "Shukroh", email: "shukroh@gmail.com", age: 21 },
  { id: 3, name: "John", email: "john@gmail.com", age: 25 },
  { id: 4, name: "Ijeoma", email: "ijeoma@gmail.com", age: 24 },
  { id: 5, name: "Aisha", email: "aisha@gmail.com", age: 20 },
  { id: 6, name: "David", email: "david@gmail.com", age: 26 },
  { id: 7, name: "Samuel", email: "samuel@gmail.com", age: 23 },
  { id: 8, name: "Fatima", email: "fatima@gmail.com", age: 22 },
  { id: 9, name: "Emmanuel", email: "emmanuel@gmail.com", age: 27 },
  { id: 10, name: "Grace", email: "grace@gmail.com", age: 24 },
  { id: 11, name: "Mary", email: "mary@gmail.com", age: 23 },
  { id: 12, name: "Michael", email: "michael@gmail.com", age: 28 },
  { id: 13, name: "Esther", email: "esther@gmail.com", age: 21 },
  { id: 14, name: "Daniel", email: "daniel@gmail.com", age: 29 },
  { id: 15, name: "Sarah", email: "sarah@gmail.com", age: 25 },
  { id: 16, name: "Joshua", email: "joshua@gmail.com", age: 24 },
  { id: 17, name: "Blessing", email: "blessing@gmail.com", age: 22 },
  { id: 18, name: "Victor", email: "victor@gmail.com", age: 27 },
  { id: 19, name: "Mercy", email: "mercy@gmail.com", age: 23 },
  { id: 20, name: "Abdul", email: "abdul@gmail.com", age: 26 },
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

const getUser = (req, res) => {
  const user = req.user;
  return res.status(200).json(user);
};

app.get("/users/:id", validateUser, getUser);

// http://localhost:4000/users/2
// app.get("/users/:id", (req, res) => {
//     const id = req.params.id;
//     const user = users.find((u) => u.id === id);
//     if (!user) {
//     return res.status(404).json({
//       message: "user not found",
//       error: true,
//     });
//   }
//   return res.status(200).json(user);
// });

app.post("/user", (req, res) => {
    const { name } = req.body;
    const user = { id: Math.floor(Math.random() * 10), name};
    users.push(user);
    res.status(201).json({
        message: "user created successfully",
        user,
    });
});

const validateEmail = (req, res, next) => {
    if (!req.body.email) {
        return res.status(422).json({
            message: "Email is missing",
            error: true,
        });
    }
    next();
};

app.patch("/users/:id", validateEmail, validateUser, (req, res) => {
  const { body, params } = req;
    
  const userIndex = users.findIndex(({ id }) => id == params.id);
  
  users[userIndex].email = body.email;
  res.status(200).json({
    message: "user updated successfully",
    data: users[userIndex],
  });
});


app.put("/users/:id", validateUser, (req,res) => {
    const {body, params} = req;
    const userIndex = users.findIndex(({ id }) => id == params.id);
    
    const { name, email, age } =  body;
    if (!name || !email || !age) {
        return res.status(422).json({
            message: "All fields are required",
            error: true,
        });
    }

    users[userIndex] = {
        id: users[userIndex].id,
        name,
        email,
        age,
    };

    res.status(200).json({
    message: "user updated successfully",
    data: users[userIndex],
  });
})

app.delete("/users/:id", validateUser, (req, res) => {
    const id = req.params.id;
    const userIndex = users.findIndex((u) => u.id == id);
    users.splice(userIndex, 1);

    return res.status(200).json({
        message: "user deleted successfully"
    });
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
  console.log("Server is running on port 4003");
});

const u =  {
  id: 1,
  email: "ij@gmail.com",
  name: "Ijeoma",
  age: 19,
  password: "helloooo",
};

const body = {
  email: "new@gmail.com",
  age: 25,
};

const newU = {
  ...u,
  ...body,
};

const { password, age, ...response } = newU;

console.log(newU);
console.log(response);