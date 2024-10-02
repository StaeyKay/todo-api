import jwt from 'jsonwebtoken';

export const checkAuth = async (req, res, next) => {

    if (req.headers.authorization) {
        try {
        // Extract token from headers
        const token = req.headers.authorization.split(' ')[1]

        // Verify the token to get user and append to user to request
        req.user = jwt.verify(token, process.env.JWT_PRIVATE_KEY)

        next()
        } catch (error) {
            return res.status(401).json({error: error})
        }
    } else {
        res.status(401).json({error: 'Not authenticated'})
    }
}