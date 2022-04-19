const express = require("express")
const bodyParser = require("body-parser")
const app = express()
// app.use(express.static(path.join(__dirname, 'public'), { index : false }));

app.use((req, res, next) => {
  bodyParser.json({limit: '50mb', extended: true})(req, res, (err) => {
    if (err) {
      console.error(err)
      return res.sendStatus(400) // Bad request
    }
    next()
  })
})

app.get('/', (res, req) => {
  res.json({message: 'Split and Pay API'})
})



app.use('/api', require('./routes/api'))

const PORT = 80

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
