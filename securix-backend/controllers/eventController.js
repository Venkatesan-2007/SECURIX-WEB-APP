import Event from "../models/Event.js";

// Get all events
export const getEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add new event
export const addEvent = async (req, res) => {
  const { name } = req.body;
  try {
    const event = new Event({ name });
    await event.save();
    res.json({ message: "Event added" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update event
export const updateEvent = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const event = await Event.findById(id);
    if (!event) return res.status(404).json({ message: "Event not found" });
    event.name = name;
    await event.save();
    res.json({ message: "Event updated" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete event
export const deleteEvent = async (req, res) => {
  const { id } = req.params;
  try {
    await Event.findByIdAndDelete(id);
    res.json({ message: "Event deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
