import express from 'express'
import { handleDeleteStudents, handleGetActiveStudents, handleGetSingleStudent, handleGetStudents, handlePostStudents, handlePutStudents } from '../controllers/studentsController'

const router = express.Router()

router.get('/active', handleGetActiveStudents)
router.post('/', handlePostStudents)
router.get('/:id', handleGetSingleStudent)
router.put('/:id', handlePutStudents)
router.delete('/:id', handleDeleteStudents)
router.get('/', handleGetStudents)



export default router