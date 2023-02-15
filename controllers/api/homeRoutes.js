const router = require('express').Router();
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
    // do stuff
})

router.get('/chat', withAuth, async (req, res) => {
    // do stuff
});

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        // do stuff
    }
    res.render('login');
});

module.exports = router;