import { Request, Response } from 'express'

import { MentorshipAgreement } from '../entities/mentorshipAgreements'
import { createMentorshipAgreement, deleteMentorshipAgreement, getMentorshipAgreement, getMentorshipAgreementByStudentId, updateMentorshipAgreement } from '../domain/mentorshipAgreements'

export function handleGetMentorshipAgreement (req: Request, res: Response) {
    const id: number  = Number(req.params.id)
    if (isNaN(id)) {
        res.status(400).json({message: 'Id must be a number'})
    } else {
        const mentorshipAgreement = getMentorshipAgreement(id)
        res.status(200).json(mentorshipAgreement)
        
    }

}

export function handlePostMentorshipAgreement (req: Request, res: Response) {
    const mentorshipAgreement: MentorshipAgreement = req.body
    const newMentorshipAgreement = createMentorshipAgreement(mentorshipAgreement)
    if (newMentorshipAgreement) {
        res.status(200).json(newMentorshipAgreement)
    } else {
        res.status(400).json({message: 'Mandatory data: studentId, startDate, expectedEndDate, syncClassesAmount, agreedPayment. studentId must be of a valid, active student. Student must not already have an active agreement.'})
    }
}

export function handlePutMentorshipAgreement (req: Request, res: Response) {
    const id: number = Number(req.params.id)
    const mentorshipAgreementNewData = req.body

    if (isNaN(id)) {
        res.status(400).json({message: 'Id must be a number'})
    } else {
        const updatedMentorshipAgreement = updateMentorshipAgreement(id, mentorshipAgreementNewData)
        if (updatedMentorshipAgreement) {
            res.status(200).json(updatedMentorshipAgreement)
        } else {
            res.status(400).json({message: 'Id must be of a valid MentorshipAgreement'})
        }
    }
}

export function handleDeleteMentorshipAgreement (req: Request, res: Response) {
    const id: number = Number(req.params.id)
    if (isNaN(id)) {
        res.status(400).json({message: 'Id must be a number'})
    }
    const deletedMentorshipAgreement = deleteMentorshipAgreement(id)
    if (deletedMentorshipAgreement) {
        res.status(200).json(deletedMentorshipAgreement)
    } else {
        res.status(400).json({message: 'Id must be of a valid mentorshipAgreement'})
    }
}

export function handleGetMentorshipAgreementByStudentId (req: Request, res: Response) {
    const studentId: number = Number(req.params.id)
    const agreement = getMentorshipAgreementByStudentId(studentId)
    if (agreement) {
        res.status(200).json(agreement)
    } else {
        res.status(400).json({message: 'Id must be of a valid, active student with an active mentorshipAgreement'})
    }
}