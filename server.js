const {createServer} = require('node:http')
//const port = 3000
const port = process.env.PORT || 3000 //tinha feito a linha acima a partir da doc do node, mas vi que tbm funciona assim e acho que deve ser algo de segurança
const hostname = 'localhost'

let numbers = []

function matchRoute (req, res, method, url, callback) {
    if (req.method === method && req.url === url) {
        req.handled = true
        callback(req, res)
    }
}

const server = createServer((req, res) => {
    req.on('error', (err) => {
        console.error(err)
        res.statusCode = 400
        res.end(JSON.stringify({error: err.message}))
    })

    matchRoute(req, res, 'GET', '/', () => {
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify({message: 'Hello world'}))
    })

    matchRoute(req, res, 'GET', '/ping', () => {
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify({message: 'pong'}))
    })

    matchRoute(req, res, 'GET', '/get-numbers', () => {
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify({numbers: numbers}))
    })

    matchRoute(req, res, 'POST', '/add-number', () => {
        let body = ''
        req.on('data', (chunk) => {
            body += chunk.toString()
        })
        req.on('end', () => {
            parsedBody = JSON.parse(body)
            numbers.push(parsedBody.number)
            res.statusCode = 200
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({message: 'Successfully added', number: parsedBody.number}))
        })
    })

    if (!req.handled) {
        res.statusCode = 404
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify({message: 'Not found'}))
    }

})

server.listen(port, hostname, () => {
    console.log(`Server running at ${hostname}:${port}`)
})