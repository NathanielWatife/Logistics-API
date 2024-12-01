const jwt = require('jsonwebtoken');
const { User } = require('../models');
require('dotenv').config();const supabase = require('../supabase');

// Register a new user
exports.register = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    const { data, error } = await supabase
      .from('users')
      .insert({ name, email, password, phone });

    if (error) throw error;

    res.status(201).json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get user by email
exports.getUserByEmail = async (req, res) => {
  try {
    const { email } = req.params;

    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (error) throw error;

    res.json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update user
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', id);

    if (error) throw error;

    res.json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete user
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from('users')
      .delete()
      .eq('id', id);

    if (error) throw error;

    res.status(204).send();
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
