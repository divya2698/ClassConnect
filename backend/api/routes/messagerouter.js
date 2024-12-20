import express from "express";
import * as messageController from "./../controllers/messageController.js";

const Router = express.Router();

Router.route("/message").post(messageController.newMessage);

Router.route("/messages/:id").get(messageController.allMessages);

export default Router;
