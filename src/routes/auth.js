const { Router } = require('express');
const AuthController = require('../controllers/auth/auth.controller');
const asyncHandler = require("../utils/AsyncHandler");
const auth = require('../utils/Authorization')
const RoleGuard = require("../utils/RoleGuard");


const router = Router();

router.post('/register', asyncHandler(AuthController.userRegistration))
router.post('/login', asyncHandler(AuthController.userLogin))
router.post('/refresh-token', asyncHandler(AuthController.refreshToken));
router.patch('/update-password', asyncHandler(AuthController.updatePassword));
router.get('/users', [auth, RoleGuard(['admin'])], asyncHandler(AuthController.getUsers))


module.exports = router;
