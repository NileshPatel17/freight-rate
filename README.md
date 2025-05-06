# Freight Rate

## Pre requisite

1. Ensure that postgres db server is running.
2. create a new database. That needs to be setup in .env file for backend
3. node and npm


## Tools
- Backend - Nestjs
- Frontend - reactjs with Vite
- Database - Postgres
- ORM - Drizzle
- monorepo - Nx workspace

## Run Applications

### Step 1. Install dependencies

run below command at the root directory of the project
```sh
npm install --force
```

### Step 2. Setup Environment variables for Backend
add below key value to .env file located at apps/backend2
```sh
DATABASE_URL=postgres://<username>:<password>@<host>:<port>/<db_name>
```
sample value
```sh
DATABASE_URL=postgres://postgres:admin@localhost:5432/fright_rate
```
### Step 3. Setup Environment variables for Frontend
add below key value to .env located at apps/frontend
```sh
VITE_API_HOST_URL=http://localhost:3200/api/
```

### Step 4. Db Migration
- Navigate to apps/backend2 directory
- Run below command to create db tables
(Ensure that you are at apps/backend2 directory)
```sh
npx drizzle-kit push
```
![Description](/assets//migration.png)

### Step 5. Run Backend server

To run backend server for your app, run below command:
(Ensure that you are at root directory)
```sh
npx nx serve backend2
```
![Description](/assets//backend.png)

### Step 6. Run frontend app
To run frontend app, run below command:
(Ensure that you are at root directory)
```sh
npx nx serve frontend
```
Ensure that you are at root directory
![Description](/assets//frontend.png)


### API Documentation
 Swagger docs for the API will be accessible locally via URI "**http://localhost:3200/api-docs**"
**Ensure that backend server is running**
![Description](/assets//swagger.png)

### Application Demo
Download Video from below link
- [demo](/assets//demo.mp4)
### Improvement/To do
- [ ] Frontend: usage of state management to maange application state
- [ ] Frontend: allow custom column mapper to choose before proceeding with upload
- [ ] Frontend: usage of axios package. as of now i have used native fetch api to interact with api. We can write a wrapper to access backend api.
- [ ] Frontend: In case of upload fails, showing more user friendly error message