
POS MERN (Point of Sale System)
===============================

A full-stack Point of Sale (POS) application built using the MERN stack (MongoDB, Express.js, React.js, Node.js). This system allows users to manage products, sales, customers, and suppliers through a modern and user-friendly dashboard interface.

Tech Stack
----------
Frontend:
- React.js
- React Router
- Context API 
- BootStrap and custom CSS

Backend:
- Node.js
- Express.js

Database:
- MongoDB (with Mongoose)

Features
--------
- User Dashboard with navigation
- Product management (CRUD)
- Sales tracking and reporting
- Customer and supplier management
- Responsive UI
- Dark mode support (optional)
- Authentication (Login/Logout) *(if implemented)*


Installation
------------
1. Clone the repository
   git clone https://github.com/AhmadRazzaq72/Point-of-Sale_MERN.git
   cd Point-of-Sale_MERN

2. Install dependencies
   npm install
   cd backend && npm install

3. Run client and server
   npm run both

   This will run:
   - React app on http://localhost:3000
   - Node backend on http://localhost:5000

Build for Production
--------------------
To build the React frontend:
npm run build

The production-ready build will be stored in the client/build directory.

Scripts
-------
Command           | Description
------------------|------------------------------------------
npm run both      | Runs both frontend and backend
npm start         | Runs React client only
npm run server    | Runs backend server only (Nodemon)
npm run build     | Builds React app for production

Important Notes
---------------
- Update .env file for MongoDB connection string and environment variables.
- Ensure MongoDB is running locally or provide a cloud URI (e.g. MongoDB Atlas).
- REST APIs are hosted under /api routes.

License
-------
This project is licensed under the MIT License — feel free to use it for learning or commercial purposes.

Author
------
Ahmad Razzaq
GitHub: https://github.com/AhmadRazzaq72


Screenshots
------------

![DashBoard](<Screenshot (9).png>) ![Sale](<Screenshot (10).png>) ![Sale Preview](<Screenshot (11).png>) ![Product List](<Screenshot (12).png>) ![Customer List](<Screenshot (13).png>) ![Supplier List](<Screenshot (14).png>) ![Report Detail](<Screenshot (15).png>) ![Report List](<Screenshot (16).png>) 
