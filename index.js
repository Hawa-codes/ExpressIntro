const express = require("express");
const { readUsers, saveUsers } = require("./files");

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

const validateUser = async (req, res, next) => {
  const { id } = req.params;
  const users = await readUsers();

  console.log(users);
  console.log(Array.isArray(users));

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

app.get("/", (req, res) => {
    res.status(200).json({
        message: "Welcome to the homepage"
    });
});

app.get("/users", async (req, res) => {
    const users = await readUsers();
    res.status(200).json({ users });
});

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

app.post("/users", async (req, res) => {

  const users = await readUsers();
    const { name } = req.body;
    const id = Math.max(...users.map(user => user.id)) + 1;
    const user = { id, name};
    users.push(user);

    await saveUsers(users);
    
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

app.patch("/users/:id", validateEmail, validateUser, async (req, res) => {
  const { body, params } = req;
    const users = await readUsers();
  const userIndex = users.findIndex(({ id }) => id == params.id);
  
  users[userIndex].email = body.email;

  await saveUsers(users);

  res.status(200).json({
    message: "user updated successfully",
    data: users[userIndex],
  });
});


app.put("/users/:id", validateUser, async (req,res) => {
    const {body, params} = req;

    const users = await readUsers();

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

    await saveUsers(users);
    res.status(200).json({
    message: "user updated successfully",
    data: users[userIndex],
  });
})

app.delete("/users/:id", validateUser, async (req, res) => {
    const users = await readUsers();
    const id = req.params.id;
    const userIndex = users.findIndex((u) => u.id == id);
    users.splice(userIndex, 1);
    await saveUsers(users);

    return res.status(200).json({
        message: "user deleted successfully"
    });
})




app.listen(4003, () => {
  console.log("Server is running on port 4003");
});

