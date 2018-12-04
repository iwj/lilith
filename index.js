var express = require('express')
var app = new express()

const port = 8000

app.use(express.static('static')) // static path
app.set('view engine', 'pug')

app.get('/', function(req, res) { // GET demo
  res.redirect('/gif/wjz')
})

app.get('/file/:name', function(req, res, next) { // download file demo
  var options = {
    root: __dirname + '/static/cache/', // The path should be customized
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

app.get('/btoa/:string', function(req, res, next) {
  var userInput = req.params.string
  var buffer = Buffer.from(userInput);
  var result = buffer.toString('base64');
  res.send({
    base64: result,
    text: userInput,
    buffer: buffer,
  })
})

app.get('/atob/:string', function(req, res, next) {
  var userInput = req.params.string
  var buffer = Buffer.from(userInput, 'base64')
  var result = buffer.toString('utf8')
  res.send({
    text: result,
    base64: userInput,
    buffer: buffer,
  })
})

app.get('/:keyword', function (req, res, next) {
  var keywordBE = req.params.keyword
  var args = {}
  switch (keywordBE) {
    case 'headman':
    case '元首':
      args.message = '元首的愤怒，你们这群渣渣，万能的德语'
      args.keywordToFE = 'headman'
      args.placeholderFE = [
        '我们的微信再好用 北韩都没人用',
        '没关系 我们可以派人去地推',
        '北韩那里...',
        '北韩那里根本没有接入英特网',
        '（沉默）... ...',
      ]
      args.originURL = '/gif/headman.gif'
      args.demoURL = '/gif/headman-demo.gif'
      break;
    case 'wjz':
    case '王敬泽':
      args.message = '王境泽，全国最有骨气的少年，在本应该成为小鲜肉的年纪里，却成了表情包'
      args.keywordToFE = 'wjz'
      args.placeholderFE = [
        '我王境泽就是饿死',
        '死外边 从这里跳下去',
        '也不会吃你们一点东西',
        '（啊呀）真香',
      ]
      args.originURL = '/gif/wjz.gif'
      args.demoURL = '/gif/wjz-demo.gif'
      break;
    default:
      res.status(404).render(
        'layout-default', 
        {errormsg: '路径错误，请检查'}
        )
  }
  res.render('gif', args)
})

app.use(function(err, req, res, next) { // 500
  console.error(err.stack)
  res.status(500).render(
    'layout-default',
    {errormsg: '500 server error'}
    )
})

app.use(function(req, res, next) { // 404
  res.status(404).render(
    'layout-default', 
    {errormsg: '404 not found'}
    )
})

app.listen(port, ()=> {
  console.log('listen on http://localhost:8000')
})