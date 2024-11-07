import express from "express";
import cors from "cors";
import validateUserInformation from "./middleware/validateUserInformation.js";

import signupUser from "./controllers/Auth/signupUser.js";
import loginUser from "./controllers/Auth/loginUsers.js";

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
//Routes
app.post("/signup", validateUserInformation, signupUser);
app.post("/auth/login", loginUser);

//server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
