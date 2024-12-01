const { Driver } = require('../models');
const supabase = require('../supabase');

// Create a driver
exports.createDriver = async (req, res) => {
  try {
    const { name, phone, license_number, vehicle_id } = req.body;

    const { data, error } = await supabase
      .from('drivers')
      .insert({ name, phone, license_number, vehicle_id });

    if (error) throw error;

    res.status(201).json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get driver by ID
exports.getDriver = async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from('drivers')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;

    res.json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// List all drivers
exports.listDrivers = async (req, res) => {
  try {
    const { data, error } = await supabase.from('drivers').select('*');

    if (error) throw error;

    res.json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update driver
exports.updateDriver = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const { data, error } = await supabase
      .from('drivers')
      .update(updates)
      .eq('id', id);

    if (error) throw error;

    res.json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
