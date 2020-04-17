console.log("Hallo");

const express = require('express');
const port = 5000;

const path = require('path');

const bodyparser = require('body-parser');

const app = express();

const museum = require("./data/museum.json");


app.set('view engine', 'ejs');
app.set('views',  path.resolve(__dirname, 'views'));

app.use(express.static('public'));

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));


app.get("/", function(request, response){
  let werken = museum.werken
  let uitgelichteWerken= [];

  for (var i = 0; i < werken.length; i++) {
    if(werken[i].uitgelicht){
      uitgelichteWerken.push(werken[i])
    }
  }
  response.render("home", {
    uitgelicht: uitgelichteWerken
  });
});


app.get("/overzicht", function(request, response){

  response.render("overzicht", {
    werken: museum.werken
  });
});

app.get("/detail/:werkid", function(request, response){

  response.render("detail", {
    werk: museum.werken[request.params.werkid]
  });
});

app.get("/contact", function(request, response){
  response.render("contact");
});



app.post("/result", function(request, response){

  var query = request.body.query;

  response.render("result", {
    results: filter(query),
    query: query
  })

});


function filter(query){
  var alleWerken = museum.werken;
  var gefilterdeWerken = [];

  var queryLowerCase = query.toLowerCase();

  for (var i = 0; i < alleWerken.length; i++) {
    if(alleWerken[i].title.toLowerCase().includes(queryLowerCase) ||
       alleWerken[i].Artist.toLowerCase().includes(queryLowerCase) ||
       alleWerken[i].time.toLowerCase().includes(queryLowerCase)){
      gefilterdeWerken.push(alleWerken[i]);
    }
  }

  return gefilterdeWerken;
}

app.set('port', (process.env.PORT || 5000));
app.listen(app.get('port'), function() { });
//app.listen(port);
