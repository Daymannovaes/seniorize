export interface Student {
    id: number
    name: string
    phone: string
    main_programming_language?: string
    hired_seniority?: 'intern' | 'trainee' |'junior' | 'middle' | 'senior'
    active: boolean
    deleted_at?: Date
}