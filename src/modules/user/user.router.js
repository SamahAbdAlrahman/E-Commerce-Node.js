import { auth_user } from '../../middleware/auth.js';
import { Router } from 'express';
import userModel from '../../../DB/models/user.model.js';
const router = Router();

router.get('/users',
    // auth_user(),
   async (req,res)=>{
    const users = await userModel.find(
        // {age: { $gt: 25 } }
    );
    return res.status(200).json({ message: "success" , users});
})
router.get('/user/:id', 
     async (req, res) => {
        const userId = req.params.id; 
        // const user = await userModel.findById(userId);  
        const user = await userModel.findOne({ _id: userId });
        return res.status(200).json({ message: "Success", user });
   
});
router.get('/:id', async (req, res) => {
   
        const id = req.params.id;
        const name  = req.body.name;

        const user = await userModel.updateOne({_id:id},{userName:name},{ new: true });
    if (user.matchedCount === 0) {   //
        return res.status(404).json({ message: "User not found" });
    }

    if (user.modifiedCount === 0) {  
        return res.status(400).json({ message: "No changes made" });
    }
        return res.status(200).json({ message: "User updated successfully" ,user});

  
});
export default router;