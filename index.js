const express = require('express')
const app = express()
const path = require("path")
const mysql2 =require ("mysql2")
const bodyParser = require('body-parser')


const PORT = process.env.PORT ?? 3000

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(function (req,res,next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Authorization,Content-Type, Accept,Origin,User-Agent,DNT,Cache-Control,X-Mx-ReqToken');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
app.use('/static', express.static('public'))

app.set('view engine', 'ejs')
app.set('views', path.resolve(__dirname, 'ejs'))

app.use(express.static(path.resolve(__dirname, 'static')))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))


app.get('/', (req, res) => {
  res.render('index', {title: 'Основные сведения', active: 'index'})
})
app.get('/about', (req, res) => {
  res.render('about', {title: 'Специальности', active: 'about'})
})
app.get('/contact', (req, res) => {
  res.render('contact', {title: 'Контакты', active: 'contact'})
})
const db = mysql2.createPool({
  connectionLimit: 1000000,
  host: "localhost",
  user: "root",
  database: "monitori",
  password: ""
});
const urlencodedParser = express.urlencoded({extended: false});
   
// получение списка пользователей
    app.get("/prodajaa", function(req, res){
        db.query("SELECT * FROM prodaja", function(err, data) {
          if(err) return console.log(err);
          res.render("prodajaa.hbs", {
              prodajaa: data
          });
        });
    });

// возвращаем форму для добавления данных
app.get("/prodajaacreate", function(req, res){
    res.render("prodajaacreate.hbs");
});
// получаем отправленные данные и добавляем их в БД 
app.post("/prodajaacreate", urlencodedParser, function (req, res) {
         
    if(!req.body) return res.sendStatus(400);

    const model = req.body.model;
    const diagonal= req.body.diagonal;
    const razrech= req.body.razrech;
    const ves = req.body.ves;
    const urkost = req.body.urkost;
    const kontrasnost = req.body.kontrasnost;
    const garanti = req.body.garanti;
    const cena = req.body.cena;
    const rassrochka = req.body.rassrochka;
    db.query("INSERT INTO prodaja (`model`, `diagonal`, `razrech`, `ves`, `urkost`, `kontrasnost`, `garanti`, `cena`, `rassrochka`) VALUES (?,?,?,?,?,?,?,?,?)", [model, diagonal, razrech, ves, urkost, kontrasnost, garanti, cena, rassrochka], function(err, data) {
     if(err) return console.log(err);
    res.redirect("/prodajaa");
    });
});
 
// получем id редактируемого пользователя, получаем его из бд и отправлям с формой редактирования
app.get("/prodajaaedit/:id", function(req, res){
  const id = req.params.id;
  db.query("SELECT * FROM prodaja WHERE id=?", [id], function(err, data) {
    if(err) return console.log(err);
     res.render("prodajaaedit.hbs", {
        prodajaa: data[0]
    });
  });
});
// получем id просмотра пользователя
app.get("/prodajaashow/:id", function(req, res){
  const id = req.params.id;
  db.query("SELECT * FROM prodaja WHERE id=?", [id], function(err, data) {
    if(err) return console.log(err);
     res.render("prodajaashow.hbs", {
        prodajaa: data[0]
    });
  });
});
// получаем отредактированные данные и отправляем их в БД
app.post("/prodajaaedit", urlencodedParser, function (req, res) {
         
  if(!req.body) return res.sendStatus(400);
  const model = req.body.model;
  const diagonal= req.body.diagonal;
  const razrech= req.body.razrech;
  const ves = req.body.ves;
  const urkost = req.body.urkost;
  const kontrasnost = req.body.kontrasnost;
  const garanti = req.body.garanti;
  const cena = req.body.cena;
  const rassrochka = req.body.rassrochka;
  
  const id = req.body.id;
  
  db.query("UPDATE prodaja SET model=?, diagonal=?, razrech=?, ves=?, urkost=?, kontrasnost=?, garanti=?, cena=?, rassrochka=? WHERE id=?", [ model, diagonal, razrech, ves, urkost, kontrasnost, garanti, cena, rassrochka, id], function(err, data) {
    if(err) return console.log(err);
    res.redirect("/prodajaa");
  });
});
 
