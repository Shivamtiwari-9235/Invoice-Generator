const jwt = require("jsonwebtoken");
const User = require("../models/user");

const protect = async (req, res, next) => {

    let token;


    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {

        try {

            token = req.headers.authorization.split(" ")[1];


            const decoded = jwt.verify(
                token,
                process.env.JWT_SECRET
            );


            req.user = await User.findById(decoded.id)
                .select("-password");

            if (!req.user) {
                return res.status(401).json({
                    message: "Not Authorized",
                });
            }


            next();

        }

        catch (error) {

            return res.status(401).json({
                message: "Not Authorized",
            });

        }

    }

    else {

        return res.status(401).json({
            message: "Token Missing",
        });

    }

};


module.exports = protect;
