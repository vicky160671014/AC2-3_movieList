//require packages used in the project
const express = require('express')
const app = express()
const port = 3000
//require express-handlebars here
const exphbs = require('express-handlebars')
const movieList = require('./movies.json')

//setting template engine
app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

//setting static file
app.use(express.static('public'))

//setting routes
app.get('/', (req, res)=>{
  res.render('index', {movies: movieList.results})
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const movies = movieList.results.filter(movie=> { 
    return movie.title.toLowerCase().includes(keyword.toLowerCase())
  })
  res.render('index', { movies: movies, keyword: keyword })
})

app.get('/movies/:movies_id', (req, res)=>{
  // console.log('req.params.movies_id', req.params.movies_id)
  const movie = movieList.results.find(movie => movie.id.toString() === req.params.movies_id)
  // console.log(movie)
  res.render('show', {movie : movie})
})

//start and listen on express server
app.listen(port, ()=>{
  console.log(`Express is listening on localhost:${port}`)
})