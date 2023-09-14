const express=require("express");
const route=express.Router();


//const fs= require("fs/promises");

const localpath="./products.json"




let products=[];

let Id=0;









//all products
route.get("/api/products",(requ,res)=>{
    
    res.send(products)
});

//product by id
route.get("/api/products/:pid",(requ,res)=>{
    const id = Number(requ.params.pid);
    let product= products.find((prod)=>prod.id==id);
    product?res.json({product}):res.status(400).send(`product not found`)
})

//add new product
route.post("/api/products", (req,res)=>{
    const newProduct=req.body;
    products.push({...newProduct,id:Id++});

    res.json({message:` ${newProduct.title} added to products list`})
});

//update product
route.put("/api/products/:pid", (req, res) => {
    const productId = parseInt(req.params.pid);
    const updateFields = req.body;
    let productToUpdate = products.find((prod) => prod.id === productId);
    if (!productToUpdate) {
        return res.status(404).json({ message: `Product with ID ${productId} not found` });
    }

    // Actualiza los campos del producto
    Object.assign(productToUpdate, updateFields);

    res.json({ message: `Product updated` });
});


// delete product by
route.delete("/api/products/:pid", async(requ,res)=>{
    const id= parseInt(requ.params.pid);
    let prodDelete=products.find((prod)=>prod.id===id)
   
    if (!prodDelete) {
        return res.status(404).json({ message: `Product with ID ${id} not found` });
    }
    let index= products.indexOf(prodDelete);
    products.splice(index,1);
    res.json({message:`se ha eliminado el producto`})
})
module.exports= route;