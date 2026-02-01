const express =require('express')
const app= express()
const port =process.env.PORT || 3000
const cors=require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

// middleware
app.use(cors());
app.use(express.json());

// user name : mongo-server
// password : kayFoE4DIlTQd7gF
const uri = "mongodb+srv://mongo-server:kayFoE4DIlTQd7gF@cluster0.due0kmg.mongodb.net/?appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

app.get('/',(req,res) => {
    res.send('DATA IS COMING SOON........')
})

async function run() {
    try{
        await client.connect();
        // user database and user collection is here
        const myDB=client.db('myDB')
        const myCollection=myDB.collection('users')

// 2. get the data which you store in mongo database
app.get('/users',async(req,res) => {
    const cursor=myCollection.find();
    const result=await cursor.toArray();
    res.send(result);
})
// 4.find data using id
app.get('/users/:id',async(req,res) => {
    const id=req.params.id;
    const query={_id:new ObjectId(id)}
    const result=await myCollection.findOne(query)
    res.send(result)

})
// 5. Update user Data
app.patch('/users/:id',async(req,res) =>{
    const id=req.params.id;
    const UpdateUser=req.body;
    const query ={ _id:new ObjectId(id)}
    const update ={
        $set :{
            name:UpdateUser.name,
            email:UpdateUser.email,
        }
    }
    // # when you want to more option to update
    const options= {} 
    const result= await myCollection.updateOne(query,update,options)
    res.send(resultz)
})
// 3. delete the data from database 
app.delete('/users/:id', async(req,res) => {
    const id=req.params.id;
    const query= {_id:new ObjectId(id) }
    const result=await myCollection.deleteOne(query)
    res.send(result)
})

//1. app database related api's here
app.post('/users', async(req,res) =>{
 const newUser=req.body;
 const result=await myCollection.insertOne(newUser);
 res.send(result);
})
// server is work when everything ready
app.listen(port, () =>{
    console.log(`port is listening to ${port}`)
})

        // 
        await client.db("admin").command({ping:1});
        console.log('pinged yout deployment.You successfully connected to mogodb server')
    }finally{
        // await client.close();
    }
}  
run().catch(console.dir);

