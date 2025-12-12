import Service from "../models/Service.js";

// Get all services
export const getServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add new service
export const addService = async (req, res) => {
  const { name } = req.body;
  try {
    const service = new Service({ name });
    await service.save();
    res.json({ message: "Service added" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update service
export const updateService = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const service = await Service.findById(id);
    if (!service) return res.status(404).json({ message: "Service not found" });
    service.name = name;
    await service.save();
    res.json({ message: "Service updated" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete service
export const deleteService = async (req, res) => {
  const { id } = req.params;
  try {
    await Service.findByIdAndDelete(id);
    res.json({ message: "Service deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
