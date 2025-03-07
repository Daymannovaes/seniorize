import { Student } from '../../entities/students'

const students: Array<Student> = [] //isso deveria mesmo ficar nesse arquivo, ou tem um lugar melhor?

export function createStudent (student: Student): Student | null{
    const last_index = students.length
    
    if (!(student.name && student.phone)) {
        return null
    }
    const new_student: Student = {
        id: last_index + 1,
        active: true,        
        name: student.name,
        phone: student.phone
    }
    if (student.main_programming_language) {
        new_student.main_programming_language = student.main_programming_language
    }
    if (student.hired_seniority) {
        new_student.hired_seniority = student.hired_seniority
    }
    students.push(new_student)
    return new_student
}

export function getSingleStudent(id: number): Student | null {
    for (let student of students) { // tem alguma forma mais otimizada pra fazer isso?
        if (student.id === id) {
            return student
        }
    }
    return null
}

export function updateStudent (id: number, student_new_data: Student): Student | null {
    for (let student of students) {
        if (student.id === id) {
            if (student_new_data.name) {
                student.name = student_new_data.name
            }
            if (student_new_data.phone) {
                student.phone = student_new_data.phone
            }
            if (student_new_data.main_programming_language) {
                student.main_programming_language = student_new_data.main_programming_language
            }
            if (student_new_data.hired_seniority) {
                student.hired_seniority = student_new_data.hired_seniority
            }
            return student
        }
    }
    return null
}

export function deleteStudent (id: number): Student | null {
    for (let student of students) {
        if (student.id === id) {
            student.active = false
            student.deleted_at = new Date()
            return student            
        }
    }
    return null
}

export function getAllStudents() {
    return students
}

export function getActiveStudents(): Array<Student> {
    const active_students: Array<Student> = []
    for (let student of students) {
        if (student.active) {
            active_students.push(student) //tem uma forma mais otimizada de fazer isso?
        }
    }
    return active_students
}