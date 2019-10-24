import axios from 'axios';

export default {
    login: (email, password) => axios.post('/auth/login', {
        email,
        password
    }),

    logout: () => axios.get('/api/users/logout'),

    registration: (name, email, password) => axios.post('/auth/registration', {
        name,
        email,
        password
    })
};
