const { Driver } = require('../models');

exports.createDriver = async (req, res) => {
  try {
    const { name, phone, license_number, vehicle_id } = req.body;

    const driver = await Driver.create({
      name,
      phone,
      license_number,
      vehicle_id,
    });

    return res.status(201).json({ message: 'Driver created successfully', driver });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

exports.getDriver = async (req, res) => {
  try {
    const driver = await Driver.findByPk(req.params.id);
    if (!driver) return res.status(404).json({ error: 'Driver not found' });

    return res.json(driver);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

exports.listDrivers = async (req, res) => {
  try {
    const drivers = await Driver.findAll();
    return res.json(drivers);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

exports.updateDriver = async (req, res) => {
  try {
    const driver = await Driver.findByPk(req.params.id);
    if (!driver) return res.status(404).json({ error: 'Driver not found' });

    await driver.update(req.body);
    return res.json({ message: 'Driver updated successfully', driver });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};
