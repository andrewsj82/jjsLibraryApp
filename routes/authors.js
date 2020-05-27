const express = require('express')
const router = express.Router()
const Author = require('../models/author')

// All Authors Route
router.get('/', async (req, res) => {
    let searchOptions = {} //defining the var object to hold the search query results
    if (req.query.name != null && req.query.name !== '') { //query is used because the .get method sends it via query. post method sends it through the body
        searchOptions.name = new RegExp(req.query.name, 'i')  // the i indicates case insensitive
        
    } try {
        const authors = await Author.find(searchOptions)
        res.render('authors/index', { 
            authors: authors,
            searchOptions: req.query 
        })
    } catch {
        res.redirect('/')  // if caught, redirect back to the home page
    }
    
})

// New Author Route
router.get('/new', (req, res) => {
    res.render('authors/new', {author: new Author() })
})

// Create new Author Route using POST
router.post('/', async (req, res) => {
    const author = new Author({
      name: req.body.name
    })
    try {
      const newAuthor = await author.save()
      // res.redirect(`authors/${newAuthor.id}`)
      res.redirect(`authors`)
    } catch {
      res.render('authors/new', {
        author: author,
        errorMessage: 'Error creating Author'
      })
    }
})
 
//  res.send(req.body.name)  originally used for testing prior to the if/else implementation

module.exports = router 