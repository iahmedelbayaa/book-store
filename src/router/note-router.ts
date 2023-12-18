import express from 'express';
import * as noteCtrl from '../controller/note-controller';
const router = express.Router();

router.get('/notes', noteCtrl.getAllNotes);
router.post('/notes/save', noteCtrl.saveNotes);
router.put('/notes/update', noteCtrl.updateNotes);
router.delete('/notes/delete', noteCtrl.deleteNotes);

export default router;
