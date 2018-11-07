var express = require('express')
var app = new express()

const port = 8000

app.use(express.static('public')) // static path
app.set('view engine', 'pug')

var middle = function(req, res, next) {
  console.log('just a middleware demo')
  next()
}

app.use(middle)

app.get('/', function(req, res) { // GET demo
  var args = {
    title: 'just title',
    message: 'just some text',
  }
  res.render('index', args)
})

app.get('/file/:name', function(req, res, next) { // download file demo
  var options = {
    root: __dirname + '/public/cache/', // The path should be customized
    dotfiles: 'deny',
    headers: {
      'x-timestamp': Date.now(),
      'x-sent': true
    }
  };
  var path = req.params.name
  res.sendFile(path, options, function(err) {
    if (err) {
      next(err)
    } else {
      console.log('sent: ' + path)
    }
  })
})

app.use(function(err, req, res, next) { // 500
  console.error(err.stack)
  res.status(500).send('500 server error')
})

app.use(function(req, res, next) { // 404
  res.status(404).send('404 not found')
})

app.listen(port, ()=> {
  console.log('listen on http://localhost:8000')
})