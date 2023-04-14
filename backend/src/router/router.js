import {Router} from 'express';
import SessionController from '../controllers/SessionController';
import multer from 'multer';
import HouseController from '../controllers/HouseController';
import uploadconfing from '../config/upload';
import DashBoardController from '../controllers/DashBoardController';
import ReserveController from '../controllers/ReserveController';


const routes = new Router();
const upload = multer(uploadconfing);

routes.post('/user/signup', SessionController.storeSignUp);  // criar conta  
//routes.post('/user/signin', SessionController.storeSignin); // logar 
routes.post('/sessions',SessionController.store);

routes.get('/houses', HouseController.index);
routes.post('/houses', upload.single('thumbnail'),HouseController.store);
routes.put('/houses/:house_id',upload.single('thumbnail'), HouseController.update);
routes.delete('/houses/:house_id', HouseController.destroy);

routes.get('/dashboard', DashBoardController.show);


routes.post('/houses/:house_id/reserve', ReserveController.store);
routes.get('/reserves',ReserveController.index);
routes.delete('/reserves/cancel',ReserveController.destroy);

export default routes;
