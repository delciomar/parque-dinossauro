import express from 'express'
const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs')

//Liberar acesso a pasta public
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static(__dirname + '/public'))



import Especie from './models/Especie.js'
import Dinossauro from './models/Dinossauro.js'
import Paleontologo from './models/Paleontologo.js'

app.get('/', (req, res) => {
    //envio de informação para o EJS
    res.render("index");
})

app.get('/dinossauro/add', (req, res) => {
    res.render("dinossauro/add");
})

app.get('/dinossauro', async (req, res) => {
    const dinossauros = await Dinossauro.find()
    res.render("dinossauro/lst", {dinossauros});
})

app.post('/dinossauro/add',  async (req, res) => {
  const {nome,especie,descricao,altura,peso,anoDescoberta,dieta} = req.body
  await Dinossauro.create({nome,especie,descricao,altura,peso,anoDescoberta,dieta})
  res.render("dinossauro/add");
})

app.get('/dinossauro/del/:id', async (req, res) => {
  await Dinossauro.findByIdAndDelete(req.params.id)
    const dinossauros = await Dinossauro.find()
    res.render("dinossauro/lst", {dinossauros});
})
 
// Dinossauros em cima

//

app.get('/especie',  async (req, res) => {
 //listar espécies
 const especies = await Especie.find()
 res.render("especie/lst", {especies});

})

app.get('/especie/add',  (req, res) => {
  res.render("especie/add");
})
//Rota POST pra gravar no Banco de Dados
app.post('/especie/add',  async (req, res) => {
  const {nome,periodo} = req.body
  await Especie.create({nome,periodo})
  res.render("especie/add");
})

app.get('/especie/del/:id',  async (req, res) => {
await Especie.findByIdAndDelete(req.params.id)
  //listar espécies
 const especies = await Especie.find()
 res.render("especie/lst", {especies});
})

app.get('/especie/upd/:id', async  (req, res) => {
  //busca o registro que quero alterar
  const especie = await Especie.findById(req.params.id)
  res.render("especie/upd", {especie});
})

app.post('/especie/upd/:id',  async (req, res) => {
  const {id,nome,periodo} = req.body
  await Especie.findByIdAndUpdate(id, {nome,periodo})
   const especies = await Especie.find()
  res.render("especie/lst", {especies});
})

// especie em cima 

//

app.get('/novopal/add', (req, res) => {
    res.render("paleontologo/add");
})

app.get('/paleontologo', async (req, res) => {
    const paleontologos = await Paleontologo.find()
    res.render("paleontologo/lst", {paleontologos});
})

app.post('/novopal/add',  async (req, res) => {
  const {nome,nascimento,descoberta} = req.body
  await Paleontologo.create({nome,nascimento,descoberta})
  res.render("paleontologo/add");
})

app.get('/paleontologo/del/:id', async (req, res) => {
  await Paleontologo.findByIdAndDelete(req.params.id)
  const paleontologos = await Paleontologo.find()
  res.render("paleontologo/lst", {paleontologos});
})

app.get('/paleontologo/upd/:id', async  (req, res) => {
  //busca o registro que quero alterar
  const paleontologo = await Paleontologo.findById(req.params.id)
  res.render("paleontologo/upd", {paleontologo});
})

app.post('/paleontologo/upd/:id',  async (req, res) => {
  const {id,nome,periodo} = req.body
  await Paleontologo.findByIdAndUpdate(id, {nome,periodo})
   const paleontologos = await Paleontologo.find()
  res.render("paleontologo/lst", {paleontologos});
})

app.listen(PORT, () => {
    console.log(`servidor rodando em http://localhost:${PORT}`);
});