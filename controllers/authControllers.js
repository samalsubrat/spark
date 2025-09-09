import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../lib/db"

const generateToken = (user) => {
  return jwt.sign(
    { userId: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "30d" }
  );
};

const signup = () => {
    try {
        const { email, password } = req.body;


    }catch(error){
        res.status(404).json({message: "Internal Server Error!"})
    }
}

const signin = () => {
    try {
        const { email, password, role} = req.body;

    }catch(error){
        res.status(404).json({message: "Internal Server Error!"})
    }
}