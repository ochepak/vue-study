import axios from 'axios';

export default {
    getUsers: () => axios.get('/api/users'),

    deleteUser: (id) => axios.delete('/api/users/id', {
        data: {
            id
        }
    }),

    updateUser: (_id, name, bio) => axios.patch('/api/users/id/' + _id, {
        name,
        bio
    })
};
