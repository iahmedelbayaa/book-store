import express from 'express';
import * as bookCtrl from '../controller/book.controller';
const router = express.Router();

router.get('/books', bookCtrl.getBookList);
router.get('/books/details/:bookId', bookCtrl.getDetailsList)
router.post('/books/save', bookCtrl.saveBook);
router.put('/books/update', bookCtrl.updateBook);
router.delete('/books/delete/:bookId', bookCtrl.deleteBook);

export default router;
