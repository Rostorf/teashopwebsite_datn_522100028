import User from '../models/userModel.js';
import asyncHandler from '../middlewares/asyncHandler.js';
import bcrypt from 'bcryptjs';

const createUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    
    if (!username || !email || !password) {
        throw new Error ('Vui lòng nhập đầy đủ thông tin.');
    }

    const userExists = await User.findOne({ email });
    if (userExists) res.status(400).send("Email đã được sử dụng");

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({username, email, password: hashedPassword})

    res.status(201).json({
        _id: newUser._id, 
        username: newUser.username, 
        email: newUser.email,
        isAdmin: newUser.isAdmin,     
    })

    try {
        await newUser.save()
    } catch (error) {
        res.status(400)
        throw new Error("Thông tin không hợp lệ")
    }
});

export { createUser };