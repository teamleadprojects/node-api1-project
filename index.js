const express = require("express");
const shortid = require("shortid");

const server = express();

server.use(express.json());

let users = [
  {
    id: shortid.generate(), // hint: use the shortid npm package to generate it
    name: "Jane Doe", // String, required
    bio: "Not Tarzan's Wife, another Jane", // String, required
  },
  {
    id: shortid.generate(), // hint: use the shortid npm package to generate it
    name: "Jane Doe", // String, required
    bio: "Not Tarzan's Wife, another Jane", // String, required
  },
];

//Testing the server
server.get("/", (req, res) => {
  res.send({ message: "Hello Users" });
});

//Get all users
server.get("/api/users", (req, res) => {
  if (users) {
    res.status(200).json(users);
  } else {
    res
      .status(500)
      .json({ errorMessage: "The users information could not be regtrieved" });
  }
});

//Get user by Id
server.get("/api/users/:id", (req, res) => {
  const id = req.params.id;
  if (!id) {
    res
      .status(404)
      .json({ errorMessage: "The user with that id does not exist" });
  } else {
    users = users.filter((u) => u.id === id);
    res.status(200).json(users);
  }
});

//Delete user by id
server.delete("/api/users/:id", (req, res) => {
  const id = req.params.id;
  const deletedId = req.body;
  users = users.filter((u) => u.d !== id);
  res.status(200).json(users);
});

//Update a user
server.put("/api/users/:id", (req, res) => {
  const id = req.params.id;
  const updatedUser = req.body;
  if (!user.name || !user.bio) {
    res.status(400).json({ message: "Provide name and bio for user" });
  } else if (id) {
    res.status(200).json(updatedUser);
  } else {
    res.status(404).json({ message: "The user with that id doesn't exist" });
  }
});

//Add a new user
server.post("/api/users", (req, res) => {
  const user = req.body;
  if (user.name && user.bio) {
    users.push(user);
    res.status(201).json(user);
  } else {
    res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for user." });
  }
});

const port = 5000;

server.listen(port, () => console.log(`\n *** API on port ${port} *** \n`));
