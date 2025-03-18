import express from 'express'
import { handleDeleteStudents, handleGetActiveStudents, handleGetSingleStudent, handlePostStudents, handlePutStudents } from '../controllers/studentsController'

const router = express.Router()

router.get('/', handleGetActiveStudents)
router.post('/', handlePostStudents)
router.get('/:id', handleGetSingleStudent)
router.put('/:id', handlePutStudents)
router.delete('/:id', handleDeleteStudents)


export default router