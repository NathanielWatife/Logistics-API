# TrackLogic
## TrackLogic is a platform for Logistics 

## Key Features of TrackLogic:
### User Management:
- Registration
    - Register new user (email, phone number, name).
    - Email/phone number verification (OTP or link-based).
    - Password hashing and security (use bcrypt or similar library).

- Authentication
    - Login (JWT-based authentication for secure session management).
    - Logout (invalidate token or token blacklist mechanism).
    - Password reset (OTP/email verification).
    - Multi-factor authentication (optional for higher security).

- User Profile
    - Update personal details (name, email, phone number).
    - Add addresses (e.g., default pickup/delivery locations).

### Package Management
- Package Details
    - Weight (in kg or lbs).
    - Dimensions (optional, for better cost calculations).
    - Unique package ID (UUID or custom logic).
    - Quantity.

### Pricing
- Dynamic price calculation based on:
    - Weight.
    - Distance.
    - Transit type.
    - Discounts or promotional codes.

### Transit Types
    - Options: Bike, Car, Van/Mini Van.
    - Configurable per package weight/dimensions (e.g., packages exceeding a certain weight should be restricted to Van/Mini Van).


### Delivery Management
- Delivery Address
    - Pickup station selection.
    - Door delivery with geolocation for enhanced accuracy.
    - Specified delivery date (validations for future dates only).

- Delivery Status Tracking
- Real-time status updates:
    - Pending pickup.
    - In transit.
    - Out for delivery.
    - Delivered.
    - Real-time GPS tracking of the package (integrate with services like Google Maps API or Mapbox).

### Notifications
    - Email/SMS notifications for key events (registration, package update, delivery status change).



## Tech Stack
### Backend

    - Node.js with Express or NestJS for API development.
    - MongoDB (NoSQL) or PostgreSQL (relational) for database management.
    - Redis for caching (e.g., session management, real-time location updates).
    - Socket.IO for real-time tracking updates.

    - Docker for containerization.
    - Kubernetes for scalability.
    - AWS/Google Cloud/Azure for hosting.

### API Design Suggestions

- User Management
```
POST /api/users/register - Register a user.
POST /api/users/login - Authenticate user.
POST /api/users/logout - Logout user.
GET /api/users/profile - Retrieve user profile.
PUT /api/users/profile - Update user profile.
```
- Package Management
```
POST /api/packages - Create a package.
GET /api/packages/:id - Retrieve package details.
PUT /api/packages/:id - Update package details.
GET /api/packages - List all packages for a user.
```

- Delivery Management
```
POST /api/deliveries - Create a delivery request.
GET /api/deliveries/:id - Track delivery.
PUT /api/deliveries/:id - Update delivery details (e.g., reschedule).
Pricing
GET /api/pricing - Retrieve price estimate.
```

- Database Schema

    - Entities: User, Package, Delivery, TransitType, Pricing.




# Logistics API Documentation
## Overview
The Logistics API is designed to manage users, packages, delivery, drivers, and vehicles for a logistics service. It provides functionalities for user registration, package creation, delivery management, tracking, and driver/vehicle assignments.

Base URL
```
https://api.logistics-service.com/v1
```
- Endpoints
1. User Management
Register User
```
POST /api/users/register
```

Registers a new user with email and phone verification.

Request Body:
```
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "+1234567890"
}
```
Response:
```
{
  "message": "User registered successfully. Verify your email."
}
```

Login
```
POST /api/users/login
```

Authenticates a user and returns a token.

Request Body:
```
{
  "email": "john@example.com",
  "password": "password123"
}
```
Response:

```
{
  "token": "jwt-token-string"
}
```

User Profile
```
GET /api/users/profile
```

Retrieves user profile data. Requires authentication.

Headers:
Authorization: Bearer <jwt-token>
Response:
```
{
  "id": "12345",
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "addresses": [
    {
      "type": "home",
      "address": "123 Main St, City, Country"
    }
  ]
}
```

2. Package Management
Create Package

```
POST /api/packages
```

Creates a new package for delivery.

Request Body:
```
{
  "weight": 5.0,
  "dimensions": { "length": 10, "width": 10, "height": 5 },
  "quantity": 1,
  "pickup_address": "123 Pickup St",
  "delivery_address": "456 Delivery Ave"
}
```
Response:

