<template>
    <div>
        <form novalidate class="md-layout" @submit.prevent="validateUser">
            <md-card class="md-layout-item md-size-40 md-small-size-60 md-xsmall-size-90">
                <md-card-header>
                    <div class="md-title">Create an account</div>
                </md-card-header>

                <md-card-content>
                    <md-field :class="{'md-invalid': $v.form.name.$error}">
                        <label for="name">Name</label>
                        <md-input type="text" name="name" id="name" v-model="$v.form.name.$model"/>
                        <span class="md-error" v-if="!$v.form.email.required">The name is required</span>
                    </md-field>
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
                        <span class="md-error" v-else-if="!$v.form.password.maxlength">Minimal password length is 8 characters</span>
                    </md-field>
                </md-card-content>

                <md-card-actions>
                    <router-link
                            to="/login">
                        Already have an account?
                    </router-link>
                    <md-button type="submit" class="md-primary" :disabled="$v.$invalid">Create an account</md-button>
                </md-card-actions>
            </md-card>
        </form>
    </div>
</template>

<script>
    import {validationMixin} from 'vuelidate'
    import {
        required,
        minLength,
        email
    } from 'vuelidate/lib/validators'

    export default {
        name: 'Registration',
        mixins: [validationMixin],
        data: () => ({
            form: {
                name: null,
                email: null,
                password: null
            }
        }),
        validations: {
            form: {
                name: {
                    required
                },
                email: {
                    required,
                    email
                },
                password: {
                    minLength: minLength(8),
                    required
                }
            }
        },
        methods: {
            clearForm() {
                this.$v.$reset();
                this.form.name = null;
                this.form.email = null;
                this.form.password = null;
            },
            saveUser() {
                this.$http.post('auth/registration', this.form)
                    .then(() => {
                        this.$router.push({path: '/login'});
                        this.$toasted.show('User was successfully created', {
                            type: 'success'
                        });
                    }, err => {
                        this.clearForm();
                        // eslint-disable-next-line no-console
                        console.log(err);
                        if (err.status === 409) {
                            this.$toasted.show('User with this email already exists', {
                                type: 'error'
                            });
                        }
                    });
            },
            validateUser() {
                if (!this.$v.$invalid) {
                    this.saveUser();
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
