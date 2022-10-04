const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const os = require("os");
require("dotenv").config();

const multer = require("multer");
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./images");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});
const upload = multer({ storage: storage });

// const upload = require("./routes/upload");
// app.use("/file", upload);

//Routes
const auth = require("./routes/auth");
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

// //creating bucket
// let bucket;
// mongoose.connection.on("connected", () => {
//     var db = mongoose.connections[0].db;
//     bucket = new mongoose.mongo.GridFSBucket(db, {
//         bucketName: "newBucket",
//     });
//     console.log(bucket);
// });

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
app.use(express.static(__dirname));
app.use("/images", express.static("images"));
app.post("/upload", upload.single("file"), function (req, res) {
    const file = req.file;
    console.log(JSON.stringify(req.file));
    res.status(200);
    res.send("File uploaded");
});

app.get("/event", (req, res) => {
    res.send("Event");
});
app.use("/event", event);

app.listen(PORT, () => {
    console.log(`Application running on port : ${PORT}`);
});
