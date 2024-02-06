import jwt from 'jsonwebtoken';

export const verifyToken = async (req, res, next) => {
    try {
        const token = await req.cookies.access;

        if (!token) {
            return res.status(400).json("token not found");
        }
        jwt.verify(token, process.env.JWT, (err, user) => {
            if (err) {
                return res.status(400).json(err.message);
            }
            req.user = user;
        })
        next();

    } catch (err) {
        return res.status(500).json("authentication error");
    }
}