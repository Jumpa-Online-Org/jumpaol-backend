const express = require('express')
const cors = require('cors')

const app = express()
const PORT = process.env.PORT || 8081
const db = require('./src/models')

db.seq.sync()

var whitelist = ['http://localhost:8081', 'http://localhost:3000']
var corsOptions = {
    origin: function (origin, callback) {
        console.log(origin)
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}

app.use(cors(corsOptions))

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

app.get("/", (req, res) => {
    res.json({ message: "Halo Jumpa Online!" })
})

require('./src/routes/post.routes')(app)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})