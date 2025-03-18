import express from 'express'
import { handleDeleteStudents, handleGetActiveStudents, handleGetSingleStudent, handlePostStudents, handlePutStudents } from '../controllers/studentsController'
import { handleGetMentorshipAgreementByStudentId } from '../controllers/mentorshipAgreementsController'
import { handleGetStudentAssessmentsByStudentId } from '../controllers/assessmentsController'

const router = express.Router()

router.get('/', handleGetActiveStudents)
router.post('/', handlePostStudents)
router.get('/:id', handleGetSingleStudent)
router.put('/:id', handlePutStudents)
router.delete('/:id', handleDeleteStudents)

router.get('/:id/agreement', handleGetMentorshipAgreementByStudentId)

router.get('/:id/assessments', handleGetStudentAssessmentsByStudentId)


export default router