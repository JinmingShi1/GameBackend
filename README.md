# Getting Started
This is a backend project based on ExpressJS.

>**Note**: Make sure you have latest version of NodeJS installed on your machine.

To run this project, first you need to install dependencies by running:
```bash
# using npm
npm install

# OR using Yarn
yarn i
```

Then you need to change some configurations based on your need.

For MySQL database configuration, change db.js with your config:
```bash
host: 'localhost',
user: 'root',
password: 'root',
database: 'test',
connectionLimit: 5,
```

Then execute **test_game_history.sql** and **test_user.sql** to create two tables in your database.

## Start your Application

```bash
# using npm
npm run dev

# OR using Yarn
yarn dev
```
 everything is set up correctly, you should a service running at localhost:9000

