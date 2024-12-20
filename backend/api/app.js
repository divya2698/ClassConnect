import cors from "cors";
import mongoose from "mongoose";
import express from "express";
import routes from "./routes/index.js";

// Use express middleware
const app = express();
//Change buffer to utf string in json format
app.use(express.urlencoded());
app.use(express.json());
app.use(cors());
routes(app);

//Mongodb connection - Additional parameters to fix ipv4,ipv6 issue
mongoose
    .connect("mongodb://localhost:27017/studybuddydb", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        family: 4,
    })
    .then(() => console.log("MongoDB successfully connected"))
    .catch((err) => console.log(err));

export default app;
