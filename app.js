var bodyParser = require("body-parser"), 
methodOverride = require("method-override"),
mongoose       = require("mongoose"),
express        = require("express"),
app            = express();

// конфигурация приложения
mongoose.connect("mongodb+srv://Elman:<password>@test.deg0b.mongodb.net/<dbname>?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true});
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(methodOverride("_method"));

//конфинурация модели mongoose
var blogsSchema = new mongoose.Schema({
	title: String,
	image: String,
	body : String,
	count : Number,
	price : Number
	
});

var Blog = mongoose.model("Blog", blogsSchema);


//Routes
app.get("/", function (req, res){
	res.redirect("/blogs");
});



app.get("/blogs", function (req, res){
	Blog.find({}, function (err, blogs){
		if (err){
			console.log(err);
		} else {
			res.render("index", {blogs: blogs});
		}
	});
	
});


app.get("/blogs/new",function(req, res){
     res.render("new");
});

app.post("/blogs", function(req , res){
     Blog.create(req.body.blog, function (err , newBlog){
       if(err){
       	res.render("new");
       } else {
       	res.redirect("/blogs");
       }
     });
});



app.get("/blogs/:id", function (req , res){
       Blog.findById(req.params.id, function(err , foundBlog){
           if (err){
           	res.redirect("/blogs");
           }  else {
           	   res.render("show", {blog: foundBlog});
           }
       });
});

app.get("/blogs/:id/sale", function(req , res){

      res.render("sale");
});

app.delete("/blogs/:id", function(req, res){
   Blog.findByIdAndDelete(req.params.id, req.body.blog, function(err, blog){
       if(err){
           res.redirect("/blogs");
       } else {
          
           res.redirect("/blogs");
       }
   }); 
});


var port = process.env.PORT || 3000;
app.listen(port, function () {
console.log("Server Has Started!");
});


