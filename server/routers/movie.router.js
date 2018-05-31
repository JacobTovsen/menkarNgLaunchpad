const express = require('express');
const router = express.Router();
movieId = 2;
const movieArray = [
    {
        title: 'Star Wars',
        id: 1
    }
];

router.get('/', (req, res)=>{
    console.log(`In /movie GET...`);
    res.send(movieArray);
})

router.post('/', (req, res) => {
    let movie = req.body;
    console.log(`in /movie POST with data ${movie}`);
    movie.id = movieId++; // pretend we are a database
    movieArray.push(movie);
    res.sendStatus(201);
})

router.delete('/', (req, res)=>{
    let id = req.query.id;
    console.log(`In /movie DELETE...`);
    for (let i=0; i<movieArray.length; i++ ){
        let movie = movieArray[i];
        if(id == movie.id){
            movieArray.splice(i,1);
        }
    }
    // vm.movies.splice( index, 1 );
    res.sendStatus(200);
})

module.exports = router;