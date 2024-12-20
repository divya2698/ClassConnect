import * as flashcardService from "./../services/flashcard-service.js";
import { setResponse, setError } from "./index.js";

//Create controller
export const post = async (req, res) => {
    try {
        //Get request body
        const flashcard = req.body;
        const savedFlashcard = await flashcardService.save(flashcard);
        setResponse(savedFlashcard, res);
    } catch (error) {
        setError(error, res);
    }
};

export const get = async (req, res) => {
    try {
        const flashcards = await flashcardService.getAll();
        setResponse(flashcards, res);
    } catch (error) {
        setError(error, res);
    }
};

export const update = async (req, res) => {
    try {
        const flashcard = req.body;
        //Get request parameter id
        const id = req.params.id;
        const updatedItem = await flashcardService.update(flashcard, id);
        setResponse(updatedItem, res);
    } catch (error) {
        setError(error, res);
    }
};

export const remove = async (req, res) => {
    try {
        const id = req.params.id;
        const flashcardItem = await flashcardService.remove(id);
        setResponse(flashcardItem, res);
    } catch (error) {
        setError(error, res);
    }
};

export const getSpecific = async (req, res) => {
    try {
        const flashcard = await flashcardService.getSpecific(req);
        setResponse(flashcard, res);
    } catch (error) {
        setError(error, res);
    }
};
