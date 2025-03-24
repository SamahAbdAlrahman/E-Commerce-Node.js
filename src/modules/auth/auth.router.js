import { Router } from 'express';
import userModel from '../../../DB/models/user.model.js';
import validation from '../../middleware/validation.js';
import {registerSchema,loginSchema} from './auth.vaildation.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
const router = Router();

router.post('/reg', validation(registerSchema),async (req, res)=>{

    try{ 
    const { email, password, name, age } = req.body;
    const bcryptPass = await bcrypt.hash(password, 8);

    const user = await userModel.create({
        userName: name,
        email,
        password:bcryptPass,
        age,
      });


      return res.status(201).json({ message: "success", user });

    } 
    catch (error) {
        console.error("Error creating user:", error);
        return res.status(500).json({ message: "Failed to register user", error });
      }

});

router.post('/login', validation(loginSchema),async(req,res)=>{
    try{ 
    const {email,password}=req.body;
    const userFinded = await userModel.findOne({email});
    if (!userFinded){
        return res.status(400).json({msg:"invalid email"});
    }
    const pass =  await bcrypt.compare(password,userFinded.password);
    if(!pass){
        return res.status(400).json({msg:"invalid password"});
    }
       // jwt token
       const token = jwt.sign(
        {
          id:userFinded.id,
          userName: userFinded.userName,
          email: userFinded.email,
          age:userFinded.age
             },
        process.env.SECRET_KEY,

      );
    return res.status(200).json({msg:"login done",token});
}catch(err){
    res.status(500).json({msg:`server error ${err}`})
}
});

export default router;
