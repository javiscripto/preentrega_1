const express=require("express");
const route=express.Router();




let products=[
    // {
    //     "title": "manzana",
    //     "description": "manzana dulce",
    //     "code": "a01",
    //     "price": "1565",
    //     "status": "true",
    //     "stock": "26541",
    //     "cat": "frutas",
    //     "id": 0
    // },
    // {
    //     "title": "pera",
    //     "description": "pera de agua",
    //     "code": "a02",
    //     "price": "1565",
    //     "status": "true",
    //     "stock": "98798",
    //     "cat": "frutas",
    //     "id": 1
    // },  {
    //     "title": "naranja",
    //     "description": "naranja norteña",
    //     "code": "a02",
    //     "price": "156",
    //     "status": "true",
    //     "stock": "261",
    //     "cat": "citricas",
    //     "id": 2
    // }
];
//contiene productos de prueba


let Id=0;
//all products
route.get("/api/products",(requ,res)=>{
    res.json(products)
});

//product by id
route.get("/api/products/:pid",(requ,res)=>{
    const id = Number(requ.params.pid);
    let product= products.find((prod)=>prod.id==id);
    product?res.json({product}):res.status(400).send(`product not found`)
})

//add new product
route.post("/api/products",(req,res)=>{
    const newProduct=req.body;
    products.push({...newProduct,id:Id++});
    res.json({message:` ${newProduct.title} added to products list`})
});


//update product
route.put("/api/porducts/:pid", (requ,res)=>{
    const productId= parseInt(requ.params.pid) ; 
    const updateFields= requ.body
    let index= products.indexOf(products.find((prod)=>prod.id===productId));
    if (index!=-1)res.json({message:`producto actualizado`})


});


// delete product by
route.delete("/api/products/:pid", (requ,res)=>{
    const id= parseInt(requ.params.pid);
    let index= products.indexOf(products.find((prod)=>prod.id===id));
    products.splice(index,1)
    res.json({message:`se ha eliminado el producto`})
})
module.exports= route;