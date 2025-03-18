import express from 'express'
import { handleGetAssessment, handlePostAssessment } from '../controllers/assessmentsController'


const router = express.Router()

router.get('/:id', handleGetAssessment)
router.post('/', handlePostAssessment)


export default router