// получаем id удаляемого пользователя и удаляем его из бд
app.post("/delete/:id", function(req, res){
          
  const id = req.params.id;
  db.query("DELETE FROM prodaja WHERE id=?", [id], function(err, data) {
    if(err) return console.log(err);
    res.redirect("/prodajaa");
  });
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////

// получение списка пользователей
app.get("/remont", function(req, res){
  db.query("SELECT * FROM remont", function(err, data) {
    if(err) return console.log(err);
    res.render("remont.hbs", {
        remont: data
    });
  });
});

// возвращаем форму для добавления данных
app.get("/remontcreate", function(req, res){
res.render("remontcreate.hbs");
});
// получаем отправленные данные и добавляем их в БД 
app.post("/remontcreate", urlencodedParser, function (req, res) {
   
if(!req.body) return res.sendStatus(400);

const model = req.body.model;
const diagonal= req.body.diagonal;
const razrech= req.body.razrech;
const ves = req.body.ves;
const urkost = req.body.urkost;
const kontrasnost = req.body.kontrasnost;
const garanti = req.body.garanti;
const cena = req.body.cena;
const vremyaremont = req.body.vremyaremont;
db.query("INSERT INTO remont (`model`, `diagonal`, `razrech`, `ves`, `urkost`, `kontrasnost`, `garanti`, `cena`, `vremyaremont`) VALUES (?,?,?,?,?,?,?,?,?)", [model, diagonal, razrech, ves, urkost, kontrasnost, garanti, cena, vremyaremont], function(err, data) {
if(err) return console.log(err);
res.redirect("/remont");
});
});

// получем id редактируемого пользователя, получаем его из бд и отправлям с формой редактирования
app.get("/remontedit/:id", function(req, res){
const id = req.params.id;
db.query("SELECT * FROM remont WHERE id=?", [id], function(err, data) {
if(err) return console.log(err);
res.render("remontedit.hbs", {
  remont: data[0]
});
});
});
// получем id просмотра пользователя
app.get("/remontshow/:id", function(req, res){
  const id = req.params.id;
  db.query("SELECT * FROM remont WHERE id=?", [id], function(err, data) {
    if(err) return console.log(err);
     res.render("remontshow.hbs", {
        remont: data[0]
    });
  });
});
// получаем отредактированные данные и отправляем их в БД
app.post("/remontedit", urlencodedParser, function (req, res) {
   
if(!req.body) return res.sendStatus(400);
const model = req.body.model;
const diagonal= req.body.diagonal;
const razrech= req.body.razrech;
const ves = req.body.ves;
const urkost = req.body.urkost;
const kontrasnost = req.body.kontrasnost;
const garanti = req.body.garanti;
const cena = req.body.cena;
const vremyaremont = req.body.vremyaremont;


const id = req.body.id;

db.query("UPDATE remont SET model=?,  diagonal=?, razrech=?, ves=?, urkost=?, kontrasnost=?, garanti=?, cena=?, vremyaremont=? WHERE id=?", [ model, diagonal, razrech, ves, urkost, kontrasnost, garanti, cena, vremyaremont, id], function(err, data) {
if(err) return console.log(err);
res.redirect("/remont");
});
});

// получаем id удаляемого пользователя и удаляем его из бд
app.post("/delete1/:id", function(req, res){
    
const id = req.params.id;
db.query("DELETE FROM remont WHERE id=?", [id], function(err, data) {
if(err) return console.log(err);
res.redirect("/remont");
});
});



const routes = require('./settings/routes')
routes(app)



app.listen(PORT, () => {
  console.log(`Server has been started on port ${PORT}...`)
})