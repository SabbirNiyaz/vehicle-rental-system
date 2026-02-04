# 🚗 Vehicle Rental System (Backend API)

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)  

A **modular, scalable backend API** for managing vehicle rentals, customers, and bookings, with secure role-based authentication (Admin & Customer). Built with **Node.js, TypeScript, Express, and PostgreSQL**.

🔗 GitHub Repo: [https://github.com/SabbirNiyaz/vehicle-rental-system](https://github.com/SabbirNiyaz/vehicle-rental-system)

---

## 🎯 Project Overview

The Vehicle Rental System backend API allows you to:

- **Vehicles** – Manage vehicle inventory and track availability  
- **Customers** – Handle customer accounts and profiles  
- **Bookings** – Create, cancel, and return rentals with automatic pricing calculation  
- **Authentication** – Secure login and role-based access control for Admins and Customers  

---

## 🛠️ Technology Stack

- **Node.js + TypeScript** – Strongly-typed backend logic  
- **Express.js** – RESTful API framework  
- **PostgreSQL** – Relational database  
- **bcrypt** – Password hashing  
- **jsonwebtoken (JWT)** – Authentication  

---

## 📁 Project Structure
VEHICLE-RENTAL-SYSTEM/
│
├── .vercel/
├── dist/
├── node_modules/
│
├── src/
│   ├── auth/
│   │   ├── auth.controller.ts
│   │   ├── auth.route.ts
│   │   └── auth.service.ts
│   │
│   ├── booking/
│   │   ├── booking.controller.ts
│   │   ├── booking.route.ts
│   │   └── booking.service.ts
│   │
│   ├── config/
│   │   ├── db.ts
│   │   └── index.ts
│   │
│   ├── middleware/
│   │   ├── auth.ts
│   │   └── logger.ts
│   │
│   ├── types/
│   │   └── express/
│   │       └── user.d.ts
│   │
│   ├── user/
│   │   ├── user.controller.ts
│   │   ├── user.route.ts
│   │   └── user.service.ts
│   │
│   ├── vehicle/
│   │   ├── vehicle.controller.ts
│   │   ├── vehicle.route.ts
│   │   └── vehicle.service.ts
│   │
│   ├── app.ts
│   ├── end-points-overview.ts
│   └── server.ts
│
├── .env
├── .gitignore
├── package-lock.json
├── package.json
├── tsconfig.json
└── vercel.json


> Modular pattern with clear separation of concerns: **routes → controllers → services → database/models → middleware → utils**  

---

## 📊 Database Tables

### Users
| Field    | Notes |
|----------|-------|
| id       | Auto-generated |
| name     | Required |
| email    | Required, unique, lowercase |
| password | Required, min 6 characters |
| phone    | Required |
| role     | `admin` or `customer` |

### Vehicles
| Field               | Notes |
|--------------------|-------|
| id                  | Auto-generated |
| vehicle_name        | Required |
| type                | 'car', 'bike', 'van', 'SUV' |
| registration_number | Required, unique |
| daily_rent_price    | Required, positive |
| availability_status | 'available' or 'booked' |

### Bookings
| Field           | Notes |
|-----------------|-------|
| id              | Auto-generated |
| customer_id     | Foreign key → Users |
| vehicle_id      | Foreign key → Vehicles |
| rent_start_date | Required |
| rent_end_date   | Required, must be after start date |
| total_price     | Required, positive |
| status          | 'active', 'cancelled', or 'returned' |

---

## 🔐 Authentication & Authorization

**Roles:**

- **Admin** – Full access to vehicles, users, and bookings  
- **Customer** – Can register, view vehicles, and manage own bookings  

**Flow:**

1. Register/Login via `/api/v1/auth/signup` & `/api/v1/auth/signin`  
2. Passwords hashed with **bcrypt**  
3. Receive **JWT token** for protected endpoints  
4. Role-based access control enforced  

---

## 🌐 API Endpoints

### Authentication

| Method | Endpoint          | Access | Description |
|--------|-----------------|--------|------------|
| POST   | /api/v1/auth/signup | Public | Register new user |
| POST   | /api/v1/auth/signin | Public | Login & receive JWT |

### Vehicles

| Method | Endpoint | Access | Description |
|--------|---------|--------|------------|
| POST   | /api/v1/vehicles | Admin | Add new vehicle |
| GET    | /api/v1/vehicles | Public | View all vehicles |
| GET    | /api/v1/vehicles/:vehicleId | Public | View specific vehicle |
| PUT    | /api/v1/vehicles/:vehicleId | Admin | Update vehicle details |
| DELETE | /api/v1/vehicles/:vehicleId | Admin | Delete vehicle (if no active bookings) |

### Users

| Method | Endpoint | Access | Description |
|--------|---------|--------|------------|
| GET    | /api/v1/users | Admin | Retrieve all users |
| PUT    | /api/v1/users/:userId | Admin / Self | Update user profile or role |
| DELETE | /api/v1/users/:userId | Admin | Delete user (if no active bookings) |

### Bookings

| Method | Endpoint | Access | Description |
|--------|---------|--------|------------|
| POST   | /api/v1/bookings | Admin / Customer | Create booking & calculate total price |
| GET    | /api/v1/bookings | Role-based | Admin: all bookings, Customer: own bookings |
| PUT    | /api/v1/bookings/:bookingId | Role-based | Customer: cancel, Admin: mark returned |

---

## 💡 Business Logic

- **Booking Price:** `total_price = daily_rent_price × number_of_days`  
- **Vehicle Status Updates:**  
  - Booking → "booked"  
  - Cancelled/Returned → "available"  
- **Auto-Return:** Bookings automatically marked returned after `rent_end_date`  
- **Deletion Rules:** Users/Vehicles cannot be deleted if they have active bookings  

---

## 📝 Response Patterns

**Success**
```json
{
  "success": true,
  "message": "Operation description",
  "data": "Response data"
}
{
  "success": false,
  "message": "Error description",
  "errors": "Detailed error"
}


