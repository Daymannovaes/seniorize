import { Assessment } from "../../entities/assessments";
import { Skill } from "../../entities/skills";
import { getSingleStudent } from "../students";

const skills: Array<Skill> = [
    {id: 1,  name: 'understand http protocol',                  category: 'internet'},
    {id: 2,  name: 'understand tcp/ip protocol',                category: 'internet'},
    {id: 3,  name: 'understand rest, soad',                     category: 'internet'},
    {id: 4,  name: 'processes',                                 category: 'os'},
    {id: 5,  name: 'ports and sockets',                         category: 'os'},
    {id: 6,  name: 'filestream',                                category: 'os'},
    {id: 7,  name: 'web component',                             category: 'basics of html'},
    {id: 8,  name: 'container vs element positioning',          category: 'basics of html'},
    {id: 9,  name: 'container rules: grid, flex, etc',          category: 'basics of html'},
    {id: 10, name: 'chrome network tab',                        category: 'dev tools'},
    {id: 11, name: 'html inspect',                              category: 'dev tools'},
    {id: 12, name: 'css inspect',                               category: 'dev tools'},
    {id: 13, name: 'break points, inspect call stack, etc',     category: 'dev tools'},
    {id: 14, name: 'git branch, git add, git commit, git push', category: 'basics of unix'},
    {id: 15, name: 'curl',                                      category: 'basics of unix'},
    {id: 16, name: 'npm, npx, node',                            category: 'basics of unix'},
    {id: 17, name: 'ssh',                                       category: 'basics of unix'}
]

const assessments: Array<Assessment> = []

export function createAssessment (assessment: Assessment): Assessment | null {
    const student = getSingleStudent(assessment.studentId)
    if (student) {
        const newAssessment: Assessment = {
            id: assessments.length + 1,
            studentId: assessment.studentId,
            createdAt: new Date()
        }
        const skillsAreValid = assessment.skills?.every((skill) => isValidSkillId(skill.skillId) && Number(skill.grade) <= 10 && Number(skill.grade) >= 0)
        if (skillsAreValid) {
            newAssessment.skills = assessment.skills
            assessments.push(newAssessment)
            return newAssessment
        }
    }
    return null
}

function isValidSkillId (possibleId: number): boolean {
    return skills.some((skill) => skill.id === possibleId) 
}

export function getAssessment (id: number): Assessment | null {
    const foundAssessment = assessments.find((assessment) => assessment.id === id)
    if (foundAssessment) {
        return foundAssessment
    }
    return null
}

export function getAllStudentAssessments (studentId: number): Array<Assessment> | null {
    const student = getSingleStudent(studentId)
    if (student) {
        const studentAssessments = assessments.filter((assessment) => assessment.studentId === studentId)
        if (studentAssessments) {
            return studentAssessments
        }
}
    return null
}