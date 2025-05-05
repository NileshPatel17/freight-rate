# Freight Rate

## Pre requisite

1. Ensure that postgres db server is running and create a new database

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
Run below command to create db tables
```sh
npx drizzle-kit push --config ./apps/backend2/drizzle.config.ts
```

### Step 5. Run Backend server

To run backend server for your app, use:

```sh
npx nx serve frontend
```

### Step 6. Run frontend app
To run frontend app, use:
```sh
npx nx serve frontend
```