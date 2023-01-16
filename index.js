const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const UserRouter = require("./routes/UserRouter");
const connectDB = require("./configs/db");
const { VerifyToken } = require("./middlewares/VerifyToken");
const PostRouter = require("./routes/PostRouter");
const app = express();

app.use(express.json());
app.use("/users", UserRouter);
app.use(VerifyToken);
app.use("/posts",PostRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(process.env.PORT, () => {
  connectDB();
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});
