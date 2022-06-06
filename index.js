const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const { ObjectID } = require('bson');
const jwt = require('jsonwebtoken');
const { get } = require('express/lib/response');
//port
const port = process.env.PORT || 5000;

const app = express();
//middleware
app.use(cors());
app.use(express.json());

function verifyJWT(req,res,next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).send({message: 'unauthorized access'});
  }
  const token = authHeader.split(' ')[1];
  jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,decoded)=>{
    if (err) {
      return res.status(403).send({message : 'Forbiden'});
    }
    console.log('decoded',decoded);
    req.decoded = decoded;
    next();
  })
        // console.log('inside verifyJWT',authHeader);
        
}

//Mongodb database
/*
user :geniusDbuser
password: b2Qrc0qSNR4cehXQ
*/

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.92iu5.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

//mongodb crud

async function run(){
    try{
      await client.connect();
      const serviceCollection = client.db('geniusCar').collection('service');
      const orderCollection = client.db('geniusCar').collection('order');

      //Auth API
      app.post('/login',async(req,res)=>{
        const user = req.body;
        const accessToken = jwt.sign(user,process.env.ACCESS_TOKEN_SECRET, {
          expiresIn : '1d'
        });
        res.send({accessToken});
      })



      //Service API
      app.get('/service', async(req,res)=>{
        const query = {};
        const cursor = serviceCollection.find(query);
        const service = await cursor.toArray();
        res.send(service);
      });

      app.post('/service', async(req,res)=>{
        const newService = req.body;
        const result = await serviceCollection.insertOne(newService);
        res.send(result);
      })


      app.get('/service/:id',async(req,res)=>{
        const id = req.params.id;
        const query = {_id: ObjectId(id)};
        const service = await serviceCollection.findOne(query);
        res.send(service);
      })

      //DELETE
      app.delete('/service/:id', async(req,res) => {
        const id = req.params.id;
        const query = {_id: ObjectID(id)};
        const result = await serviceCollection.deleteOne(query);
        res.send(result);
      })

      // Order collection API

      app.get('/orders' ,verifyJWT, async(req,res) =>{
        const email = req.query.email;
        const decodedEmail = req.decoded.email;
        if (email === decodedEmail) {
          const query = {email: email};
          const cursor = orderCollection.find(query);
          const orders = await cursor.toArray();
          res.send(orders);
          }
          else{
            res.status(403).send({message : 'forbiden'});
          }
        
      })


      app.post('/order' , async(req,res) => {
        const order = req.body;
        const result = await orderCollection.insertOne(order);
        res.send(result);
      })

    }
    finally{

    }
}
run().catch(console.dir);



app.get('/',(req,res)=>{
    res.send('Running Genius server');
});

app.get('/hero',(req,res)=>{
    res.send('Hero meets heroku');
});



app.listen(port,()=>{
    console.log('Server port running in: ',port);
})



