import express from "express";
import * as FlashcardController from "./../controllers/flashcard-controller.js";

const router = express.Router();

router.route("/").get(FlashcardController.get).post(FlashcardController.post);
router.route("/update/:id").put(FlashcardController.update);
router.route("/delete/:id").delete(FlashcardController.remove);

//Nesting with id
router.route("/:id").get(FlashcardController.getSpecific);

export default router;
