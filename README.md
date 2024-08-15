# Inventory Management System

## Description

The Inventory Management System is designed to help users manage their inventory efficiently. The system includes user authentication to ensure that only authorized users can access and modify the inventory. Below is a brief overview of the system's specifications and functionalities:

## Features

- User Authentication: Secure login with username and password to ensure only authorized users can access the system.
- Add Items: Users can add new items to the inventory.
- View Items: Users can view a list of all items in the inventory.
- Get Items API: Fetch the list of inventory items.
- Add Items API: Backend functionality to add new items to the inventory.

## Installation

1. Clone the repository:

   ```bash
   https://github.com/mostafarabie5/Inventory-Management-System.git
   cd Inventory-Management-System
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add the following variables:

   ```plaintext
   JWT_SECRET=your_jwt_secret
   DB_HOST=your_database_host
   DB_USER=your_database_user
   DB_PASSWORD=your_database_password
   DB_NAME=your_database_name
   ```

4. Set up Database
   In the project file there is a folder named `Database` have files to create schema of each table
   Creation order
   ```plaintext
   1- Users Table
   2- InventoryItems
   3- MechanicalParts
   4- ElectricalParts
   5- RawMaterials
   ```


## Usage

1. Start the server:

   ```bash
   npm start
   ```

2. Access the application at `http://localhost:8000`

## API Endpoints

### Authentication


- `POST /api/v1/auth/login`: Login a user
- `POST /api/v1/auth/register`: Register a new user

### Admin

- `GET /api/v1/admins`: Get all users
- `DELETE /api/v1/admins/:id`: Delete user by id
- `PATCH /api/v1/admins/permission/:id`:Make regular user an admin


### Items

- `GET /api/v1/items`: Get all Inventory Items
- `GET /api/v1/mechanical`: Get all Mechanical Parts
- `GET /api/v1/electrical`: Get all Electrical Parts 
- `GET /api/v1/raw`: Get all Raw Materials
- `POST /api/v1/mechanical`: Add Mechanical part 
- `POST /api/v1/electrical`: Add Electrical Part
- `POST /api/v1/raw`: Add Raw Material
- `PATCH /api/v1/mechanical/:id`: Update Mechanical Part by its id 
- `PATCH /api/v1/electrical/:id`: Update Electrical Part by its id 
- `PATCH /api/v1/raw/:id`: Update Raw Material by its id



## Error Handling

The project uses a custom `AppError` class for error handling. Errors are thrown with appropriate status codes and messages.

## Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature-branch`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some feature'`)
5. Push to the branch (`git push origin feature-branch`)
6. Open a Pull Request


## Acknowledgements

- [bcrypt](https://www.npmjs.com/package/bcrypt)
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
- [mysql](https://www.npmjs.com/package/mysql)

## Contact

Mostafa Rabie - [mostafarabie5902@gmail.com](mailto:mostafarabie5902@gmail.com)

Project Link: [https://github.com/mostafarabie5/Inventory-Management-System](https://github.com/mostafarabie5/Inventory-Management-System)
