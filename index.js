const express = require('express')
const nunjucks = require('nunjucks')

const app = express()

nunjucks.configure('views', {
  autoescape: true,
  express: app,
  watch: true
})

app.use(express.urlencoded({ extended: false }))
app.set('view engine', 'njk')

const middlewareAge = (req, res, next) => {
  const { idade } = req.query
  if (!idade) return res.redirect('/')
  return next()
}

app.get('/', (req, res) => {
  return res.render('form')
})

app.post('/check', (req, res) => {
  const { idade } = req.body
  if (idade >= 18) return res.redirect(`/major?idade=${idade}`)
  return res.redirect(res.redirect(`/minor?idade=${idade}`))
})

app.get('/minor', middlewareAge, (req, res) => {
  const { idade } = req.query
  return res.render('minor', { idade })
})

app.get('/major', middlewareAge, (req, res) => {
  const { idade } = req.query
  return res.render('major', { idade })
})

app.listen(3000)
