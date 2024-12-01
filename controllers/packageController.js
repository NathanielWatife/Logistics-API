const { Package } = require('../models');
const supabase = require('../supabase');

// Create a package
exports.createPackage = async (req, res) => {
  try {
    const { weight, quantity, pickup_address, delivery_address, price, status } = req.body;

    const { data, error } = await supabase
      .from('packages')
      .insert({ weight, quantity, pickup_address, delivery_address, price, status });

    if (error) throw error;

    res.status(201).json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get package by ID
exports.getPackage = async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from('packages')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;

    res.json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// List all packages
exports.listPackages = async (req, res) => {
  try {
    const { data, error } = await supabase.from('packages').select('*');

    if (error) throw error;

    res.json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update package
exports.updatePackage = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const { data, error } = await supabase
      .from('packages')
      .update(updates)
      .eq('id', id);

    if (error) throw error;

    res.json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
