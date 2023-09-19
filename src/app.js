const express= require("express");
const path=require("path");
const app= express();
const PORT=8080;
const fs=require("fs/promises")



//set handlebars
const handlebars= require("express-handlebars");
app.engine("handlebars",handlebars.engine())

app.set("view engine", "handlebars");
app.set("views", path.join(__dirname,"views"))






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

//render views handlebars
app.get("/hbs",async(req,res)=>{
    let productsJson;
    try {
        productsJson=JSON.parse(await fs.readFile("./products.json","utf-8"));
        res.render("home",{ productsJson})
    } catch (error) {
        console.log("error de lectura")
    }
    
    
})

app.get("/realtimeproducts",(req, res)=>{
    res.render("realTimeProducts")
})



//render index html
app.get("/",(req,resp)=>{
    resp.sendFile(path.join(__dirname,`public`,`index.html`))
})

app.listen(PORT,()=>{
    console.log(`sirviendo en el puerto ${PORT}`);
    console.log(__dirname,`public`)
  
})
/////////////////////////////////////////////////////////
//set socket
const http = require("http");
const socketIo= require("socket.io");
const server=http.createServer(app);
const io=socketIo(server)


app.use('/socket.io', express.static(__dirname + '/node_modules/socket.io/client-dist'));


const sendProducts=async()=>{
    try {
        let sendProducts= JSON.parse(await fs.readFile("./products.json","utf-8"))
    return sendProducts;
    } catch (error) {
        console.error("error al leer archivo", error);
    }
    
}


io.on("connection",(socket)=>{
    console.log("cliente conectado");

    socket.emit("data", sendProducts() );

    socket.on("disconnect",()=>{
        console.log("cliente desconectado")
    })

})

