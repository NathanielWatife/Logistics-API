const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    res.send('Create a new package');
});

router.get('/:id', (req, res) => {
    res.send(`Get detail of package with ID ${req.params.id}`);
});

router.put('/:id', (req, res) => {
    res.send(`Update the package with ID ${req.params.id}`);
});

router.delete('/:id', (req, res) => {
    res.send(`Delete package with ID ${req.params.id}`);
});

module.exports = router;