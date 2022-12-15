const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const PORT = 4000;

const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const postRoute = require("./routes/post");
const categoryRoute = require("./routes/categories");
const multer = require("multer");

mongoose.set("strictQuery", true);

const app = express();

dotenv.config();
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

// IMAGE UPLOAD
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });

app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
});

// ROUTES
app.use("/api/auth", authRoute);

app.use("/api/user", userRoute);

app.use("/api/post", postRoute);

app.use("/api/categories", categoryRoute);

// LISTEN

app.listen(PORT, () => {
  console.log("Server started on port ", PORT);
});
