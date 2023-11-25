import dotenv from "dotenv";

dotenv.config();
import express from "express";
import http from "http";
import morgan from "morgan";
import connect from "./database/conn.js";
import cors from "cors";
import userRouter from "./routes/userRouter.js";

const app = express();
const server = http.createServer(app);
import path from "path"
 

const port = process.env.PORT || 8000;
 

// middlewares
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
const allowedOrigins = [
  "http://localhost:3001", 
  "http://192.168.60.127:3001", // Add your local IP here
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);
// app.use(cors())
app.use(morgan("tiny"));
 

//Production

console.log("BUMChika ")
// Api Routes
app.use("/api", userRouter)
 

if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  const basePath = path.dirname(__dirname);
  app.use(express.static(path.join(basePath, "client/dist")));

  app.get("*", function (req, res) {
    const indexPath = path.join(basePath, "client/dist/index.html");

    res.sendFile(indexPath, function (err) {
      if (err) {
        console.error("Error sending index.html:", err);
        res.status(500).send(err);
      } else {
        console.log("Index.html send successfully");
      } 
    });  
  });
  
}else{
  console.log("Great")
}
//test


 
connect()
  .then(() => {
    try {
      server.listen(port, () => {
        console.log(`The server is running at port number ${port} `);
      });
    } catch (err) {
      console.log("Cannot Connect to the server", err);
    }
  })
  .catch((err) => {
    console.log("Invalid Database Connection !!", err);
  });