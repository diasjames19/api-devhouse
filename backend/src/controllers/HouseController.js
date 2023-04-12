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
            const schema = Yup.object.shape({
                description:Yup.string().required(),
                price:Yup.number().required(),
                location:Yup.string().required(),
                status:Yup.boolean.required(),
            });
            if(!(await schema.isValid(req.body))){
                return res.status(400).json({error: 'Falha na validaçõa'})
            }
            const status = true;
            const {filename} = req.file;
            const {description,price,location} = req.body;
            const {user_id} = req.headers;
            const {house_id} = req.params;
            const house = await House.update({
                user:user_id,
                thumbnail:filename,
                description,
                price,
                location,
                status,
            });
            return res.json(house);
        }
        
    }
export default new HouseController();