import Contact from "../models/contactModel.js";

export const createMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    console.log(name, email, message);

    const newMessage = new Contact({ name, email, message });
    await newMessage.save();

    res.status(201).json({ message: "Message received successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
  
}
export const getMessage = async (req, res) => {
  try {
    const users = await Contact.find()
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Server error" });

  }
  

};

export const deleteMessage = async (req, res) => {
  try {
    const Message = await Contact.findByIdAndDelete(req.params.id);
    if (!Message) return res.status(404).json({ message: "Message not found" });
    res.json({ message: "Message deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
