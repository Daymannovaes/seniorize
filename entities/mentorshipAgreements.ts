export interface MentorshipAgreement {
    id: number
    student_id: number
    start_date: Date
    expected_end_date: Date
    sync_classes_amount: number
    agreed_payment: number
}