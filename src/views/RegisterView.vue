<template>
    <div class="container mt-5">
        <div id="registration-section">
            <h2 class="mb-4">Register Now for FREE</h2>
            <p>Register for FREE to create your own public and private quizzes, keep a record of your scores and get on a leaderboard</p>
            <form class="mt-5" enctype="multipart/form-data" @submit.prevent="submit">
                <div class="mb-3" :class="{ error: v$.firstname.$errors.length }">
                    <label for="firstname" class="form-label">First Name*</label>
                    <input type="text" class="form-control" aria-describedby="firstname" v-model="state.firstname" placeholder="First name required" required>
                    <div class="input-errors" v-for="error of v$.firstname.$errors" :key="error.$uid">
                        <span class="validation-error-msg">{{ error.$message  }}</span>
                    </div>
                    <span v-if="v$.firstname.$error">{{ v$.firstname.$errors }}</span>
                </div>
                <div class="mb-3" :class="{ error: v$.lastname.$errors.length }">
                    <label for="lastname" class="form-label">Last Name*</label>
                    <input type="text" class="form-control" aria-describedby="lastname" v-model="state.lastname" placeholder="Last name required" required>
                    <div class="input-errors" v-for="error of v$.lastname.$errors" :key="error.$uid">
                        <span class="validation-error-msg">{{ error.$message }}</span>
                    </div>
                </div>
                <div class="mb-3" :class="{ error: v$.username.$errors.length }">
                    <label for="username" class="form-label">User Name* ( 4 - 30 Characters )</label>
                    <input type="text" class="form-control" aria-describedby="username" v-model="state.username" placeholder="User name required" required>
                    <div class="input-errors" v-for="error of v$.username.$errors" :key="error.$uid">
                    {{ v$.$errors.username }}
                        <span class="validation-error-msg">{{ error.$message }}</span>
                    </div>
                </div>
                <div class="mb-3" :class="{ error: v$.useremail.$errors.length }">
                    <label for="email" class="form-label">Email Address*</label>
                    <input type="email" class="form-control" id="email" aria-describedby="emailHelp" v-model="state.useremail" placeholder="Email required" required>
                    <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                    <div class="input-errors" v-for="error of v$.useremail.$errors" :key="error.$uid">
                        <span class="validation-error-msg">{{ error.$message }}</span>
                    </div>
                </div>
                <div class="mb-3" :class="{ error: v$.password.$errors.length }">
                    <label for="exampleInputPassword1" class="form-label">Password* ( min 8 Chararcters )</label>
                    <input type="password" class="form-control" id="exampleInputPassword1" v-model="state.password" placeholder="Password required" required>
                    <div class="input-errors" v-for="error of v$.password.$errors" :key="error.$uid">
                        <span class="validation-error-msg">{{ error.$message }}</span>
                    </div>
                </div>
                <div class="mb-3" :class="{ error: v$.confirmPassword.$errors.length }">
                    <label for="exampleInputPassword1" class="form-label">Confirm Password*</label>
                    <input type="password" class="form-control" id="exampleInputPassword1" v-model="state.confirmPassword" placeholder="Confirm password" required>
                    <div class="input-errors" v-for="error of v$.confirmPassword.$errors" :key="error.$uid">  
                        <span class="validation-error-msg">{{ error.$message }}</span>
                    </div>
                </div>
                <div class="mb-3 form-check">
                    <p style="margin-right: 20px;">* all fields required</p>
                    <input type="checkbox" class="form-check-input" id="exampleCheck1">
                    <label class="form-check-label" for="exampleCheck1">Remember Me</label>
                </div>
                <div v-if="errorMsg" style="color: red; text-align:center; margin-bottom: 10px;">{{ errorMsg }}</div>
                <button type="submit" class="btn submit-btn" :disabled="v$.$invalid">Submit</button>
            </form>
            <p style="color: white"> <!--  v-for="(error, index) of v$.$errors" :key="index"-->
                <!-- <strong>{{ error.$validator }}</strong>
                <small> on property</small>
                <strong>{{ error.$property }}</strong>
                <small> says:</small>
                <strong>{{ error.$message }}</strong> -->
                <!-- Validation Errors{{ v$.$errors - v$.confirmPassword.$errors }} -->
            </p>
        </div>
    </div>
</template>

<script lang="ts">
import { computed, reactive, ref } from 'vue'
import router from '@/router/index.js'
import useVuelidate from '@vuelidate/core'
import { required, email, minLength, sameAs, maxLength } from '@vuelidate/validators'
import axios from 'axios'

export default {
    setup() {
        const state = reactive({
            firstname: '',
            lastname: '',
            username: '',
            useremail:'',
            password: '',
            confirmPassword: ''
        })
        let errorMsg = ref('')
        const rules = computed(() => {  
            return {   
                firstname: { required },
                lastname: { required },
                username: { required, minLength:minLength(4), maxLength: maxLength(20) },
                useremail: { required, email },
                password: { required, minLength: minLength(8) },
                confirmPassword: { required, sameAs: sameAs(state.password) }
            }
        })

        async function submit() {
            await v$.value.$validate()
            axios.post('http://localhost:3333/register', { firstname: state.firstname, lastname: state.lastname, username: state.username, email: state.useremail, password: state.password  })
            .then(data => {
                router.push('/')
            })
            .catch(err => {
                console.error(err.message)
                errorMsg.value = `Unable to Register - ${err.message}`
            })
        }

        const v$ = useVuelidate(rules, state)

        return {
            v$, state, errorMsg, submit
        }
    }
}
</script>

<style scoped>
.container {
    color: white;
    display:flex;
    flex-wrap: wrap;
    justify-content: flex-start;
}

#view {
  text-align:left;
}
.validation-error-msg {
    color: red;
}
</style>