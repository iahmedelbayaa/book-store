import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import logInRouter from './router/login-router'
import storeRouter from './router/store-router';
import userRouter from './router/user-router';
import bookRouter from './router/book-router';
import * as errorHandler from './middelware/error-handler'
// import swaggerUi from 'swagger-ui-express';
// const swaggerDocument = require('./swagger.json');

var app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



app.get('/', (req, res) => {
  res.send('Hello Be3o!');
});





app.use('/api/v1', storeRouter);
app.use('/api/v1', bookRouter)
app.use('/api/v1', userRouter);
app.use('/api/v1', logInRouter);
app.use(errorHandler.handle);
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


const port = 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
