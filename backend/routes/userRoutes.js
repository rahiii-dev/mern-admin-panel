import { Router } from 'express';
import { authenticateUser, createUser, deleteUser, editUser, logoutUser, userProfile, usersList } from '../controller/userController.js';
import { isAdmin, isAuthenticated } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/auth/login', authenticateUser)
      .post('/auth/register', createUser)
      .post('/auth/logout', isAuthenticated, logoutUser)
      .get('/users', isAuthenticated, isAdmin, usersList)
      .get('/user', isAuthenticated, userProfile)
      .put('/user', isAuthenticated, editUser)
      .delete('/user', isAuthenticated, isAdmin, deleteUser);

export default  router;