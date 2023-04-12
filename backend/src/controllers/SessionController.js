// metodos: index, show, update, store, destroy

/*

index (GET): listagem de elementos/entidades

store(POST): criar elementos


show(GET): listagem de um elemento

update(PUT): alterar de elementos

destroy(DELETE):Excluir elementos


*/
import User from '../models/User';
import * as Yup from 'yup';

class SessionController{
    async storeSignUp(req,res){
        const schema = Yup.object().shape({
            name:Yup.string().min(2).required(),
            email:Yup.string().email().required(),
            pass:Yup.string().min(6).required()
        });
        if(!(await schema.isValid(req.body))){
            return res.status(400).json({error: 'Falha na validaçõa'})
        }
        let {name,email,pass} = req.body;
        const user =  await User.create({
            name,
            email,
            pass,
        });
        
        return res.json(user);
    }

    async store(req, res){
        const {email} = req.body;
        let checkUser = await User.findOne({email});
        if(!checkUser){
            checkUser = await User.create({email});

        }
        return res.json(checkUser);
    }
}

export default new SessionController();