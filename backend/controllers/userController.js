import userModel from "../models/userModel.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const signup = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json("every details are required");
        }

        let user = await userModel.findOne({ email });
        if (user) {
            return res.status(400).json("user already exists");
        }
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        user = new userModel({ name, email, password: hashedPassword });
        await user.save();
        return res.status(201).json("User created Succesfully");
    } catch (e) {
        res.status(500).json("Internal Server Error");

    }

}
export const signin = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json("every details are required");
        }
        let user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json("user not found");
        }
        const isPasswordCorrect = bcrypt.compareSync(password, user.password);

        if (!isPasswordCorrect) {
            return res.status(400).json("password is incorrect");
        }
        user.lastLogin = new Date();
        await user.save();
        const token = jwt.sign({ id: user._id }, process.env.JWT, {
            expiresIn: '1d'
        });


        return res.cookie("access", token, {
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
            httpOnly: true
        }).status(200).json("User LoggedIn Successfull");
    } catch (e) {
        res.status(500).json("internal server error");
    }

}

export const getUser = async (req, res, next) => {
    try {
        const user = await userModel.findById(req.user.id).select('-password');
        return res.status(200).json(user);
    } catch (error) {
        res.status(500).json("Internal server error");
    }
}