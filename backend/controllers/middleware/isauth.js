import jwt from "jsonwebtoken";
//import message_model from "../../models/message_model";

const isauth = async (req, res) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({
                message: "the user not authenticated."
            });
        }
        const decode = await jwt.verify(token, process.env.SECRET_KEY)
        if (!decode) {
            return res.status(401).json({
                message: "the user not authenticated."
            });
        }
        req.id=decode.userId;
        next();
    } catch (error) {
console.log(error)
    }
}