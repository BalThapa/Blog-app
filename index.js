import bodyParser from "body-parser";
import express from "express";


const app = express();
const port = 3000;

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res)=> {
    res.render("index.ejs", {currentPath:req.path}); // passing the current path from your server to the 
                                                        //EJS template instead of trying 
                                                        //to access window.location.pathname directly.
});
app.get("/create", (req, res)=> {
    res.render("create.ejs",{currentPath:req.path});
});

app.post("/submit", (req,res) => {
    
    res.render("index.ejs", {
      
    })
   
})

app.listen(port, () =>{
    console.log(`Listening on port ${port}`);
})