export interface Assessment {
    id: number
    student_id: number
    created_at: Date
    skills: Array<{
        skill_id: number
        grade: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
    }>
}