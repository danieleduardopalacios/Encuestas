var express = require('express');
var router = express.Router();
const axios = require('axios');
const formidable = require('formidable');
const connection = require('../db.js');



/* GET home page. */


router.get('/prueba', function(req, res, next) {

    
    res.json({variable: 'hola matias'});
    
 

  
});
/*
router.get('/', function(req, res, next) {

  axios.get('http://localhost:8081/list-page-front/6')
  .then(response => {
    
    res.render('index', { title: 'Express' , modules: response.data.modules });
    
  })
  .catch(error => {
    console.log(error);
  });


  
});
*/


router.get('/', function(req, res, next) {
  
    res.render('index_nuevo', { title: 'encuesta' });
    
  
});


router.post('/enviar', function(req, res, next) {
  
  const form = formidable({ multiples: true });
  form.parse(req,async (err, fields, files) => {
   let insert_respuesta =  await connection.promise().query('INSERT INTO respuestas  (id_encuesta) VALUES (?)',[1])
   console.log(insert_respuesta);
    var respuestas = fields;
    var arrayInsertar = [];
    for (let key in respuestas){
      let texto = key.endsWith('_text') ? fields[key] : null;
      let numero = key.endsWith('_text') ? null : (parseInt(fields[key]) || null);
      arrayInsertar.push([insert_respuesta[0].insertId ,key,texto,numero ]) 
    }

    let insert_masivo =  await connection.promise().query('INSERT INTO respuestas_detalle  (id_respuesta,cod_pregunta,valor_texto,id_descripcion_respuesta) VALUES ?',[arrayInsertar])

    res.render('success');
   // res.writeHead(200, { 'content-type': 'application/json' });
   // res.end(JSON.stringify({ fields, files }, null, 2));
  });



  

});


module.exports = router;
