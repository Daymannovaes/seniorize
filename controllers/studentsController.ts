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
    const new_student = createStudent(student)
    if (new_student) {
        res.status(200).json(new_student)
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
        const updated_student = updateStudent(id, student)
        res.status(200).json(updated_student)
    }
}

export function handleDeleteStudents (req: Request, res: Response) {
    const id = Number(req.params.id)
    if (isNaN(id)) {
        res.status(400).json({message: 'Id must be a number'})
    } else {
        const deleted_student = deleteStudent(id)
        res.status(200).json(deleted_student)
    }
}

export function handleGetStudents (req: Request, res: Response) {
    const students = getAllStudents()
    res.status(200).json(students)
}

export function handleGetActiveStudents (req: Request, res: Response) {
    const active_students = getActiveStudents()
    res.status(200).json(active_students)
}