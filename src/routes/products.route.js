const express=require("express");
const route=express.Router();


const fs= require("fs/promises");

const writeProducts = async (prod) => {
    try {

        let currentProducts = JSON.parse(await fs.readFile("./products.json","utf-8"));
        let localProducts = [...currentProducts, {...prod,id:currentProducts.length++}];
        await fs.writeFile("./products.json", JSON.stringify(localProducts));
        return "success";
    } catch (error) {
        throw error; 
    }
};




let products=[];

let Id=0;

//all products
route.get("/api/products", async (req, res) =>{
    let productsJson;
    try {
        productsJson = JSON.parse(await fs.readFile("./products.json", "utf-8"));
        res.send(productsJson);
    } catch (error) {
        console.log("error de lectura");
        res.status(500).send("Error de lectura del archivo");
    }
    
});

//product by id
route.get("/api/products/:pid",(requ,res)=>{
    const id = Number(requ.params.pid);
    let product= products.find((prod)=>prod.id==id);
    product?res.json({product}):res.status(400).send(`product not found`)
})

//add new product
route.post("/products", (req,res)=>{
    const newProduct=req.body;
    products.push({...newProduct,id:Id++});
    writeProducts(newProduct)
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