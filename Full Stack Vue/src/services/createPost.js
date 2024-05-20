import ifAuthenticated from "../router/index"

const createPost = (text) => {
    return fetch("http://localhost:3333/posts",

        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-Authorization": localStorage.getItem("session_token")
            },
            body: JSON.stringify({
                "text": text
            })
        })
        .then(response => {
            if (response.status === 201) {
                return response.json();
            }
            else { throw "Something went wrong" }
        })
        .catch(err => {
            console(err);
            return Promise.reject(err)
        })
}

const getSinglePost =(post_id)=>{
    return fetch("http://localhost:3333/posts/" + post_id)
    .then((response)=>{
        if(response.status === 200){
            return response.json();
        }
        else{
            throw"Something went wrong"
        }
    })
    .then((resJson)=>{
        return resJson
    })
    .catch((error)=>{
        console.log("Err", error)
        return Promise.reject(error)
    })
}

const like =(postId) =>{
    return fetch(`http://localhost:3333/posts/${postId}/like`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-Authorization": localStorage.getItem("session_token")
        }
    })
    .then(response => {
        if (response.status === 200) {
            console.log("Post Liked");
            
        } else {
            alert("Something went wrong");
        }
    })
    .catch(err => {
        console.error(err);
        return Promise.reject(err);
    });

}

const removeLike =(postId) =>{
    return fetch(`http://localhost:3333/posts/${postId}/like`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "X-Authorization": localStorage.getItem("session_token")
        }
    })
    .then(response => {
        if (response.status === 200) {
            console.log("Like Removed");
            
        } else {
            alert("Something went wrong");
        }
    })
    .catch(err => {
        console.error(err);
        return Promise.reject(err);
    });

}

const deletePost = (postId) => {
   

    return fetch(`http://localhost:3333/posts/${postId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "X-Authorization": localStorage.getItem("session_token")
        }
    })
    .then(response => {
        if (response.status === 200) {
            console.log("Post deleted successfully");
            
        } else {
            alert("Something went wrong");
        }
    })
    .catch(err => {
        console.error(err);
        return Promise.reject(err);
    });
}



export const createService ={
    createPost,
    getSinglePost,
    deletePost,
    like:like,
    removeLike:removeLike
}