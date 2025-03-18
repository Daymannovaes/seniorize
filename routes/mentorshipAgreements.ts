import express from 'express'
import { handleDeleteMentorshipAgreement, handleGetMentorshipAgreement, handlePostMentorshipAgreement, handlePutMentorshipAgreement } from '../controllers/mentorshipAgreementsController'

const router = express.Router()

router.get('/:id', handleGetMentorshipAgreement)
router.post('/', handlePostMentorshipAgreement)
router.put('/:id', handlePutMentorshipAgreement)
router.delete('/:id', handleDeleteMentorshipAgreement)

export default router