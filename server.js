const {createServer} = require('node:http')
const { parse } = require('node:path')
//const port = 3000
const port = process.env.PORT || 3000 //tinha feito a linha acima a partir da doc do node, mas vi que tbm funciona assim e acho que deve ser algo de segurança
const hostname = 'localhost'

let numbers = []

function matchRoute (req, res, method, url, callback) {
    if (req.method === method && req.url === url) {
        req.handled = true
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        callback(req, res)
    }
}

function handleBadRequest(err) {
    console.error(err)
    res.statusCode = 400
    res.end(JSON.stringify({error: err.message}))
}

function handleUnknownPath(req, res) {
    res.statusCode = 404
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({message: 'Not found'}))
}

function handleIndex(req, res) {
    res.end(JSON.stringify({message: 'Hello world'}))
}

function handlePing(req, res) {
    res.end(JSON.stringify({message: 'pong'}))
}

function handleGetNumbers (req, res) {
    res.end(JSON.stringify({numbers: numbers}))
}

function handleAddNumber (req, res) {
    let body = ''
    req.on('data', (chunk) => {
        body += chunk.toString()
    })
    req.on('end', () => {
        const parsedBody = JSON.parse(body)
        numbers.push(parsedBody.number)
        res.end(JSON.stringify({message: 'Successfully added', number: parsedBody.number}))
    })
}

const server = createServer((req, res) => {

    req.on('error', handleBadRequest)

    matchRoute(req, res, 'GET', '/', handleIndex)
    matchRoute(req, res, 'GET', '/ping', handlePing)
    matchRoute(req, res, 'GET', '/get-numbers', handleGetNumbers)
    matchRoute(req, res, 'POST', '/add-number', handleAddNumber)

    if (!req.handled) {
        handleUnknownPath(req, res)
    }
})

server.listen(port, hostname, () => {
    console.log(`Server running at ${hostname}:${port}`)
})