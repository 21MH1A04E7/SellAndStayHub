import express from 'express';
import { createListing,deleteListing,updateListing,getListing} from '../controllers/listingControllers.js';
import {verifyToken} from '../utils/verifyToken.js'
const router=express.Router();

router.post('/create',verifyToken,createListing)
router.delete('/delete/:id',verifyToken,deleteListing)
router.post('/update/:id',verifyToken,updateListing)
router.get('/getListing/:id',getListing);

export default router;