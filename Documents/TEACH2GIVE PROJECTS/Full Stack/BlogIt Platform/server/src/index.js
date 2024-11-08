import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import signupUser from "./controllers/Auth/signupUser.js";
import loginUser from "./controllers/Auth/loginUsers.js";
import validateUserInformation from "./middleware/validateUserInformation.js";
import { createBlog, getAllBlogs } from "./controllers/blogs.controllers.js";
import verifyToken from "./middleware/verifyToken.js";
import ValidateBlog from "./middleware/validateBlog.js";
const app = express();

//Register middleware
app.use(express.json());
app.use(
  cors({
    origin: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);
app.use(cookieParser());
//Routes
app.post("/signup", validateUserInformation, signupUser);
app.post("/auth/login", loginUser);
app.post("/blog", verifyToken, ValidateBlog, createBlog);

// route for getting all blog posts
app.get("/all-blogs", verifyToken, getAllBlogs);
//server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
