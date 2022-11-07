const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const { request } = require('express');
const MongoClient = require('mongodb').MongoClient

var db, collection;

const url = "mongodb+srv://pdot:Nono0707@cluster0.u4mn96o.mongodb.net/personal?retryWrites=true&w=majority";
const dbName = "personal";

app.listen(4000, () => {
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
        if(error) {
            throw error;
        }
        db = client.db(dbName);
        console.log("We live & connected to `" + dbName + "`!");
    });
});

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('public'))

app.get('/', (req, res) => {
  db.collection('messages').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.render('index.ejs', {messages: result})
  })
})

app.post('/messages', (req, res) => {
  db.collection('messages').insertOne({name: req.body.name, msg: req.body.msg, location: req.body.location, date: req.body.date, cell: req.body.cell, completed:false}, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/')
  })
})


app.put('/complete', (req, res) => { // creating a new document 
  db.collection('messages')
  .findOneAndUpdate({name: req.body.name, msg: req.body.msg, location: req.body.location, date: req.body.date, cell: req.body.cell}, {
    $set: {
      completed: true
    }
  }, {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})

// app.put('/thumbUp', (req, res) => {
//   db.collection('messages')
//   .findOneAndUpdate({name: req.body.name, msg: req.body.msg, location: req.body.location, date: req.body.date, cell: req.body.cell}, {
//     $set: {
//       thumbUp:req.body.thumbUp + 1
//     }
//   }, {
//     sort: {_id: -1},
//     upsert: true
//   }, (err, result) => {
//     if (err) return res.send(err)
//     res.send(result)
//   })
// })

// app.put('/thumbDown', (req, res) => {
//   db.collection('messages')
//   .findOneAndUpdate({name: req.body.name, msg: req.body.msg, location: req.body.location, date: req.body.date, cell: req.body.cell}, {
//     $set: {
//       thumbUp:req.body.thumbDown - 1
//     }
//   }, {
//     sort: {_id: -1},
//     upsert: true
//   }, (err, result) => {
//     if (err) return res.send(err)
//     res.send(result)
//   })
// })

app.delete('/messages', (req, res) => {
  db.collection('messages').findOneAndDelete({name: req.body.name, msg: req.body.msg, location: req.body.location, date: req.body.date, cell: req.body.cell}, (err, result) => {
    if (err) return res.send(500, err)
    res.send('Message deleted!')
  })
})

