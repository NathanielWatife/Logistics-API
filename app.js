const express = require('express');
const bodyParser = require('body-parser');

const userRoutes = require('./routes/user');
const packageRoutes = require('./routes/package');
const driverRoutes = require('./routes/driver'); // Import driver routes
const vehicleRoutes = require('./routes/vehicle');

const app = express();

app.use(bodyParser.json());

// Register routes
app.use('/api/users', userRoutes);
app.use('/api/packages', packageRoutes);
app.use('/api/drivers', driverRoutes); // Attach driver routes
app.use('/api/vehicles', vehicleRoutes);

app.listen(5000, () => console.log('Server running on port 5000'));
