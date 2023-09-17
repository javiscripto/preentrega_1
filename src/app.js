const express= require("express");
const path=require("path");
const app= express();
const PORT=8080;

const http=require("http").createServer(app)
const io= require("socket.io")(http)


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
app.get("/hbs",(req,res)=>{
    res.render("home")
})

app.get("/realtimeproducts",(req, res)=>{
    res.render("realTimeProducts")
})



//render index html
app.get("/",(req,resp)=>{
    resp.sendFile(path.join(__dirname,`public`,`index.html`))
})

app.listen(PORT,()=>{
    console.log(`sirviendo en el puerto ${PORT}`)
})

//set socket







io.on("connection",(Socket)=>{
    console.log(`cliente conectado`);
    //necesito un evento personalizado
    Socket.on("mensaje",(data)=>{
        console.log(`mensaje recibido`,data);
        io.emit("mensaje",data)
    })

    //escuchar un evento de desconeccion
    Socket.on("disconnect",()=>{
        console.log("cliente desconectado")
    })
})