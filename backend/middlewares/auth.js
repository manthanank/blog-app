const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const auth = req.headers.authorization;

    // Check if authorization header exists and starts with 'Bearer '
    if (!auth || !auth.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    // Extract the token from the authorization header
    const token = auth.split(' ')[1];

    try {
        // Verify the token using the TOKEN_SECRET
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        // Handle token expiration error
        if (err instanceof jwt.TokenExpiredError) {
            return res.status(401).json({ message: 'Token expired' });
        }
        // Handle invalid token error
        res.status(403).json({ message: 'Invalid token' });
    }
};
