const express=require("express");
const route=express.Router();

const products=[];

let Id=0;

route.get("/products",(requ,res)=>{
    res.json(products)
});


route.post("/products",(req,res)=>{
    const newProduct=req.body;
    products.push({...newProduct,id:Id++})
    res.json({message:"sussessful"})
})

module.exports= route;