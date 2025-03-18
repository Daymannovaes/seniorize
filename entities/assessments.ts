export interface Assessment {
    id: number
    studentId: number
    createdAt: Date
    skills: Array<{
        skillId: number
        grade: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
    }>
}