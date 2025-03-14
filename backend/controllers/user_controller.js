import bcrypt from "bcryptjs"
import { User } from "../models/user_models.js"
import jwt from "jsonwebtoken"
import getDatauli from "../utils/dataurl.js";
export const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(401).json({
                message: "something is missing please check..!",
                success: false,
            });
        }
        const user = await User.findOne({ email });
        if (user) {
            return res.status(401).json({
                message: "this id have already account",
                success: false,
            });
        }
        const hashedpassword = await bcrypt.hash(password, 10)
        await user.create({
            username,
            email,
            password: hashedpassword,
        });
        return res.status(201).json({
            message: "account created succesfuly ",
            success: true,
        });

    } catch (error) {
        console.log("error at registor controller", error)
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(401).json({
                message: "something is missing please check..!",
                success: false,
            });
        }

        let user = await User.findOne({ email })
        if (!user) {
            return res.status(401).json({
                message: "incorrect email or password",
                success: false,
            })
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (isPasswordMatch) {
            return res.status(401).json({
                message: "incorrect email or password",
                success: false,
            })
        }
        user = {
            _id: user._id,
            username: user.username,
            email: user.email,
            profilePic: user.profilePic,
            bio: user.bio,
            follower: user.follower,
            following: user.following,
            posts: user.posts
        }

        const token = await jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: '1d' })
        return res.cookie('token', token, { httpOnly: true, sameSite: 'strict', maxAge: 1 * 24 * 60 * 1000 }).json({
            message: `welcome back ${username}`,
            success: true,
            user
        })

    }
    catch (error) {
        console.log(error);
    }
}

export const logout = async (req, res) => {
    try {
        return res.cookie("token" | "", { maxAge: 0 }).json({
            message: " logout succesfully",
            success: true,

        })
    } catch (error) {
        console.log(error);
    }
}

export const getProfile = async (req, res) => {
    try {
        const userId = req.pasams.id;
        let user = await User.findById(userId);
        return res.status(200).json({
            user,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}


export const editProfile = async (req, res) => {
    try {
        const userId = req.id;
        const { bio } = req.body;
        const profilePic = req.file;

        if (profilePic) {
            const fileuri = getDatauli(profilePic);

        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                message: "user not found",
                success: false
            })
        }

        if (bio) {
            user.bio = bio
        }

        // need to work on image saving proccess to save in the db


        await user.save();

        return res.status(200).json({
            message:"proffile updated",
            success: true,
            user
        })
    } catch (error) {
        console.log(error);
    }
}