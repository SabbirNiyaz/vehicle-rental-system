export const endPointOverview = {
    "VehicleRentalSystem": {
        "1. Authentication": [
            {
                "method": "POST",
                "endpoint": "/api/v1/auth/signup",
                "access": "Public",
                "description": "Register a new user"
            },
            {
                "method": "POST",
                "endpoint": "/api/v1/auth/signin",
                "access": "Public",
                "description": "Login and receive JWT"
            }
        ],
        "2. Vehicles": [
            {
                "method": "POST",
                "endpoint": "/api/v1/vehicles",
                "access": "Admin",
                "description": "Add new vehicle"
            },
            {
                "method": "GET",
                "endpoint": "/api/v1/vehicles",
                "access": "Public",
                "description": "View all vehicles"
            },
            {
                "method": "GET",
                "endpoint": "/api/v1/vehicles/:vehicleId",
                "access": "Public",
                "description": "View specific vehicle"
            },
            {
                "method": "PUT",
                "endpoint": "/api/v1/vehicles/:vehicleId",
                "access": "Admin",
                "description": "Update vehicle details"
            },
            {
                "method": "DELETE",
                "endpoint": "/api/v1/vehicles/:vehicleId",
                "access": "Admin",
                "description": "Delete vehicle (if no active bookings)"
            }
        ],
        "3. Users": [
            {
                "method": "GET",
                "endpoint": "/api/v1/users",
                "access": "Admin",
                "description": "Retrieve all users"
            },
            {
                "method": "PUT",
                "endpoint": "/api/v1/users/:userId",
                "access": "Admin/Self",
                "description": "Update user profile or role"
            },
            {
                "method": "DELETE",
                "endpoint": "/api/v1/users/:userId",
                "access": "Admin",
                "description": "Delete user (if no active bookings)"
            }
        ],
        "4. Bookings": [
            {
                "method": "POST",
                "endpoint": "/api/v1/bookings",
                "access": "Admin/Customer",
                "description": "Create booking with price calculation"
            },
            {
                "method": "GET",
                "endpoint": "/api/v1/bookings",
                "access": "Role-based",
                "description": "Admin: All bookings, Customer: Own bookings"
            },
            {
                "method": "PUT",
                "endpoint": "/api/v1/bookings/:bookingId",
                "access": "Role-based",
                "description": "Customer: Cancel, Admin: Mark returned"
            }
        ]
    }
}
