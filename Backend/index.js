const connectToMongo = require('./db');
const express = require('express')

connectToMongo(); 
const app = express()
const port =5000

app.use(express.json())

// Available routes
app.use('/api/auth', require('./routers/auth'))
app.use('/api/notes', require('./routers/notes'))

app.listen(port, () => {
  console.log(`iNoteBook backend listening at http://localhost:${port}`)
})



app.get('/', (req, res) => {
  res.send('Hello harry')
})

