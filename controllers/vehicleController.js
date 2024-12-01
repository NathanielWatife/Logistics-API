const { Vehicle } = require('../models');
const supabase = require('../supabase');

// Create a vehicle
exports.createVehicle = async (req, res) => {
  try {
    const { type, model, license_plate, capacity } = req.body;

    const { data, error } = await supabase
      .from('vehicles')
      .insert({ type, model, license_plate, capacity });

    if (error) throw error;

    res.status(201).json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get vehicle by ID
exports.getVehicle = async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from('vehicles')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;

    res.json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// List all vehicles
exports.listVehicles = async (req, res) => {
  try {
    const { data, error } = await supabase.from('vehicles').select('*');

    if (error) throw error;

    res.json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update vehicle
exports.updateVehicle = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const { data, error } = await supabase
      .from('vehicles')
      .update(updates)
      .eq('id', id);

    if (error) throw error;

    res.json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
