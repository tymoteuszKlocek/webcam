import express from 'express';
import md5 from 'md5';
import models from '../models';

const router = express.Router();

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

router.post('/', (req, res) => {

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

module.exports = router;

