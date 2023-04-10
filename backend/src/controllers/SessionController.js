// metodos: index, show, update, store, destroy

/*

index (GET): listagem de elementos/entidades

store(POST): criar elementos


show(GET): listagem de um elemento

update(PUT): alterar de elementos

destroy(DELETE):Excluir elementos


*/
import User from '../models/User';

class SessionController{
    async store(req, res){
        const {email} = req.body;
        let checkUser = await User.findOne({email});
        if(!checkUser){
            checkUser = await User.create({email});

        }
        return res.json({msg:'Email cadastrado com sucesso!',checkUser})
    }
}

export default new SessionController();