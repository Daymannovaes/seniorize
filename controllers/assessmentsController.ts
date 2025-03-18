import { Request, Response } from 'express'
import { Assessment } from '../entities/assessments'
import { createAssessment, getAllStudentAssessments, getAssessment } from '../domain/assessments'

export function handleGetAssessment (req: Request, res: Response) {
    const id = Number(req.params.id)
    if (isNaN(id)) {
        res.status(400).json({message: 'Id must be a number'})
    }
    const assessment = getAssessment(id)
    if (assessment) {
        res.status(200).json(assessment)
    } else {
        res.status(400).json({message: 'Id must be of a valid assessment'})
    }
}

export function handlePostAssessment (req: Request, res: Response) {
    const newAssessment = createAssessment(req.body)
    if (newAssessment) {
        res.status(200).json(newAssessment)
    } else {
        res.status(400).json({message: 'Mandatory data: valid studentId, valid skill Ids and valid Skill grades'})
    }
}

export function handleGetStudentAssessmentsByStudentId (req: Request, res: Response) {
    const studentId: number = Number(req.params.id)
    const assessments = getAllStudentAssessments(studentId)
    if (assessments) {
        res.status(200).json(assessments)
    } else {
        res.status(400).json({message: 'Student id must be of a valid student'})
    }
}
