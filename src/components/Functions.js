import axios from 'axios'

export const register = newUser => {
    return axios
        .post('http://localhost:4000/users/register', {
            first_name: newUser.firstname,
            last_name: newUser.lastname,
            email: newUser.email,
            password: newUser.password
        })
        .then(res => {
            console.log("Registered")
        })
}

export const login = user => {
    return axios
        .post('http://localhost:4000/users/login', {
            email: user.email,
            password: user.password
        })
        .then(res => {
                    
            localStorage.setItem('usertoken', res.data)
            return res.data
            
            

        })
        .catch(err => {
            
           console.log(err)
        })
}
