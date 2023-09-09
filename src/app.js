const express= require("express");
const path=require("path");
const app= express();
const PORT=8080;

//import routes
const products=require("./routes/products.route");
const carts=require("./routes/carts.route");

//middlewares

app.use(express.json());
app.use(express.urlencoded({extended:true}));



//set public folder
app.use(express.static(path.join(__dirname,`public`)));

//routes
app.use("/",products)
app.use("/",carts)




app.get("/",(req,resp)=>{
    resp.sendFile(path.join(__dirname,`public`,`index.html`))
})

app.listen(PORT,()=>{
    console.log(`sirviendo en el puero ${PORT}`)
})