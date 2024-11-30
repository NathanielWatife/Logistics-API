const express = require('express');
// added http for socker server creation
const http = require('http');
const { Server } = require('socket.io');
const bodyParser = require('body-parser');
const cors = require('cors');

// import routes
const userRoutes = require('./routes/user');
const packageRoutes = require('./routes/package');
const driverRoutes = require('./routes/driver'); // Import driver routes
const vehicleRoutes = require('./routes/vehicle');
const errorHandler = require('./middleware/errorHandler');
const pricingRoutes = require('./routes/pricing');

const app = express();
// create an http server
const server = http.createServer(app);
// attach socket.io
const io = new Server(server, { cors: { origin: '*' } });

app.use(bodyParser.json());
app.use(cors());

// Register routes
app.use('/api/users', userRoutes);
app.use('/api/packages', packageRoutes);
app.use('/api/drivers', driverRoutes); // Attach driver routes
app.use('/api/vehicles', vehicleRoutes);
app.use('/api/pricing', pricingRoutes);

// handle realtime tracking
io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);
    // handle location updates
    socket.on('updateLocation', (data) => {
        console.log('Loaction update recieved:', data);
        // broadcast update location to all connected clients
        io.emit('locationUpdate', data);
    });

    socket.on('disconnet', () => {
        console.log('Client disconnected:', socket.id);
    });
});



// error handling 
app.use(errorHandler);

// start the sever
server.listen (5000, () => {
    console.log('Server is running on port 5000')
});