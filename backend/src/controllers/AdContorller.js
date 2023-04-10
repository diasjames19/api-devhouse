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
import User from '../models/House';

class AdController{
    async store(req, res){
        const {dthumbnail,escription,price,location,status} = req.body;
        let checkUser = await User.findOne({email});
        if(!checkUser){
            checkUser = await User.create({email});

        }
        return res.json({msg:'Anuncio Cadastrado!',checkUser})
    }
}

export default new AdController();