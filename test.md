## Table of Contents

- [Project Structure](#project-structure)
- [Frontend](#frontend)
- [Backend](#backend)
- [Setup and Installation](#setup-and-installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Project Structure

This project is a MERN stack application, meaning it uses:

- **MongoDB:** A NoSQL database for storing data.
- **Express.js:** A Node.js framework for building the backend API.
- **React:** A JavaScript library for building the frontend user interface.
- **Node.js:** The runtime environment for both the backend and frontend.

The project is structured as follows:

```
├── backend
│   ├── controllers
│   │   ├── user
│   │   │   ├── auth.controller.js
│   │   │   ├── job.controller.js
│   │   │   └── user.controller.js
│   │   └── company
│   │       └── company.controller.js
│   ├── models
│   │   ├── User.js
│   │   ├── Company.js
│   │   └── Job.js
│   ├── routes
│   │   ├── user
│   │   │   ├── auth.routes.js
│   │   │   ├── job.routes.js
│   │   │   └── user.routes.js
│   │   └── company
│   │       └── company.routes.js
│   ├── config
│   │   └── db.js
│   ├── app.js
│   └── index.js
├── client
│   ├── src
│   │   ├── components
│   │   │   ├── Dashboard
│   │   │   │   ├── common
│   │   │   │   │   ├── Navbar
│   │   │   │   │   │   └── index.jsx
│   │   │   │   │   ├── Filters
│   │   │   │   │   │   └── index.jsx
│   │   │   │   │   └── JobCard
│   │   │   │   │   │   └── index.jsx
│   │   │   │   ├── JobDetails
│   │   │   │   │   └── index.jsx
│   │   │   │   ├── JobList
│   │   │   │   │   └── index.jsx
│   │   │   │   └── SearchDropdown.jsx
│   │   ├── hooks
│   │   │   ├── useFilters.js
│   │   │   └── useJobs.js
│   │   ├── pages
│   │   │   ├── _app.jsx
│   │   │   ├── dashboard
│   │   │   │   └── index.jsx
│   │   │   ├── login
│   │   │   │   └── index.jsx
│   │   │   ├── register
│   │   │   │   └── index.jsx
│   │   │   ├── settings
│   │   │   │   └── index.jsx
│   │   │   └── job
│   │   │       └── [id].jsx
│   │   ├── utils
│   │   │   └── api.js
│   │   ├── layouts
│   │   │   └── MainLayout.jsx
│   │   ├── app
│   │   │   └── index.jsx
│   │   ├── styles
│   │   │   └── globals.css
│   │   └── constants
│   │       └── routes.js
│   ├── public
│   │   └── index.html
│   └── next.config.js
├── .env
├── .eslintrc.js
├── .prettierrc.js
├── tsconfig.json
├── package.json
└── README.md

```

### Backend

The backend is located in the `backend` directory. It is responsible for:

- **API endpoints:** Defining the API routes and handling requests.
- **Database interactions:** Connecting to the MongoDB database and performing CRUD operations.
- **Authentication:** Handling user login and registration.
- **Data validation:** Ensuring that data is valid before it is stored in the database.

### Frontend

The frontend is located in the `client` directory. It is responsible for:

- **User interface:** Building the user interface using React components.
- **Data fetching:** Making API requests to the backend to retrieve data.
- **State management:** Managing the application state using React hooks.
- **Routing:** Handling navigation between different pages.

### Running the Project

To run the project, follow these steps:

1. **Install dependencies:**

   ```bash
   cd backend
   npm install
   cd ../client
   npm install
   ```

2. **Start the backend server:**

   ```bash
   cd backend
   npm start
   ```

3. **Start the frontend development server:**
   ```bash
   cd client
   npm run dev
   ```

The frontend will be accessible at `http://localhost:3000`.

### Contributing

Contributions are welcome! Please open an issue or submit a pull request.

### License

This project is licensed under the MIT License.
