import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import noteRouter from './router/note-router';
import storeRouter from './router/store-router';
import bookRouter from './router/book-router'
var app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



app.get('/', (req, res) => {
  res.send('Hello Be3o!');
});





app.use('/api/v1', noteRouter);
app.use('/api/v1', storeRouter);
app.use('/api/v1', bookRouter)



const port = 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
