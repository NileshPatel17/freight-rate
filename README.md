# Freight Rate

## Pre requisite

1. Ensure that postgres db server is running and create a new database
2. node and npm

## Run tasks

### Step 1. Install dependencies

run below command at the root directory of the project
```sh
npm install
```

### Step 2. Setup Environment variables for Backend
add below key value to .env file located at apps/backend2
```sh
DATABASE_URL=postgres://<username>:<password>@<host>:<port>/<db_name>
```

If i have postgres running locally having user 'postgres', password 'admin', port '5432', db name 'fright_rate' then url will be like this
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
you can access by visiting http://localhost:3200/api-docs
ensure that backend server is running
![Description](/assets//swagger.png)