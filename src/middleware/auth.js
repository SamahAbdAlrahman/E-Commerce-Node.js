
import jwt from 'jsonwebtoken';
// const auth_admin=()=>{
//     return (req,res,next) => {
//   const {token} = req.headers;
      
//       if (!token) {
//         return res.status(401).json({ message: "Token is missing" });
//       }
           
//       const decoded = jwt.verify(token, process.env.SECRET_KEY);

//       console.log("Decoded token:", decoded); //  محتويات التوكين
  
//       if (decoded.role !== 'admin') {
//         return res.status(403).json({ message: "Unauthorized" });
//       }
//       req.id = decoded.id;
//       next();
// }
//     }

    const auth_user=()=>{
        return (req,res,next) => {
            try{ 
      const {token} = req.headers;
          
      if (!token) {
        return res.status(401).json({ message: "Token is missing" });
      }
    
 
      
      const decoded = jwt.verify(token, process.env.SECRET_KEY);// فك تشفير التوكن

     
      req.user = decoded; // اضافة بيانات التوكين في الريكويست

      if (!req.user || !req.user.id) {
        return res.status(400).json({ message: "User not found or invalid token." });
      }

      next();
    } catch (error) {
      console.error("Error in auth_user:", error);
      return res.status(400).json({ message: "Invalid token." });
    }
  };
};
  
        
export {auth_user} ;