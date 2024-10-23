import bodyParser from "body-parser";
import express from "express";


const app = express();
const port = 3000;

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended: true}));

const blogPosts = []; //Array for dtoring blogs

app.get("/", (req, res)=> {
    res.render("index.ejs", {
        currentPath:req.path,       // passing the current path from your server to the 
                                        //EJS template instead of trying 
                                             //to access window.location.pathname directly.
        posts: blogPosts
    });                                             
});

app.get("/create", (req, res)=> {
    res.render("create.ejs" ,{currentPath:req.path});
});

app.post("/submit", (req,res) => {
    const { userName, userEmail, title, content, createdOn } = req.body;
    if (!userName || !userEmail || !title || !content || !createdOn ) {
        return res.redirect ("/create");
    }
    blogPosts.push ({
        userName,
        userEmail,
        title,
        content, 
        createdOn  
    })
    return res.redirect ("/");
    res.render("index.ejs", {
        currentPath:req.path,
        posts: blogPosts,
        
    })
    
})

app.listen(port, () =>{
    console.log(`Listening on port ${port}`);
})