const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const express = require('express');

const Product = require('./models/Products')

mongoose.connect('mongodb+srv://buens18k:lilyetbuens1717@products.0bi2phm.mongodb.net/?retryWrites=true&w=majority&appName=Products',
  {useNewUrlParser: true,
    useUnifiedTopology: true})
  .then(()=> console.log('Connection à MongoDB réussie !'))  
  .catch((err)=> console.log('Connexion à MongoDB échouée :', err))

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
})

app.use(bodyParser.json())

// Middleware de Création du nouvel objet product
app.post('/api/products', (req, res, next) => {

  const product = new Product({
    ...req.body,
    _id: new mongoose.Types.ObjectId()
  })

  product.save()
    .then(product=> res.status(201).json({product}))
    .catch(error => res.status(400).json(error))
})

// Middleware de modification du product selon l'id
app.put('/api/products/:id', (req, res, next)=>{
  Product.updateOne({_id:req.params.id}, {...req.body, _id:req.params.id})
    .then(()=> res.status(200).json({message: 'Modified'}))
    .catch(error => res.status(400).json({error}));
})

app.delete('/api/products/:id', (req, res, next) => {
  Product.deleteOne({_id:req.params.id})
    .then(()=> res.status(200).json({message: 'Deleted!'}))
    .catch(error => res.status(401).json({error}))
})

app.get('/api/products/:id', (req, res, next)=>{
  Product.findOne({_id: req.params.id})
    .then(product => res.status(200).json({product}))
    .catch(error => res.status(400).json({error}))
})


app.get('/api/products', (req, res, next)=>{
  Product.find()
    .then(products => res.status(200).json({products}))
    .catch(error => res.status(400).json({error}))
})



module.exports = app;


// Test Requête API avec des middlewares
// app.use((req, res, next)=> {
//   console.log('Requête reçue');
//   next();
// })

// app.use((req, res, next)=> {
//   res.status(201)
//   next();
// })

// app.use((req, res, next)=> {
//   res.json({message:'Requête délivrer'})
// })