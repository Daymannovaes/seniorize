import { Student } from '../../entities/students'

const students: Array<Student> = []

export function createStudent (student: Student): Student | null{
    const lastIndex = students.length
    
    if (!(student.name && student.phone)) {
        return null
    }
    const newStudent: Student = {
        id: lastIndex + 1,
        active: true,        
        name: student.name,
        phone: student.phone
    }
    if (student.mainProgrammingLanguage) {
        newStudent.mainProgrammingLanguage = student.mainProgrammingLanguage
    }
    if (student.hiredSeniority) {
        newStudent.hiredSeniority = student.hiredSeniority
    }
    students.push(newStudent)
    return newStudent
}

export function getSingleStudent(id: number): Student | null {
    const foundStudent = students.find((student) => student.id === id) // arrow function de uma linha tem o return implícito
    if (foundStudent) {
        return foundStudent
    }
    return null

}

export function updateStudent (id: number, studentNewData: Student): Student | null {
    
    const student = getSingleStudent(id)
    if (student) {
        if (studentNewData.name) {
            student.name = studentNewData.name
        }
        if (studentNewData.phone) {
            student.phone = studentNewData.phone
        }
        if (studentNewData.mainProgrammingLanguage) {
            student.mainProgrammingLanguage = studentNewData.mainProgrammingLanguage
        }
        if (studentNewData.hiredSeniority) {
            student.hiredSeniority = studentNewData.hiredSeniority
        }
        return student
    }
    return null
}

export function deleteStudent (id: number): Student | null {
    const student = getSingleStudent(id)
    if (student) {
        student.active = false
        student.deletedAt = new Date()
        return student
    }
    return null
}

export function getAllStudents() {
    return students
}

export function getActiveStudents(): Array<Student> {
    const activeStudents: Array<Student> = students.filter((student) => student.active === true)
    return activeStudents
}