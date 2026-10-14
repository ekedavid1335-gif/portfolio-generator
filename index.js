// 1. Import your libraries
import express from "express";
import cors from "cors";
import auth from "./lib/firebase.js";

// 2. Create your app
const app = express();

// 3. Use your app
app.use(express.json());
app.use(cors());

// 5. Create your APIs
// GET METHOD
app.get("/test", (req, res) => {
  res.send("Backend is running successfully!");
});

// POST METHOD
app.post("/send-data", (req, res) => {
  const { name, email, password } = req.body;
  res.send(`Hello ${name}. Welcome to our app.`);
});

app.post("/dollar-naira", (req, res) => {
  const { dollar } = req.body;
  const convert = dollar * 1350;
  res.send(`$${dollar} is N${convert}.`);
});

app.delete("/user", (req, res) => {
  res.send("User deleted successfully");
});

app.post("/pounds-naria", (req, res) => {
  const { pounds } = req.body;
  const convert = pounds * 2000;
  res.send(`$${pounds} is N${convert}.`);
});

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  const user = await auth.createUser({
    displayName: name,
    email: email,
    password: password
  });
  res.status(201).json(user);
});
app.post("/signiklNin", async (req, res) => {
  const { Name, email, password } = req.body;
  const user = await auth.createUser({
    displayName: tName,
    email:email ,
    password: password,
  });
  res.status(201).json(user);
});

//userApi
app.get ("/useri", async (req, res) =>{
  const { name, email, password} = req.body;
  const user = await auth.createUser({
    displayName: name,
    email: email,
    password: password, 
  })
  res.status(201).json(user)
})

//this is the userApi
app.get("/signup", async (req, res) => {
  try {
    const { name, email } = req.body;

    const user = {
      name: name,
      email: email
    };

    res.status(200).json({
      message: "User profile retrieved successfully",
      user: user
    });

  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error: error.message
    });
  }
});


// 4. Create your port
app.listen("3000", () => console.log("Server running on port 3000"));
