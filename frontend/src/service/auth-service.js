const authService = {};

authService.login = async (user) => {
    try {
        let response = await fetch('http://localhost:3001/v1/api/auth/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        return await response.json()
    } catch(err) {
        console.log(err)
    }
}

authService.logout = async () => {
    try {
        let response = await fetch('/auth/logout/', { method: 'GET' })
        return await response.json()
    } catch(err) {
        console.log(err)
    }
}

export default authService;