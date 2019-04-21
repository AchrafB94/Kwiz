import axios from 'axios'

export const register = newUser => {
    return axios
        .post('http://localhost:4000/users/register', {
            firstname: newUser.firstname,
            lastname: newUser.lastname,
            email: newUser.email,
            password: newUser.password,
            schoolId: newUser.schoolId,
            birthdate: newUser.birthdate,
            gender: newUser.gender,
            phone: newUser.phone,
            levelId: newUser.levelId,
            class: newUser.class,
            district: newUser.district,
            city: newUser.city,
            province: newUser.province,
            image: newUser.image,
            
        })
        .then(res => {
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