const writeProducts = async (prod) => {
    try {
        let currentProducts = JSON.parse(await fs.readFile());
        let localProducts = [...currentProducts, prod];
        await fs.writeFile(localpath, JSON.stringify(localProducts));
        return "success";
    } catch (error) {
        throw error; // Manejo de errores
    }
};

const prodToJson= async()=>{

    //products=JSON.stringify(  await fs.readFile(localpath, "utf-8") )
    await fs.writeFile(localpath, JSON.stringify(products))
}