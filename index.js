const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const { ObjectID } = require('bson');
//port
const port = process.env.PORT || 5000;

const app = express();
//middleware
app.use(cors());
app.use(express.json());

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



    }
    finally{

    }
}
run().catch(console.dir);



app.get('/',(req,res)=>{
    res.send('Running Genius server');
});



app.listen(port,()=>{
    console.log('Server port running in: ',port);
})


