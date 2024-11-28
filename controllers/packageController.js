const { Package } = require('../models');

exports.createPackage = async (req, res) => {
    try {
        const { weight, quantity, pickup_address, delivery_address, price, status } = req.body;
        const package = await Package.create({
            weight, 
            quantity,
            pickup_address,
            delivery_address,
            price,
            status: status || 'Pending',
        });
        return res.status(201).json({ message: 'Package created successfull', package });
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
};


exports.getPackage = async (req, res) => {
    try {
        const package = await Package.findAll();
        return res.json(package);
    } catch (err) {
        return res.status(400).json({ error: message });
    }
};


exports.updatePackage = async (req, res) => {
    try {
        const package = await Package.findByPk(req.params.id);
        if (!package) return res.status(404).json({ error: 'Package not found' });

        await package.update(req.body);
        return res.json({ message: 'Package updated successfully', package });
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
}