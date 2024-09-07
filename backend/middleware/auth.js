import jwt  from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
    const {token} = req.headers

    if (!token) {
        return res.status(401).send({ success: false, message: "Access denied" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId = decoded.id;
        next();
    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: "Invalid token" });
    }
}

export default authMiddleware;