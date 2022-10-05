const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config();

const multer = require("multer");
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images");
    },
    filename: (req, file, cb) => {
        console.log(file);
        cb(null, Date.now() + path.extname(file.originalname));
    },
});
const upload = multer({ storage: storage });

//Routes
const auth = require("./routes/auth");
const verify = require("./routes/verify");
const event = require("./routes/event");

// Constants
const PORT = process.env.PORT || 3000;
var corsOptions = {
    origin: "*",
};
const app = express();
app.use(cors(corsOptions));
app.use(express.json());

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true }, (err) => {
    console.log("Conected to DB");
});

//to parse json content
app.use(express.json());
//to parse body from url
app.use(
    express.urlencoded({
        extended: false,
    })
);

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.get("/auth", (req, res) => {
    res.send("Auth");
});

// Auth
app.use("/auth", auth);

// File Upload
app.post("/upload", upload.single("image"), (req, res) => {
    const file = req.file;
    console.log(JSON.stringify(req.file));
    res.status(200);
    res.send("File uploaded");
});

app.use("/event", event);

//VERIFY
app.use("/verify", verify);

app.listen(PORT, () => {
    console.log(`Application running on port : ${PORT}`);
});
