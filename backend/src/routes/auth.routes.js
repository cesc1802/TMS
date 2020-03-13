const authCtrl = require('../controllers/auth.controller');
const router = require('../lib/Api')({
    name: 'auth',
    prefix: '/auth',
    option: {
        allowAnonymous: true
    }
});

router.post('/login', authCtrl.login);

module.exports = router;