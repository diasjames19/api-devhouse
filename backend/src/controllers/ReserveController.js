import House from '../models/House';
import User from '../models/User';
import mongoose from 'mongoose';
import Reserve from '../models/Reserve';


class ReserveController{


        async index (req,res){
            const {user_id} = req.headers;
            const reservas =  await Reserve.find({user: user_id}).populate('house');
            

            return res.json(reservas);
        
        }

        async store (req,res){
            const {user_id} = req.headers;
            const { house_id} = req.params;
            const {date} = req.body;
            let house ={}
            if(mongoose.Types.ObjectId.isValid(house_id)){
                house = await House.findById(house_id);
                if(!house){
                    return res.status(400).json({error:'Essa casa não existe!'});
                }
            }else{
                return res.status(406).json({error:'Codigo da casa não existe'});
            }
          
            if(house.status != true){
                return res.status(400).json({error:'Indisponivel'});
            }
            const user = await User.findById(user_id);
            if(String(user._id) === String(house.user)){
                    return res.status(401).json({error:'Reseverva não permitida'});
            }
            const reserve = await Reserve.create({
                user:user_id,
                house:house_id,
                date,
            });
            await reserve.populate('house');
            await reserve.populate('User');
            return res.json(reserve);
        
        }


        async destroy(req,res){
           const {reserve_id} = req.body;
           if(mongoose.Types.ObjectId.isValid(reserve_id)){
            const reserva = await House.findById(reserve_id);
            if(!reserva){
                return res.status(400).json({error:'Reservar não existe'})
            }
           }else{
            return res.status(406).json({error:'Codigo da reservar inavalido'})
           }
           await Reserve.findOneAndDelete({_id:reserve_id});
           return res.send();
        }
}
export default new ReserveController();