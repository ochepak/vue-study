import UsersService from '@/services/users.service';
import {DELETE_USER, GET_ALL_USERS, REMOVE_USER, SET_USERS, UPDATE_USER} from "@/store/types";

const state = {
    usersList: []
};

const getters = {
    getAllUsers: state => state.usersList
};

const actions = {
    [GET_ALL_USERS]: async ({commit}) => {
        const users = await UsersService.getUsers();
        if (users) {
            commit(SET_USERS, users.data);
        }
    },
    [UPDATE_USER]: async (context, {id, name, bio}) => {
        await UsersService.updateUser(id, name, bio);
        context.dispatch(GET_ALL_USERS);
    },
    [DELETE_USER]: async ({commit}, {id}) => {
        await UsersService.deleteUser(id);
        commit(REMOVE_USER, id);
    },
};

const mutations = {
    [SET_USERS]: (state, users) => {
        state.usersList = users;
    },
    [REMOVE_USER]: (state, id) => {
        const index = state.usersList.findIndex(user => user._id === id);
        if (index > -1) {
            state.usersList.splice(index, 1);
        }
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}
