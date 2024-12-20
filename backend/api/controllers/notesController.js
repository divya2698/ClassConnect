import Note from "./../models/notemodel.js";

//Create a new note
export const newNote = async (req, res) => {
    const note = new Note(req.body);
    try {
        await note.save();
        res.send({ data: note, success: true });
    } catch (error) {
        res.status(400).send({ error });
    }
};

//Fetch notes

export const notes = async (req, res) => {
    const user_id = req.params.id;
    const user_type = req.params.user_type;

    try {
        const notes = await Note.find({ user_id, user_type }).exec();
        if (!notes)
            return res
                .status(404)
                .send({ success: false, data: "No notes found" });

        res.send({ success: true, data: notes });
    } catch (error) {
        res.status(500).send({ success: false, error });
    }
};

//Delete note
export const deleteNote = async (req, res) => {
    const _id = req.params.id;
    try {
        const note = await Note.findByIdAndDelete(_id);
        if (note) res.send({ success: true, data: note });
        else res.send({ success: false });
    } catch (error) {
        res.status(400).send({ error });
    }
};