```
{
  "id": "package-123",
  "price": 20.5,
  "message": "Package created successfully"
}
```
Get Package
```
GET /api/packages/:id
```
Fetches details of a specific package.

Response:
```
{
  "id": "package-123",
  "weight": 5.0,
  "quantity": 1,
  "price": 20.5,
  "status": "Pending pickup"
}
```

3. Delivery Management
Create Delivery

```
POST /api/deliveries
```

Creates a delivery request for a package.

Request Body:
```
{
  "package_id": "package-123",
  "transit_type": "bike",
  "delivery_type": "door",
  "delivery_date": "2024-12-01"
}
```
Response:
```
{
  "delivery_id": "delivery-456",
  "status": "Pending"
}
```

Track Delivery
```
GET /api/deliveries/:id/track
```

Tracks the real-time status of a delivery.

Response:
```
{
  "delivery_id": "delivery-456",
  "status": "In transit",
  "location": {
    "latitude": 37.7749,
    "longitude": -122.4194
  }
}
```

4. Driver Management
Register Driver
```
POST /api/drivers
```

Registers a new driver.

Request Body:
```
{
  "name": "Driver Name",
  "phone": "+1234567890",
  "license_number": "LIC-123456",
  "vehicle_id": "vehicle-789"
}
```
Response:
```
{
  "driver_id": "driver-567",
  "message": "Driver registered successfully"
}
```

Get Drivers
```
GET /api/drivers
```

Fetches a list of registered drivers.

Response:
```
[
  {
    "id": "driver-567",
    "name": "Driver Name",
    "phone": "+1234567890",
    "vehicle_id": "vehicle-789"
  }
]
```

5. Vehicle Management
Register Vehicle
```
POST /api/vehicles
```

Registers a vehicle for deliveries.

Request Body:
```
{
  "type": "van",
  "model": "Ford Transit",
  "license_plate": "ABC-1234",
  "capacity": {
    "weight": 1000,
    "volume": { "length": 200, "width": 150, "height": 100 }
  }
}
```

Response:
```
{
  "vehicle_id": "vehicle-789",
  "message": "Vehicle registered successfully"
}
```


Get Vehicles
```
GET /api/vehicles
```

Fetches a list of registered vehicles.

Response:
```
[
  {
    "id": "vehicle-789",
    "type": "van",
    "model": "Ford Transit",
    "license_plate": "ABC-1234",
    "capacity": {
      "weight": 1000,
      "volume": { "length": 200, "width": 150, "height": 100 }
    }
  }
]
```

6. Pricing
Get Price Estimate
```
POST /api/pricing
```

Estimates the price for a delivery based on package weight, distance, and transit type.

Request Body:
```
{
  "weight": 5.0,
  "distance": 15,
  "transit_type": "bike"
}
```
Response:
```
{
  "price": 10.0
}
```


7. Notifications
Send Notification
```
POST /api/notifications
```

Sends an SMS or email notification for delivery updates.

Request Body:
```
{
  "user_id": "12345",
  "message": "Your package is out for delivery."
}
```

Response:
```
{
  "status": "Sent",
  "delivery_id": "delivery-456"
}
```

Error Handling
Common errors:

- 400 Bad Request - Invalid input data.
- 401 Unauthorized - Missing or invalid token.
- 404 Not Found - Resource not found.
- 500 Internal Server Error - Server-side issue.

Authentication
All protected routes require the Authorization header:

```
Authorization: Bearer <jwt-token>
```



## Setup postgreSQL with Sequelize
- initialize sequelize
```
npx sequelize-cli init
```

## Define Models
- User Model
Create the user model:
```
npx sequelize-cli model:generate --name User --attributes name:string,e
```

Package Model
```
npx sequelize-cli model:generate --name Package --attributes weight:float,quantity:integer,pickup_address:string,delivery_address:string,price:float,status:string
```

Driver Model
```
npx sequelize-cli model:generate --name Driver --attributes name:string,phone:string,license_number:string
```

Vehicle Model
bash
Copy code
npx sequelize-cli model:generate --name Vehicle --attributes type:string,model:string,license_plate:string,capacity:json


5. Build API Endpoints