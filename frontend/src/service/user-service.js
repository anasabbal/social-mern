const userService = {};

userService.create = async (user) => {
    try {
        let response = await fetch('http://localhost:3001/v1/api/users', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        console.log(response);
        return await response.json();
    }catch (err){
        console.log(err);
    }
}

userService.list = async (signal) => {
    try {
        let response = await fetch('http://localhost:3001/v1/api/users', {
            method: 'GET',
            signal: signal,
        })
        return await response.json()
    } catch(err) {
        console.log(err)
    }
}
userService.read = async (params, credentials, signal) => {
    try {
        console.log("Params User Id: ",params.userId)
        let response = await fetch('http://localhost:3001/v1/api/users/' + params.userId, {
            method: 'GET',
            signal: signal,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + credentials.t
            }
        })
        console.log(signal);
        console.log(credentials.t);
        console.log(response);
        return await response.json()
    } catch(err) {
        console.log(err)
    }
}

userService.update = async (params, credentials, user) => {
    try {
        let response = await fetch('http://localhost:3001/v1/api/users/' + params.userId, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + credentials.t
            },
            body: JSON.stringify(user)
        })
        return await response.json()
    } catch(err) {
        console.log(err)
    }
}

userService.remove = async (params, credentials) => {
    try {
        let response = await fetch('http://localhost:3001/v1/api/users/' + params.userId, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + credentials.t
            }
        })
        return await response.json()
    } catch(err) {
        console.log(err)
    }
}
userService.follow = async (params, credentials, followId) => {
    try{
        let respone = await fetch('http://localhost:3001/v1/api/users/follow/', {
            method: 'PUT',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + credentials.t
            },
            body: JSON.stringify({userId: params.userId, followId: followId})
        })
        return await respone.json()
    }catch(err){
        console.log(err);
    }
}
userService.unfollow = async (params, credentials, unfollowId) => {
    try{
        let response = await fetch('http://localhost:3001/v1/api/users/unfollow/', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + credentials.t
            },
            body: JSON.stringify({userId: params.userId, unfollowId: unfollowId})
        })
        return await response.json();
    }catch(err){
        console.log(err);
    }
}
export default userService;
