const { Vehicle } = require('../models');

exports.createVehicle = async (req, res) => {
  try {
    const { type, model, license_plate, capacity } = req.body;

    const vehicle = await Vehicle.create({
      type,
      model,
      license_plate,
      capacity,
    });

    return res.status(201).json({ message: 'Vehicle created successfully', vehicle });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

exports.getVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findByPk(req.params.id);
    if (!vehicle) return res.status(404).json({ error: 'Vehicle not found' });

    return res.json(vehicle);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

exports.listVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.findAll();
    return res.json(vehicles);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

exports.updateVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findByPk(req.params.id);
    if (!vehicle) return res.status(404).json({ error: 'Vehicle not found' });

    await vehicle.update(req.body);
    return res.json({ message: 'Vehicle updated successfully', vehicle });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};
