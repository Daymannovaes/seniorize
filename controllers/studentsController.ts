import { Request, Response } from 'express'
import { createStudent, deleteStudent, getActiveStudents, getAllStudents, getSingleStudent, updateStudent } from '../domain/students'
import { Student } from '../entities/students'

export function handleGetSingleStudent (req: Request, res: Response) {
    const id: number = Number(req.params.id)
    if (isNaN(id)) {
        res.status(400).json({message: 'Id must be a number'})
    } else {
        const student = getSingleStudent(id)
        res.status(200).json(student)
    }
}

export function handlePostStudents (req: Request, res: Response) {
    const student: Student = req.body
    const newStudent = createStudent(student)
    if (newStudent) {
        res.status(200).json(newStudent)
    } else {
        res.status(400).json({message: 'Mandatory data: name, phone'})
    }
}

export function handlePutStudents (req: Request, res: Response) {
    const id = Number(req.params.id)
    const student = req.body

    if (isNaN(id)) {
        res.status(400).json({message: 'Id must be a number'})
    } else {
        const updatedStudent = updateStudent(id, student)
        res.status(200).json(updatedStudent)
    }
}

export function handleDeleteStudents (req: Request, res: Response) {
    const id = Number(req.params.id)
    if (isNaN(id)) {
        res.status(400).json({message: 'Id must be a number'})
    } else {
        const deletedStudent = deleteStudent(id)
        res.status(200).json(deletedStudent)
    }
}

export function handleGetStudents (req: Request, res: Response) {
    const students = getAllStudents()
    res.status(200).json(students)
}

export function handleGetActiveStudents (req: Request, res: Response) {
    const activeStudents = getActiveStudents()
    res.status(200).json(activeStudents)
}