import { Router } from 'express';
import { authenticateUser, createUser, deleteUser, editUser, logoutUser, userProfile, usersList } from '../controller/userController.js';
import { isAdmin, isAuthenticated } from '../middleware/authMiddleware.js';
import upload from '../config/multerConfig.js'

const router = Router();

router.post('/auth/login', authenticateUser)
      .post('/auth/register', upload.single('profileImage'), createUser)
      .post('/auth/logout', isAuthenticated, logoutUser)
      .get('/users', isAuthenticated, isAdmin, usersList)
      .get('/user', isAuthenticated, userProfile)
      .put('/user', isAuthenticated, upload.single('profileImage'), editUser)
      .delete('/user', isAuthenticated, isAdmin, deleteUser);

export default  router;