import { Router } from 'express';
import { authenticateUser, createUser, deleteUser, editUser, logoutUser, userProfile, usersList } from '../controller/userController.js';

const router = Router();

router.post('/auth/login', authenticateUser)
      .post('/auth/register', createUser)
      .post('/auth/logout', logoutUser)
      .get('/users', usersList)
      .get('/user', userProfile)
      .put('/user', editUser)
      .delete('/user', deleteUser);

export default  router;