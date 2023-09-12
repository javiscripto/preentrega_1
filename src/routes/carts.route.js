const express= require("express");
const route=express.Router();


const carts=[];
let Id=0;


//crear nuevo carrito
route.post("/api/carts",(req,res)=>{
    
    const cart={id:Id++,products:[]}
    carts.push(cart);
    res.json({message:`se ha creado nuevo carrito id`})
})


//get all carts
route.get("/api/carts",(req,res)=>{
    res.json(carts)
})

//get cart by id
route.get("/api/carts/:cid", (req, res)=>{
    const idCart= parseInt(req.params.cid) ;
    const cart = carts.find((c)=>c.id===idCart);
    cart?res.json(cart.products):res.status(400).json({message:`not found`})

})

//add product cart
route.post("/api/carts/:cid/product/:pid", (req, res)=>{
    const idCart= parseInt(req.params.cid) ;
    const idProd=parseInt(req.params.pid);

    const indexCart= carts.indexOf(carts.find((c)=>c.id===idCart))
    if(carts[indexCart].products.includes(idProd)){
        carts[indexCart].products.quantity+=1;
        res.json({message:`se ha agregado el nuevo producto`})
    }else{
        const product={id:idProd,quantity:1};
        carts[indexCart].products.push(product)
        res.json({message:`se agregado otro producto`});
    };
   

})

module.exports=route;