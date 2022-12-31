import {PrismaClient} from "@prisma/client";
const prisma = new PrismaClient();

import jwt from "jsonwebtoken";
const secret = process.env.SECRET;

export const login = async (req, res) => {
    const {email, password} = req.body;
    const admin = await prisma.admin.findUnique({
        where: {
            email: email,
        },
    });
    if (admin) {
        if (admin.password === password) {
            const token = jwt.sign({email: admin.email,username: admin.username}, secret, {
                expiresIn: 86400,
            });
            res.status(200).json(token);
            console.log('Sent token...');
        } else {
            res.json(null);
            console.log('Wrong password...');
        }
    } else {
        res.json(null);
        console.log('Admin not found...');
    }
}

export const auth = async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
        return res.status(401).json({auth: false, message: "No token provided."});
    }
    jwt.verify(token, secret, (err, decoded) => {
        if (err) {
            return res.status(500).json({auth: false, message: "Failed to authenticate token."});
        }
        res.status(200).json(decoded);
        console.log('Sent decoded token...');
    });
}
