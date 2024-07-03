const express = require("express");
const app = express();
const cors = require("cors");
const dbConnect = require("./db/dbConnect");
const UserRouter = require("./routes/UserRouter");
const PhotoRouter = require("./routes/PhotoRouter");
const Auth = require("./routes/Auth");
const Comment = require('./routes/CommentRouter');
const bodyParser = require("body-parser");
const session = require('express-session');
const path = require('path')
dbConnect();

// app.use(cors({
//   origin: 'http://localhost:3000',
//   credentials: true
// }));

app.use(session({
  secret: 'secretKey',
  resave: false,
  saveUninitialized: true
}));

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api/user", UserRouter);
app.use("/api/photo", PhotoRouter);
app.use("/api/auth", Auth);
app.use("/api/cmt", Comment);

app.get("/", (request, response) => {
  response.send({ message: "Hello from photo-sharing app API!" });
});

app.listen(8081, () => {
  console.log("server listening on port 8081");
});
