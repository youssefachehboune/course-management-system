# Course Management System

This project combines a **Next.js** frontend and a **NestJS** backend with **MongoDB** as the database, all orchestrated using Docker and Docker Compose.

## Prerequisites

Before you start, ensure you have the following installed on your machine:

- [Docker](https://www.docker.com/get-started) (including Docker Compose)
- [Node.js](https://nodejs.org/) (for local development, optional)

## Project Structure
```
course-management-system/ 
├── backend/               # NestJS backend &&
│   ├── Dockerfile &&
│   ├── src/ &&
│   └── ... &&
├── frontend/              # Next.js frontend &&
│   ├── Dockerfile &&
│   ├── app/ &&
│   └── ... &&
├── docker-compose.yml     # Docker Compose file &&
└── README.md 
```

## Setup and Configuration

1. **Clone the Repository**:
    ```bash
   git clone https://github.com/youssefachehboune/course-management-system.git && cd course-management-system
   ```

2. **Environment Configuration**:
   - Create an `.env` file in the `frontend/` directory to specify the API URL:
    ``` NEXT_PUBLIC_API_URL=http://localhost:3001/api ```

3. **Install Dependencies** (Optional):
   - If you want to run the frontend or backend locally without Docker, navigate to each directory (`backend/` or `frontend/`) and run:
    ```bash
     npm install 
     ```

## Running the Application

### Using Docker Compose

1. **Build and Start the Containers**:
   In the root directory of your project, run:
   ```bash
   docker-compose up --build
   ```

   This command builds and starts all services (NestJS backend, Next.js frontend, MongoDB). The services will be accessible as follows:
   - **Frontend (Next.js)**: [http://localhost:3000](http://localhost:3000) 
   - **Backend (NestJS)**: [http://localhost:3001](http://localhost:3001)
   - **MongoDB**: Accessible on `mongodb://localhost:27017`

2. **Stop the Containers**:
   To stop the running containers, use:
   ```bash
   docker-compose down
   ```