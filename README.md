## Table of Contents

- [Table of Contents](#table-of-contents)
  - [Backend](#backend)
  - [Frontend](#frontend)
  - [Recruiter](#recruiter)
  - [Job Seeker](#job-seeker)
  - [Running the Project](#running-the-project)
  - [Contributing](#contributing)
  - [License](#license)

This project is a MERN stack application, utilizing MongoDB, Express.js, React, and Node.js. The project is structured with a `backend` and `client` directory, each containing their respective components and functionalities.

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

### Recruiter

- **Create jobs from different companies.** - [Screenshot 1: Creating a Job](./screenshots/recruiter/recruiter-create-job.png)
- **Recruiter dashboard (recent applicants, recent jobs, status data in number).** - [Screenshot 1: Recruiter Dashboard](./screenshots/recruiter/recruiter-dashboard.png)
- **Check candidate's resume using inbuilt resume.** - [Screenshot 3: Viewing Applicants](./screenshots/recruiter/recruiter-view-applicant-resume.png)
- **View applicants in each jobs.** - [Screenshot 3: Viewing Applicants](./screenshots/recruiter/recruiter-view-applicants.png)
- **Update candidate status (interviewing, hired, applied, reviewing).** - [Screenshot 4: Updating Candidate Status](./screenshots/recruiter/recruiter-update-status.png)
- **Invite user using codes.** - [Screenshot 5: Inviting Users](./screenshots/recruiter/recruiter-invite-users.png)

### Job Seeker

- **Bookmark job.** - [Screenshot 1: Job Listing](./screenshots/job-seeker-job-listing.png)
- **Infinite joblist scroll.** - [Screenshot 1: Job Listing](./screenshots/job-seeker-job-listing.png)
- **Apply and view jobs.** - [Screenshot 2: Job Details](./screenshots/job-seeker-job-details.png)
- **View applied job and bookmarks.** - [Screenshot 3: Applying for a Job](./screenshots/job-seeker-apply-job.png)
- **Resume builder using data inputs.** - [Screenshot 4: Resume Builder](./screenshots/job-seeker-resume-builder.png)
- **ProfilePic update caching.** - [Screenshot 5: Profile Settings](./screenshots/job-seeker-profile-settings.png)
- **JobFilters mobile responsiveness.** - [Screenshot 1: Job Listing](./screenshots/job-seeker-job-listing.png)

### Running the Project

To run the project, follow these steps:

1. **Install dependencies:**

   ```bash
   cd backend
   npm install
   cd ../client
   npm install
   ```

2. **Set up environment variables:**

   ```bash
   cd backend
   cp .env.example .env
   cd ../client
   cp .env.example .env
   ```

3. **Start the backend server:**

   ```bash
   cd backend
   npm start
   ```

4. **Start the frontend development server:**
   ```bash
   cd client
   npm run dev
   ```

The frontend will be accessible at `http://localhost:3000`.
The backend will be accessible at `http://localhost:8000`.

### Contributing

Contributions are welcome! Please open an issue or submit a pull request.

### License

This project is licensed under the MIT License.
