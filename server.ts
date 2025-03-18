import express, { Request, Response } from 'express'
import studentsRoutes from './routes/students'
import mentorshipAgreementsRoutes from './routes/mentorshipAgreements'
import assessmentsRoutes from './routes/assessments'

const app = express()
const port = process.env.PORT || 3000
app.use(express.json())

app.use('/students', studentsRoutes)
app.use('/mentorshipAgreements', mentorshipAgreementsRoutes)
app.use('/assessments', assessmentsRoutes)


app.listen(port, () => {
    console.log(`Server running on port ${port}.`)
})
