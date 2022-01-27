const express = require('express')
const bodyParser = require('body-parser')
const MongoClient=require('mongodb').MongoClient
const app = express()
app.use(bodyParser.urlencoded({extended:true}))

//Db connection String
const connectionString = "mongodb+srv://Saianusha:Saianusha@cluster0.apekh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

//connecting the db
MongoClient.connect(connectionString,{useUnifiedTopology:true})
    .then(client => {
        console.log('connected to database-server')
        const db=client.db('star-wars-quotes')
        const quotesCollection=db.collection('quotes')

        // 1.create route with creating the quote
        app.post('/quotes',(req,res) => {
            quotesCollection.insertOne(req.body)
            .then(result => {
                res.send(result)
            })
            .catch(error => console.error(error))
        })

        // 2. Reading data from Mongodb
        app.get('/getall',(req,res)=>{
            db.collection('quotes').find().toArray()
            .then(result=>{
                res.send(result)
            })
            .catch(error=>console.error(error))
        })

        //3. Updating Data
        app.put('/updatequote',(req,res)=>{
            quotesCollection.findOneAndUpdate()
            .then(result=>{
                res.send(result)
            })
            .catch(error=>console.error(error))
        })
    }).catch(console.error)

app.get('/',(req,res) => {
    res.sendFile(__dirname + './index.html')
})

const PORT=4000
app.listen(PORT,() => {
    console.log(`server running at port ${PORT}`)
})
