// metodos: index, show, update, store, destroy

/*

index (GET): listagem de elementos/entidades

store(POST): criar elementos


show(GET): listagem de um elemento

update(PUT): alterar de elementos

destroy(DELETE):Excluir elementos

 thumbnail
    description
    price
    location
    status
    user:{
        type:Schema.Types.ObjectId,
        ref:'User'
    

*/
import mongoose from 'mongoose';
import House from '../models/House';
import User from '../models/User';
import * as Yup from 'yup';

class HouseController{
    async index(req, res){
        const {status} = req.query;
        const houses = await House.find({status});
        return res.json(houses);
    }
   

    async store(req, res){
        const schema = Yup.object().shape({
            description:Yup.string().required(),
            price:Yup.number().required(),
            location:Yup.string().required(),
        });
        if(!(await schema.isValid(req.body))){
            return res.status(400).json({error: 'Falha na validaçõa'})
        }
        const status = true;
        const {filename} = req.file;
        const {description,price,location} = req.body;
        const {user_id} = req.headers;
        const house = await House.create({
            user:user_id,
            thumbnail:filename,
            description,
            price,
            location,
            status,
        });
        return res.json(house);

        }
        async update(req,res){
            const schema = Yup.object().shape({
                description:Yup.string().required(),
                price:Yup.number().required(),
                location:Yup.string().required(),
                status:Yup.boolean().required(),
            });
            
            const {filename} = req.file;
            const {description,price,location, status} = req.body;
            const {user_id} = req.headers;
            const {house_id} = req.params;
            let checkUser = {};
            if(mongoose.Types.ObjectId.isValid(user_id)){
                checkUser = await User.findById(user_id);
                if(!checkUser){
                    return res.status(400).json({error:'Esse usuario não existe!'});
                }
            }
            if(!(await schema.isValid(req.body))){
                return res.status(400).json({error: 'Falha na validaçõa'})
            }
            
            const user = await User.findById(user_id);
            const house = await House.findById(house_id);
            if(String(user._id)!=String(house.user)){
        
                return res.status(401).json({error:'Não autorizado'});
            }
         
            await House.findOneAndUpdate({ _id:house_id },{
                user:user_id,
                thumbnail:filename,
                description,
                price,
                location,
                status,
                
            });
            
            return res.send({msg:'Atualizado com Sucesso'});
        }
        
        async destroy(req,res){
            const {house_id} = req.params;
            const {user_id} = req.headers;
            const user = await User.findById(user_id);
            const house = await House.findById(house_id);
            if(String(user._id)!=String(house.user)){
                console.log(user_id);
                return res.status(401).json({error:'Não autorizado'});
            }
         
            await House.findOneAndDelete({_id:house_id});
            return res.json({msg:'Excluido com Sucesso!'})
        }
    }
export default new HouseController();