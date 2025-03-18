export interface Student {
    id: number
    name: string
    phone: string
    mainProgrammingLanguage?: string
    hiredSeniority?: 'intern' | 'trainee' |'junior' | 'middle' | 'senior'
    active: boolean
    deletedAt?: Date
}