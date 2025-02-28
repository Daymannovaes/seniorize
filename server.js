const app = require('./src/index.js')
const port = process.env.port || 3000

app.listen(port, (err) => {
    if (err) {
        return console.log("Error initializing server:",err.message)
    }
    console.log(`Server running on port ${port}.`)
})