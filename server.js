const express = require('express');
const path = require('path');
const fs = require('fs');
const data = require('./db/db.json');
const app = express();
const PORT = process.env.PORT || 3500; // Needed for Heroku


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));




//Routes 
//======================================================

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get('/notes', function (req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});



//Server-Side get notes
app.get("/api/notes", function (req, res) {
 
    fs.readFile('./db/db.json', 'utf8', (err, data) => { 
        res.json(JSON.parse(data));
        
        // console.log(typeof data);
    })
    
});

//Server-side send(post) notes
app.post("/api/notes", function (req, res) {

    const note = req.body;

    // console.log(note);

    fs.readFile('./db/db.json', 'utf8', (err, data) => { 
        let array = JSON.parse(data);

        // console.log(array);
        
       (array.unshift(note));

    //    console.log(array);
        array.forEach(function(element) { 

        
        
        element.id = (Math.floor(Math.random() * Math.floor(1000)));
        
    
        // console.log(array);
    
    });

    //    console.log(array);

        fs.writeFile('./db/db.json', JSON.stringify(array), 'utf8', (err, data) => {
        if(err) throw err;
        })

        
        
    })

    res.json(note);
        

});


app.delete("/api/notes/:id", function(req, res) { 
    
    fs.readFile('./db/db.json', 'utf8', (err, data) => { 
        let array = JSON.parse(data);

    // console.log(array);
        
    const result = array.filter(array => array.id != req.params.id);

    // console.log(result);
        


        // console.log(array.id);
        // console.log(JSON.stringify(result));

    fs.writeFile('./db/db.json', JSON.stringify(result), 'utf8', (err, data) => {
        if (err) throw err;
    } )
    })
    
    res.sendfile('./db/db.json');
})


app.listen(PORT, function () {
    console.log('App listening on PORT ' + PORT);
});