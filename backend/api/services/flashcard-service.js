import Flashcard from "../models/Flashcard.js";

//create
export const save = (newFlashcard) => {
    const flashcardItem = new Flashcard(newFlashcard);
    return flashcardItem.save();
};

//get
export const getAll = async () => {
    const flashcardItems = Flashcard.find({}).exec();
    return flashcardItems;
};

//put or update
export const update = async (flashcard, id) => {
    flashcard = Object.assign(flashcard, { lastModifiedDate: Date.now() });
    const updatedItem = Flashcard.findByIdAndUpdate(id, flashcard);
    return updatedItem;
};

//delete
export const remove = async (id) => {
    const updatedItem = Flashcard.findByIdAndDelete(id);
    return updatedItem;
};

//get specific flashcard
export const getSpecific = async (req) => {
    const _id = req.params.id;
    const flashcard = await Flashcard.findById(_id);
    return flashcard;
};
