const express = require('express');



const server = express();
server.use(express.json());

const cursos = ['NODEJS','JAVASCRPIT','PHP','PYTHON']
server.get('/getcursosporquery',(req,res)=>{
    const nome =  req.query.name;
   return res.json({curso:`Apredendo ${nome}`}) 
});
server.get('/getcursosporparamentro/:nome',(req,res)=>{
    const {nome} =  req.params;
    return res.json({curso:`Apredendo ${nome}`}) 
});
server.get('/getcursosporparamentrousandoindexdoarray/:index',(req, res)=>{
    const {index}=req.params;
   return  res.json(cursos[index]);
});

server.post('/postcursosporbody',(req, res)=>{
    const nome = req.body.nome;
    cursos.push(nome);
    return res.json(cursos);
});
server.put('/putcursos/:index',(req,res)=>{
    const {index} = req.params;
    const {nome}= req.body;

    cursos[index] = nome;
    return res.json(cursos)
});

server.delete('deletecursus/:index',(req,res)=>{
    const {index}=req.params;
    cursos.slice(index,1);

    return res.json({message:'Curso deletado!'});
});

server.listen(4001);