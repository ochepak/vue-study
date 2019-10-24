<template>
    <div>
        <form novalidate class="md-layout" @submit.prevent="validateUser">
            <md-card class="md-layout-item md-size-40 md-small-size-60 md-xsmall-size-90">
                <md-card-header>
                    <div class="md-title">Sign in</div>
                </md-card-header>

                <md-card-content>
                    <md-field :class="{'md-invalid': $v.form.email.$error}">
                        <label for="email">Email</label>
                        <md-input type="email" name="email" id="email" v-model="$v.form.email.$model"/>
                        <span class="md-error" v-if="!$v.form.email.required">The email is required</span>
                        <span class="md-error" v-else-if="!$v.form.email.email">Invalid email</span>
                    </md-field>
                    <md-field :class="{'md-invalid': $v.form.password.$error}">
                        <label for="password">Password</label>
                        <md-input type="password" name="password" id="password" v-model="$v.form.password.$model"/>
                        <span class="md-error" v-if="!$v.form.password.required">The password is required</span>
                    </md-field>
                </md-card-content>

                <md-card-actions>
                    <router-link
                            to="/registration">
                        Create an account
                    </router-link>
                    <md-button type="submit" class="md-primary" :disabled="$v.$invalid">Sign in</md-button>
                </md-card-actions>
            </md-card>
        </form>
    </div>
</template>

<script>
    import {validationMixin} from 'vuelidate'
    import {
        required,
        email
    } from 'vuelidate/lib/validators'
    import AuthService from '../services/auth.service'

    export default {
        name: 'Login',
        mixins: [validationMixin],
        data() {
            return {
                form: {
                    email: null,
                    password: null
                }
            }
        },
        validations: {
            form: {
                email: {
                    required,
                    email
                }
                ,
                password: {
                    required
                }
            }
        }
        ,
        methods: {
            async login() {
                await AuthService.login(this.form.email, this.form.password)
                    .then(res => {
                        localStorage.setItem('accessToken', res.data.accessToken);
                        localStorage.setItem('email', this.form.email);
                        this.$router.push({path: '/users'});
                    })
                    .catch(error => {
                        this.$toasted.show(error.message, {
                            type: 'error'
                        });
                    });
            },
            validateUser() {
                if (!this.$v.$invalid) {
                    this.login();
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .md-card {
        margin: 10vh auto auto;

        &-actions {
            display: flex;
            justify-content: space-between;

            a {
                margin-left: 7px;
            }
        }
    }
</style>
