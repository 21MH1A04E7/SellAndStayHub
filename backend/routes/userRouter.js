import express from 'express';
import {updateUser,deleteUser,getUserListings} from '../controllers/userControllers.js'
import {verifyToken} from '../utils/verifyToken.js'
const router=express.Router();

//checking the person is authenticated or not
router.post('/update/:id',verifyToken,updateUser)
router.delete('/delete/:id',verifyToken,deleteUser)
router.get('/listings/:id',verifyToken,getUserListings)

export default router;