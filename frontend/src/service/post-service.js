const postService = {};

postService.create = async (params, credentials, post) => {
    try{
        let response = await fetch('http://localhost:3001/v1/api/post' + params.userId, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + credentials.t 
            },
            body: post
        });
        return await response.json();
    }catch(err){
        console.log(err);
    }
}
postService.listByUser = async (params, credentials) => {
    try{
        let response = await fetch('http://localhost:3001/v1/api/post/by' + params.userId, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + credentials.t
            }
        })
        return await response.json();
    }catch(err){
        console.log(err);
    }
}

export default postService;