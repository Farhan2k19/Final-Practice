const express=require('express');
const path=require('path');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const cors=require('cors');
const port=process.env.PORT || 3000;
const app=express();
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.json());


mongoose
  .connect("mongodb://127.0.0.1:27017/final-prac", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });


const userSchema=new mongoose.Schema({
    name:String,
    email:String,
    password:String
});

const User=mongoose.model('User',userSchema);



app.get('/',(req,res)=>{
    res.render(path.join(__dirname,'pages','home.ejs'));
}
);

app.get("/Show", async (req, res) => {
    const users = await User.find();
    res.render(path.join(__dirname, "pages", "Show.ejs"),{ users}); 

  });

app.get('/addUsers',(req,res)=>{
    res.render(path.join(__dirname,'pages','addUsers.ejs'));
}
);



app.post("/addUsers", async (req, res) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        });
    await user.save();
    res.redirect("/Show");
    });
 

    app.get('/delete',(req,res)=>{
      res.render(path.join(__dirname,'pages','delete.ejs'));
  }
  );
  
    app.post('/delete', async (req, res) => {
      const id = req.body.name;
      await User.deleteOne({name:id});
      res.redirect("/Show");
      });

    app.get('/update',(req,res)=>{
      res.render(path.join(__dirname,'pages','update.ejs'));
  }
  );

  
    


    app.listen(5000, () => console.log('Server running on port 5000'));