import Message from "./../models/messagemodel.js";

//Post a new message
export const newMessage = async (req, res) => {
  const message = new Message(req.body);
  try {
    await message.save();
    res.send({ data: message, success: true });
  } catch (error) {
    console.log(error);
    res.status(400).send({ error });
  }
};

// Fetch all messages for a course
export const allMessages = async (req, res) => {
  const course_id = req.params.id;

  try {
    const messages = await Message.find({ course_id });
    if (!messages)
      return res
        .status(404)
        .send({ success: false, data: "No messages found" });

    res.send({ success: true, data: messages });
  } catch (error) {
    res.status(500).send({ success: false, error });
  }
};
