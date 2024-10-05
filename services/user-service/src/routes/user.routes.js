const express = require('express');
const { register, login, deleteUser, updateUser, getUserById, getAllUsers  } = require('../controllers/user.controller');
const router = express.Router();

router.post('/register', register);

router.post('/login', login);

router.get('/all', getAllUsers);


router.get('/:id', getUserById);

router.put('/:id', updateUser);

router.delete('/:id', deleteUser);


module.exports = router;
