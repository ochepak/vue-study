<template>
    <div>
        <form novalidate>

            <md-card-content>
                <md-field :class="{'md-invalid': $v.form.name.$error}">
                    <label for="name">Name</label>
                    <md-input type="text" name="name" id="name" v-model="$v.form.name.$model"/>
                    <span class="md-error" v-if="!$v.form.name.required">Name is required</span>
                </md-field>
                <md-field :class="{'md-invalid': $v.form.bio.$error}">
                    <label for="bio">Bio</label>
                    <md-textarea name="bio" id="bio" v-model="$v.form.bio.$model"/>
                    <span class="md-error" v-if="!$v.form.bio.maxLength">Max length is 256 characters</span>
                </md-field>
            </md-card-content>

            <md-card-actions>
                <md-button @click.prevent="closeWindow(false)"
                           class="md-accent">Cancel
                </md-button>
                <md-button type="submit" class="md-primary"
                           @click.prevent="validateUser"
                           :disabled="$v.$invalid">Save
                </md-button>
            </md-card-actions>
        </form>
    </div>
</template>

<script>
    import {validationMixin} from 'vuelidate'
    import {
        required,
        maxLength
    } from 'vuelidate/lib/validators';
    import {UPDATE_USER} from '@/store/types';

    export default {
        name: 'Edit',
        mixins: [validationMixin],
        data: () => ({
            form: {
                name: null,
                bio: null
            }
        }),
        props: {
            user: {
                type: Object,
                required: true
            }
        },
        validations: {
            form: {
                name: {
                    required
                },
                bio: {
                    maxLength: maxLength(256)
                }
            }
        },
        beforeMount: function () {
            this.form.name = this.user.name || null;
            this.form.bio = this.user.bio || null;
        },
        methods: {
            async updateUser() {
                try {
                    await this.$store.dispatch(UPDATE_USER, {
                        id: this.user._id,
                        name: this.form.name,
                        bio: this.form.bio
                    });
                    this.closeWindow(true);
                } catch (e) {
                    this.$toasted.show(e.message, {
                        type: 'error'
                    });
                }
            },
            validateUser() {
                if (!this.$v.$invalid) {
                    this.updateUser();
                }
            },
            closeWindow() {
                this.$emit('close-dialog');
            }
        }
    }
</script>

<style lang="scss" scoped>
</style>
