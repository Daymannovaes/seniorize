interface User {
    id: number
    name: string
    email: string
    phoneNumber: string
    mainLanguage: string
    seniority: string
}

const users: Array<User> = []

function createUser(user: User): User {
    user.id = users.length + 1
    users.push(user)
    return user
}

function getUser(id: number): User | null {
    for (let user of users) {
        console.log('Entrou no for')
        if (user.id === id) {
            console.log('Atendeu o if')
            return user
        }
    }
    return null
}

function updateUser(id: number, upToDateUser: User): User | null {
    for (let user of users) {
        if (user.id === id) {
            user.name = upToDateUser.name
            user.email = upToDateUser.email
            user.phoneNumber = upToDateUser.phoneNumber
            user.mainLanguage = upToDateUser.mainLanguage
            user.seniority = upToDateUser.seniority
            return user
        }
    }
    return null
}

function deleteUser(id: number) {
    let index: number = 0
    let indexToDelete: number = -1
    for (let user of users) {
        if (user.id === id) {
            indexToDelete = index
            break
        }
        index++
    }
    if (indexToDelete !== -1) {
        users.splice(indexToDelete, 1)
    } else {
        console.log(`No user has id = ${id}`)
    }
}   

module.exports = { createUser, getUser, updateUser, deleteUser }