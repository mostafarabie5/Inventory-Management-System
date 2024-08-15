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
