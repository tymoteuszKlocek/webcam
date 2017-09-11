import express from 'express';
import md5 from 'md5';
import models from '../models';

const router = express.Router();

//login
router.post('/login', (req, res) => {

    let schema = {
        'username': {
            notEmpty: true,
            errorMessage: 'Invalid Username'
        },
        'password': {
            notEmpty: true,
            errorMessage: 'Invalid Password'
        },
    };

    models.User.findOne({ where: { username: req.body.username }, raw: true }).then(user => {

        let hashPass = md5(req.body.password);

        if (!user) {

            return res.status(200).send({ success: false, error: 'User not found. Create account.' });
            
        } else if (hashPass === user.password) {

            req.checkBody(schema);
            req.getValidationResult().then((result) => {
                try {
                    result.throw();
                    req.session.user = user;
                    res.status(200).send({ success: true, username: req.body.username });
                } catch (error) {
                    res.status(200).send({ success: false, error: 'Invalid username or password' });
                }
            }).catch(() => {
                res.status(200).send({ success: false, error: 'Invalid username' });
            });

        }
    });

});

// register
router.post('/register', (req, res) => {

    let schema = {
        'email': {
            notEmpty: true,
            isEmail: {
                errorMessage: 'Invalid Email'
            }
        },
        'username': {
            notEmpty: true,
            isLength: {
                options: [{ min: 2, max: 10 }],
                errorMessage: 'Username must be between 2 and 10 chars long'
            },
            errorMessage: 'Invalid Username'
        },
        'password': {
            notEmpty: true,
            isLength: {
                options: [{ min: 4, max: 10 }],
                errorMessage: 'Password must be between 2 and 10 chars long'
            },
            errorMessage: 'Invalid Password'
        },
    };

    models.User.findOne({
        where: {
            username: req.body.username
        }
    }).then((user) => {

        if (user) {

            res.status(200).send({ success: false, error: 'Username is already used.' });
            return;

        } else {

            req.checkBody(schema);
            req.check('password', 'Password not confirmed - repeat the same password!').equals(req.body.confirmPassword);
            req.getValidationResult().then((result) => {

                try {
                    result.throw();

                    let hashPass = md5(req.body.password);

                    models.User.create({
                        username: req.body.username,
                        password: hashPass,
                        email: req.body.email
                    }).then(() => {
                        res.status(200).send({ success: true });
                    }).catch( (error) => {
                        res.status(200).send({ success: false, error: error });
                    });

                } catch (error) {
                    req.session.error = error.array();
                    res.status(200).send({ success: false, error: req.session.error });
                    req.session.error = null;
                }

            });
        }
    });

});

// logout
router.post('/logout', (req, res) => {
    req.session.destroy();
    res.status(200).send({ logged: false });
});

module.exports = router;