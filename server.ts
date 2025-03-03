//const {createServer} = require('node:http') //forma de importar apenas no JS, não funciona bem no TS
import { createServer, IncomingMessage, ServerResponse } from 'node:http'

declare module 'node:http' {
    interface IncomingMessage {
        handled: boolean
    }
}
interface WishedBody {
    number: number
}

//const port = 3000
const port: string = process.env.PORT || '3000' //tinha feito a linha acima a partir da doc do node, mas vi que tbm funciona assim e acho que deve ser algo de segurança
const hostname: string = 'localhost'

let numbers: Array<number> = []

function matchRoute (req: IncomingMessage, res: ServerResponse, method: string, url: string, callback: Function) {
    if (req.method === method && req.url === url) {
        req.handled = true
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        callback(req, res)
    }
}

function handleBadRequest(err: Error, req: IncomingMessage, res: ServerResponse) {
    console.error(err)
    res.statusCode = 400
    res.end(JSON.stringify({error: err.message}))
}

function handleUnknownPath(req: IncomingMessage, res: ServerResponse) {
    res.statusCode = 404
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({message: 'Not found'}))
}

function handleIndex(req: IncomingMessage, res: ServerResponse) {
    res.end(JSON.stringify({message: 'Hello world'}))
}

function handlePing(req: IncomingMessage, res: ServerResponse) {
    res.end(JSON.stringify({message: 'pong'}))
}

function handleGetNumbers (req: IncomingMessage, res: ServerResponse) {
    res.end(JSON.stringify({numbers: numbers}))
}

function handleAddNumber (req: IncomingMessage, res: ServerResponse) {
    let body: string = ''
    req.on('data', (chunk: Buffer) => {
        body += chunk.toString()
    })
    req.on('end', () => {
        const parsedBody: WishedBody = JSON.parse(body)
        numbers.push(parsedBody.number)
        res.end(JSON.stringify({message: 'Successfully added', number: parsedBody.number}))
    })
}

const server = createServer((req: IncomingMessage, res: ServerResponse) => {

    req.on('error', handleBadRequest)

    matchRoute(req, res, 'GET', '/', handleIndex)
    matchRoute(req, res, 'GET', '/ping', handlePing)
    matchRoute(req, res, 'GET', '/get-numbers', handleGetNumbers)
    matchRoute(req, res, 'POST', '/add-number', handleAddNumber)

    if (!req.handled) {
        handleUnknownPath(req, res)
    }
})

server.listen(Number(port), hostname, () => { // TS reclamou do port ser string, apesar desse parâmetro na func ser do tipo number | string. Aí adicionei a conversão pra Number e funcionou
    console.log(`Server running at ${hostname}:${port}`)
})