import About from "../models/About.js";

export const getAbout = async (req, res) => {
  try {
    const about = await About.findOne();
    res.json(about);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateAbout = async (req, res) => {
  const { content } = req.body;

  try {
    let about = await About.findOne();
    if (!about) about = new About({ content });
    else about.content = content;

    await about.save();
    res.json({ message: "Updated successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
