# ORM-performenace-comparasion

## Setup

1. clone project
2. Run `npm install`
3. Make sure `ts-node` is installed globally `npm install ts-node -g`
4. Run the project `npm start`

### .ENV

To get the tests to run properly, an environment `.env` file has to be added to the project. The environment file should contain the variables necessary for connection to your database. You also need to set the database url which is read and used in the Prisma schema by Prisma to establish its database connection:

```ENV
# MikroORM and Sequelize configuration
DATABASE_NAME = "YOUR_DATABASE_NAME"
DATABASE_HOST = "YOUR_DATABASE_HOST"
DATABASE_USERNAME = "YOUR_DATABASE_USERNAME"
DATABASE_PORT = 3306
DATABASE_PASSWORD = "YOUR_DATABASE_PASSWORD"

# Prisma configuration
DATABASE_URL="mysql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"
```

## Run newman script

```
ts-node newman.ts $iterations $library $operation $query
```
