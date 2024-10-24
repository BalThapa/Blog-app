import bodyParser from "body-parser";
import express from "express";
import methodOverride from "method-override";//since only GET and POST is possible in HTML we need this node library


const app = express();
const port = 3000;

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended: true}));

app.use(methodOverride((req,res) => {
    if(req.body && typeof req.body === 'object' && '_method' in req.body){
        //look in urlencoded POST bodies and delete it
        let method = req.body._method
        delete req.body._method
        return method
    }
}));

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
    const id = blogPosts.length + 1
    const {userName, userEmail, title, content, createdOn } = req.body;
    if (!userName || !userEmail || !title || !content || !createdOn ) {
        return res.redirect ("/create");
    }
    blogPosts.push ({
        id,
        userName,
        userEmail,
        title,
        content, 
        createdOn  
    })
    res.redirect ("/");
})

app.delete('/edit-delete', (req,res)=> {
    const id = parseInt(req.body.id);
    const filteredPosts = blogPosts.filter(blogPost => blogPost.id !== id);
    blogPosts.length = 0;
    blogPosts.push(...filteredPosts);
    res.redirect('/')
    
})

app.listen(port, () =>{
    console.log(`Listening on port ${port}`);
})