import express, { Request, Response } from 'express'

const app = express()
const port = process.env.PORT || 3000
app.use(express.json())

const numbers: Array<number> = []

function handleIndex (req: Request, res: Response) {
    res.status(200).json({message: 'Hello world'})
}

function handlePing (req: Request, res: Response) {
    res.status(200).json({message: 'pong'})
}

function handleGetNumbers (req: Request, res: Response) {
    res.status(200).json({numbers: numbers})
}

function handleAddNumber (req: Request, res: Response) {
    const { number } = req.body
    if (typeof(number) ==='number') {
        numbers.push(number)
        res.status(200).json({message: 'Successfully added', number: number})
    } else {
        res.status(400).json({message: 'Expected a number, got something else'})
    }
}

app.get('/', handleIndex)
app.get('/ping', handlePing)
app.post('/add-number', handleAddNumber)
app.get('/get-numbers', handleGetNumbers)


app.listen(port, () => {
    console.log(`Server running on port ${port}.`)
})
