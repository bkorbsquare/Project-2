const router = require('express').Router();
const { User } = require('../../models');

router.post('/', async (req, res) => {
    // This must be accessed only if they create a new user, I suppose?
    try {
        // create user with request body info
        const userData = await User.create(req.body);
        // save a new user session
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.status(200).json(userData);
        })

    } catch (err) {
        res.status(400).json(err);
    }
});

// Login attempt post
router.post('/login', async (req, res) => {
    try {
        // Might need to be changed if we don't user username as the key name.
        // find a user by username
        const userData = await User.findOne({ where: { username: req.body.username } });

        if (!userData) {
            res
                .status(400)
                .json({ message: `Incorrect username or password.`});
            return;
        }

        const validPassword = await userData.checkPassword(req.body.password);

        if (!validPassword) {
            res
                .status(400)
                .json({ message: `Incorrect email or password.`});
            return;
        }

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.json({ user: userData, message: 'Logged in.' });
        })

    } catch (err) {
        res.status(400).json(err);
    }
});

router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;