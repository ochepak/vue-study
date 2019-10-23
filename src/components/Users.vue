<template>
    <div>
        <md-dialog :md-active.sync="showEditDialog">
            <Edit :user="activeUser" @closeDialog="onUserUpdate($event)"></Edit>
        </md-dialog>

        <md-table md-card>
            <md-table-toolbar>
                <h1 class="md-title">Users list</h1>
                <md-button class="md-primary md-icon-button" @click="logout">
                    <md-icon>open_in_browser</md-icon>
                    <md-tooltip md-direction="left">Logout</md-tooltip>
                </md-button>
            </md-table-toolbar>

            <md-table-row>
                <md-table-head md-numeric>ID</md-table-head>
                <md-table-head>Name</md-table-head>
                <md-table-head>Bio</md-table-head>
                <md-table-head>Email</md-table-head>
            </md-table-row>

            <md-table-row v-for="(user, i) in users" v-bind:key="user._id">
                <md-table-cell md-numeric>{{i + 1}}</md-table-cell>
                <md-table-cell>{{user.name}}</md-table-cell>
                <md-table-cell>{{user.bio}}</md-table-cell>
                <md-table-cell>{{user.email}}</md-table-cell>
                <md-table-cell>
                    <md-menu md-direction="bottom-start">
                        <md-button md-menu-trigger class="md-icon-button md-primary">
                            <md-icon>settings</md-icon>
                        </md-button>

                        <md-menu-content>
                            <md-menu-item @click="showDialog(user)">Edit</md-menu-item>
                            <md-menu-item @click="deleteUser(user._id, i, user.email)">Delete</md-menu-item>
                        </md-menu-content>
                    </md-menu>
                </md-table-cell>
            </md-table-row>
        </md-table>
    </div>
</template>

<script>
    import Edit from "@/components/Edit";

    export default {
        name: "Users",
        components: {Edit},
        data: () => {
            return {
                users: [],
                showEditDialog: false,
                activeUser: null
            }
        },
        beforeCreate: function () {
            this.$http.get('api/users')
                .then(res => {
                    this.users = res.body;
                });
        },
        methods: {
            logout() {
                this.$http.get('api/users/logout')
                    .then(() => {
                        localStorage.removeItem('accessToken');
                        localStorage.removeItem('email');
                        this.$router.push({path: '/login'});
                    });
            },
            showDialog(user) {
                this.activeUser = user;
                this.showEditDialog = true;
            },
            deleteUser(_id, index, email) {
                if (email === localStorage.getItem('email')) {
                    this.$toasted.show('You cannot delete your account', {
                        type: 'error'
                    });
                    return;
                }
                this.$http.delete('api/users/id', {
                    body: {
                        id: _id
                    }
                }).then(() => {
                    this.users.splice(index, 1);
                    this.$toasted.show('User was removed', {
                        type: 'success'
                    });
                });
            },
            onUserUpdate(updated) {
                this.showEditDialog = false;
                if (updated) {
                    this.$http.get('api/users')
                        .then(res => {
                            this.users = res.body;
                        });
                }
            }
        }
    }
</script>

<style scoped>
</style>
