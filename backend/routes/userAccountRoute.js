import express from 'express';
import { UserAccount } from '../models/userAccountModel.js';
import { check, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config.js';


const router=express.Router();


//Registration
router.post('/',
    [
        check('username', 'Username is required').not().isEmpty(),
        check('password', 'Password should be at least 6 characters').isLength({ min: 6 }),
        check('email', 'Please provide a valid email').isEmail(),
        check('firstName', 'First name is required').not().isEmpty(),
        check('lastName', 'Last name is required').not().isEmpty(),
    ],
    async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try{
        const {
            username,
            email,
            password,
            firstName,
            lastName,
            jobTitle,
            company,
            location,
            phoneNumber,
            homeAddress,
            profilePic,
            profileBanner
        } = req.body;

        const existingUser = await UserAccount.findOne({
            $or: [{ email }, { username }],
        });
        if (existingUser) {
            return res.status(400).json({ message: 'Username or Email already exists' });
        }

        const newUserAccount = {
            username,
            password,
            email,
            firstName,
            lastName,
            jobTitle, 
            company,  
            location, 
            phoneNumber,
            homeAddress,
            profilePic, 
            profileBanner
        };

        const userAccount = await UserAccount.create(newUserAccount);

        const token = jwt.sign(
            { id: userAccount._id, username: userAccount.username },
            JWT_SECRET,
            { expiresIn: '1h' }
        );
    
        return res.status(201).json({ userAccount, token });
    }
    catch(error){
        console.log(error);
        res.status(500).send({message: error.message})
    }
})


export default router;