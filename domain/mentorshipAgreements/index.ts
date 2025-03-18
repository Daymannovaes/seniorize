import { MentorshipAgreement } from '../../entities/mentorshipAgreements'
import { getSingleStudent } from '../students'

const mentorshipAgreements: Array<MentorshipAgreement> = []

export function createMentorshipAgreement (mentorshipAgreement: MentorshipAgreement): MentorshipAgreement | null {
    const studentId = Number(mentorshipAgreement.studentId)
    const student = getSingleStudent(studentId)
    if (student && student.active) {
        const alreadyHasActiveAgreement = getMentorshipAgreementByStudentId(studentId)
        if (alreadyHasActiveAgreement) {
            return null
        }
        if (mentorshipAgreement.startDate && mentorshipAgreement.expectedEndDate && mentorshipAgreement.syncClassesAmount && mentorshipAgreement.agreedPayment) {
            const newMentorshipAgreement: MentorshipAgreement = {
                id: mentorshipAgreements.length + 1,
                studentId: studentId,
                active: true,
                startDate: mentorshipAgreement.startDate,
                expectedEndDate: mentorshipAgreement.expectedEndDate,
                syncClassesAmount: mentorshipAgreement.syncClassesAmount,
                agreedPayment: mentorshipAgreement.agreedPayment
            }

            mentorshipAgreements.push(newMentorshipAgreement)
            return newMentorshipAgreement
        }
    }
    return null
}

export function getMentorshipAgreement (id: number): MentorshipAgreement | null {
    const foundAgreement = mentorshipAgreements.find((agreement: MentorshipAgreement) => agreement.id === id)
    if (foundAgreement && foundAgreement.active) {
        return foundAgreement
    }
    return null
}

export function updateMentorshipAgreement (id: number, agreementNewData: MentorshipAgreement): MentorshipAgreement | null {
    const mentorshipAgreement = getMentorshipAgreement(id)
    if (mentorshipAgreement) {
        if (agreementNewData.startDate) mentorshipAgreement.startDate = agreementNewData.startDate
        if (agreementNewData.expectedEndDate) mentorshipAgreement.expectedEndDate = agreementNewData.expectedEndDate
        if (agreementNewData.syncClassesAmount) mentorshipAgreement.syncClassesAmount = agreementNewData.syncClassesAmount
        if (agreementNewData.agreedPayment) mentorshipAgreement.agreedPayment = agreementNewData.agreedPayment
        return mentorshipAgreement
    }
    return null
}

export function deleteMentorshipAgreement (id: number): MentorshipAgreement | null {
    const agreementToDelete = getMentorshipAgreement(id)
    if (agreementToDelete) {
        agreementToDelete.active = false
        agreementToDelete.deletedAt = new Date()
        return agreementToDelete
    }
    return null
}

export function getMentorshipAgreementByStudentId (studentId: number): MentorshipAgreement | null {
    const student = getSingleStudent(studentId)
    if (student) {
        const agreement = mentorshipAgreements.find((agreement) => agreement.studentId === studentId && agreement.active)
        if (agreement) {
            return agreement
        }
    }
    return null
}