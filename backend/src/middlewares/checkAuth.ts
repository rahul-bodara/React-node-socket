const jwt = require('jsonwebtoken');

exports.Auth = (req, res, next) => {

    try {

        const token = req.headers.authorization.replace('Bearer ','')

        // console.log(token)
        const decoded = jwt.verify(token, 'secret');
        // console.log(decoded)
        req.user = decoded;
        next();


    } catch (error) {
        return res.status(401).json({
            message: 'Auth failed!!',
        });
    }
};