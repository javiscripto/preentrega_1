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
route.post("/api/carts/:cid/product/:pid", (req, res) => {
    const idCart = parseInt(req.params.cid);
    const idProd = parseInt(req.params.pid);

    const indexCart = carts.findIndex((c) => c.id === idCart);

    if (indexCart === -1) {
        res.status(400).json({ message: "Carrito no encontrado" });
        return;
    }

    const cart = carts[indexCart];
    const existingProduct = cart.products.find((p) => p.id === idProd);

    if (existingProduct) {
        existingProduct.quantity += 1;
        res.json({ message: "Se ha agregado una cantidad adicional del producto" });
    } else {
        const product = { id: idProd, quantity: 1 };
        cart.products.push(product);
        res.json({ message: "Se ha agregado un nuevo producto al carrito" });
    }
});


module.exports=route;