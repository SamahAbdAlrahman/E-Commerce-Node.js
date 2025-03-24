import connectDB from '../DB/connection.js'

import authRouter from './modules/auth/auth.router.js';  
import userRouter from './modules/user/user.router.js';  


const initApp = (app, express) => {
    connectDB();

  app.use('/auth', authRouter); 
  app.use('/user', userRouter); 


};
export default initApp;