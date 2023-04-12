const login = async (user) => {
    try {
        let response = await fetch('/auth/login/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(user)
        })
        return await response.json()
    } catch(err) {
        console.log(err)
    }
}

const logout = async () => {
    try {
        let response = await fetch('/auth/logout/', { method: 'GET' })
        return await response.json()
    } catch(err) {
        console.log(err)
    }
}

export {
    login,
    logout
}
