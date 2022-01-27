const express = require('express')
const bodyParser = require('body-parser')
const MongoClient=require('mongodb').MongoClient
const app = express()
app.use(bodyParser.urlencoded({extended:true}))
const connectionString = ""
MongoClient.connect(connectionString,{useUnifiedTopology:true})
    .then(client => {
        console.log('connected to database-server')
        const db=client.db('star-wars-quotes')
        const quotesCollection=db.collection('quotes')

        // 1.
        app.post('/quotes',(req,res) => {
            quotesCollection.insertOne(req.body)
            .then(result => {
                res.send(result)
            })
            .catch(error => console.error(error))
        })



    }).catch(console.error)

app.get('/',(req,res) => {
    res.sendFile(__dirname + './index.html')
})

const PORT=3000
app.listen(PORT,() => {
    console.log(`server running at port ${PORT}`)
})
