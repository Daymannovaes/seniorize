interface student {
    id: number
    name: string
    phone: string
    main_language?: string
    hired_seniority?: 'intern' | 'trainee' |'junior' | 'middle' | 'senior'
}