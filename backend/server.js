import * as dotenv from "dotenv";
import app from "./api/app.js";

dotenv.config("./.env");

const port = process.env["PORT"];

//Running server on port 8090
app.listen(port, () => {
    console.log(`server is running on ${port}`);
});
