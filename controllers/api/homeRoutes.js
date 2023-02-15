const router = require('express').Router();
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
        if (req.session.logged_in) {
            res.redirect('/chat');
            return;
        }
    
        res.render('login');
})

router.get('/chat', withAuth, async (req, res) => {
    try {
        // Find the logged in user based on the session ID
        const userData = await User.findByPk(req.session.user_id, {
          attributes: { exclude: ['password'] },
        });

        const user = userData.get({ plain: true });

        res.render('chat', {
            ...user,
            logged_in: true
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/chat');
        return;
    }

    res.render('login');
});

module.exports = router;