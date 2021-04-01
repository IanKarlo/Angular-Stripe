const router = require('express').Router();

const SessionController = require('./app/controllers/SessionController');
const UserController = require('./app/controllers/UserController');
const PaymentsController = require('./app/controllers/PaymentsController');

router.post('/login', SessionController.login);
router.post('/register', UserController.store);
router.post('/stripe-webhook', PaymentsController.webhook);

router.use(SessionController.authMiddleware);

router.get('/payments', PaymentsController.index);
router.post('/payment', PaymentsController.store);

module.exports = router;