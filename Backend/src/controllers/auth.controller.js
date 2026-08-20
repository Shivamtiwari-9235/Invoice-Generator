const User = require("../models/user");
const generateToken = require("../utils/generateToken");

const isValidEmail = (email = "") => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);



const registerUser = async (req, res) => {

    try {

        const name = req.body?.name?.trim();
        const email = req.body?.email?.trim().toLowerCase();
        const password = req.body?.password;

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Name, email, and password are required",
            });
        }

        if (!isValidEmail(email)) {
            return res.status(400).json({
                success: false,
                message: "Please provide a valid email address",
            });
        }

        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 6 characters long",
            });
        }


        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({
                success: false,
                message: "User already exists",
            });
        }


        const user = await User.create({
            name,
            email,
            password,
        });


        const safeUser = user.toObject();
        delete safeUser.password;

        res.status(201).json({
            success: true,
            message: "User Registered Successfully",
            token: generateToken(user._id),
            user: safeUser,
        });

    }

    catch (error) {

        if (error?.name === "ValidationError") {
            const firstError = Object.values(error.errors || {})[0]?.message || "Invalid registration data";

            return res.status(400).json({
                success: false,
                message: firstError,
            });
        }

        if (error?.code === 11000) {
            return res.status(400).json({
                success: false,
                message: "User already exists",
            });
        }

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }

};



const loginUser = async (req, res) => {

    try {

        const email = req.body?.email?.trim().toLowerCase();
        const password = req.body?.password;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required",
            });
        }


        const user = await User.findOne({ email });


        if (!user) {

            return res.status(404).json({
                message: "User not found",
            });

        }


        const isMatch = await user.matchPassword(password);


        if (!isMatch) {

            return res.status(401).json({
                message: "Invalid credentials",
            });

        }


        const safeUser = user.toObject();
        delete safeUser.password;

        res.status(200).json({

            success: true,
            message: "Login Successful",
            token: generateToken(user._id),
            user: safeUser,

        });


    }

    catch (error) {

        res.status(500).json({
            message: error.message,
        });

    }

};


module.exports = {

    registerUser,
    loginUser,

};
