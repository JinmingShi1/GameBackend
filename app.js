const express = require('express');
const mysql = require('mysql2')
const app = express();
const { expressjwt: jwt } = require("express-jwt");
const config = require('./config');


app.use(jwt({
    secret: config.secretKey,
    algorithms: ["HS256"]
}).unless({
    path: ['/login', '/createUser']
}))


app.use(express.json())

// routers
const userRouter = require('./routes/user');
const historyRouter = require('./routes/history');
app.use('/', userRouter)
app.use('/', historyRouter)

app.listen(9000, () => {
  console.log('server started')
});
