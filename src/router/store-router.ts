import express from 'express';
import * as storeCtrl from '../controller/store-controller';
const router = express.Router();

router.get('/stores', storeCtrl.getStoreList);
router.post('/stores/save', storeCtrl.saveStore);
// router.put('/notes/update', noteCtrl.updateNotes);
// router.delete('/notes/delete', noteCtrl.deleteNotes);

export default router;
