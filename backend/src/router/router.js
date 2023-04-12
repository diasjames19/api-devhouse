import {Router} from 'express';
import SessionController from '../controllers/SessionController';
import multer from 'multer';
import HouseController from '../controllers/HouseController';
import uploadconfing from '../config/upload';


const routes = new Router();
const upload = multer(uploadconfing);

routes.post('/user/signup', SessionController.storeSignUp);  // criar conta  
//routes.post('/user/signin', SessionController.storeSignin); // logar 
routes.post('/sessions',SessionController.store);

routes.get('/houses', HouseController.index);
routes.post('/houses', upload.single('thumbnail'),HouseController.store);
routes.put('/houses/:house_id',upload.single('thumbnail'), HouseController.update)
export default routes;
