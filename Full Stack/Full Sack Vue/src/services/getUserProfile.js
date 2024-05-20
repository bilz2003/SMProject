const getUserProfile = (user_id) => {
    return fetch("http://localhost:3333/users/" + user_id, {
        method: "GET",
        headers: {
            
            "Content-Type": "application/json",
        },
    })
        .then((response) => {
            if (response.status === 200) {
                return response.json();
            }
            else if (response.status === 404) {
                throw 'User not found';
            }
            else {
                throw "Something went wrong";
            }
        })

        .then((resJson) => {
            return resJson;
        })

        .catch((error) => {
            console.log("Err", error);
            return Promise.reject(error);
        });
}

const search = (query) => {
    return fetch("http://localhost:3333/search?q=" + query,
    {
        method: "GET",
        headers: {
            
            "Content-Type": "application/json",
        },
    })

    .then((response) => {
        if (response.status === 200) {
            return response.json();
        }
        else if (response.status === 404) {
            throw 'User not found';
        }
        else {
            throw "Something went wrong";
        }
    })

    .then((resJson) => {
        return resJson;
    })

    .catch((error) => {
        console.log("Err", error);
        return Promise.reject(error);
    });
}

export const postService={
    getUserProfile:getUserProfile,
    search:search
}

