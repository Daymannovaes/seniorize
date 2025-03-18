export interface MentorshipAgreement {
    id: number
    studentId: number
    startDate: Date
    expectedEndDate: Date
    syncClassesAmount: number
    agreedPayment: number
    active: boolean
    deletedAt?: Date
}