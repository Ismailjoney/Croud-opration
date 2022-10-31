const  express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion,  ObjectId } = require('mongodb');
const app  = express();
const port = process.env.PORT || 5000;

//userdb2
//3xm81rYogJKuISr5

//middleware
app.use(cors());
//post rq korle data pawar jorno
app.use(express.json());


const uri = "mongodb+srv://userdb2:3xm81rYogJKuISr5@cluster0.i8hxp3j.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
 
 async function run(){
    try{
        const userColection = client.db("mongoUserTwo").collection("users");

        // get data server and send clint side
        app.get('/users', async(req,res) => {
            const query = {};
            const coursor = userColection.find(query);
            const users = await  coursor.toArray();
            res.send(users)
        
        })
        

        //get data clint side and set server 
        app.post('/users', async(req,res) =>{
            const users = req.body;
            //console.log(users)
            const resualt = await userColection.insertOne(users)
            res.send(resualt)
        })

        //get the specific id clint side and delete the specific id server 
        app.delete('/users/:id', async(req,res) => {
            const userid = req.params.id;
            //console.log(id);
            const query = {_id : ObjectId(userid)}
            const resualt = await userColection.deleteOne(query);
            console.log(resualt);
            res.send(resualt)
        })
         //update user :
         app.get(`/users/:id`, async (req,res) => {
            const id = req.params.id;
            const query = {_id: ObjectId(id)};
            const user = await userColection.findOne(query);
            console.log(user)
            res.send(user)
        })

        //update user to database step-2
        app.put('/users/:id', async(req,res) => {
            const id = req.params.id;
            const filter = {_id: ObjectId(id)}
            const  user = req.body;
            const option  ={upsert: true}
            const updateUser  = {
                $set: {
                    name: user.name,
                    address : user.address,
                    email: user.email
                }
               
            }
            const resualt = await userColection.updateOne(filter,updateUser,option)
            res.send(resualt)
        })

       

    }
    finally{

    }

 }

 run().catch(error => console.log(error));









 //check the port and runing in browser(allways runthe browser)
 app.get('/', (req,res) => {
    res.send(`checking the port runing the browser`)
 })

 // check the nodemon console 
app.listen(port, () => {
    console.log(`listening the port ${port}`)
})



//server side a npm i express cors mongodb install kora lage