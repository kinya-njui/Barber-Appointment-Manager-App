import express from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const prisma = new PrismaClient();
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);

app.post("/signup", async (req, res) => {
  try {
    const { firstName, lastName, email, username, password } = req.body;

    if (!firstName) {
      res.status(400).json({ message: "First name is required" });
      return;
    }

    if (!lastName) {
      res.status(400).json({ message: "Last name is required" });
      return;
    }

    if (!email) {
      res.status(400).json({ message: "Email is required" });
      return;
    }

    if (!username) {
      res.status(400).json({ message: "Username is required" });
      return;
    }

    if (!password) {
      res.status(400).json({ message: "Password is required" });
      return;
    }

    const passwordHash = await bcrypt.hash(password, 8);

    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        username,
        password: passwordHash,
      },
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/auth/login", async (req, res) => {
  try {
    //read the username and password from the client
    const email = req.body.email;
    const password = req.body.password;

    //check if the username exists in the database querrying with the database aganist the email
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });
    if (!user) {
      res.status(400).json({ message: "Wrong email or password" });
      return;
    }

    //if the user doesn't exist return an error
    if (!user) {
      res.status(400).json({ message: "User not found" });
      return;
    }

    //if user exists compare the plain text password against the hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);

    //if they don't match return an authentication error
    console.log(passwordMatch);
    if (!passwordMatch) {
      res.status(400).json({ message: "Wrong email or password" });
      return;
    }

    //if they match create a token, save the Id there
    const token = jwt.sign(user.id, process.env.JWT_SECRET);
    //send the token to the client as a cookie
    res
      .status(200)
      .cookie("authToken", token, { httpOnly: true })
      .json({ user });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong please try again" });
  }
});
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
