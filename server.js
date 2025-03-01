const {createServer} = require('node:http')
//const port = 3000
const port = process.env.PORT || 3000 //tinha feito a linha acima a partir da doc do node, mas vi que tbm funciona assim e acho que deve ser algo de segurança
const hostname = 'localhost'

let numbers = []

const server = createServer((req, res) => {
    req.on('error', (err) => {
        console.error(err)
        res.statusCode = 400
        res.end(JSON.stringify({error: err.message}))
    })

    if(req.method === 'GET' && req.url === '/') {
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify({message: "Hello world"}))

    } else if (req.method === 'GET' && req.url === '/ping') {
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify({message: "pong"}))

    } else if (req.method === 'POST' && req.url === '/add-number') {
        let body = ''
        req.on('data', (chunk) => {
            body += chunk.toString()
        })
        req.on('end', () => {
            const parsedBody = JSON.parse(body)
            numbers.push(parsedBody.number)
            res.statusCode = 200
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({message: "Successfully added", number: parsedBody.number}))
        })        

    } else if (req.method === 'GET' && req.url === '/get-numbers') {
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify({numbers: numbers}))

    } else {
        res.statusCode = 404
        res.setHeader('Content-Type', 'application/json')
        res.end("Not found")
    }
})

server.listen(port, hostname, () => {
    console.log(`Server running at ${hostname}:${port}`)
})