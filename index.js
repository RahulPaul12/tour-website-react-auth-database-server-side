const express = require('express');
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');
app.use(cors());
app.use(express.json());
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.azp3u.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run(){
    try{
        await client.connect();
        console.log('connect');
        const database = client.db("holiday-travel");
        const servicescollection = database.collection("services");
        const hotelscollection = database.collection("Hotels");
      


    app.get('/services', async(req,res)=>{
        const cursor = servicescollection.find({});
        const services = await cursor.toArray();
        res.send(services);
    });
    app.get('/hotels', async(req,res)=>{
        const cursor = hotelscollection.find({});
        const hotels = await cursor.toArray();
        res.send(hotels);
    });

    app.get('/services/:id' ,async(req,res)=>{
        const id = req.params.id;
        const query = {_id: ObjectId(id)};
        const service = await servicescollection.findOne(query);
        res.json(service);
    });

    app.post('/services', async (req,res)=>{
        const service = req.body;
        
         const result = await servicescollection.insertOne(service);
         res.json(result);
        
    });

}

    finally{
        
    }
}
run().catch(console.dir);


app.get('/',(req,res)=>{
    res.send('server running');
});

app.listen(port,()=>{
    console.log('travel server');
});