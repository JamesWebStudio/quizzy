<template>
  <div class="container mt-5">
    <div id="signin-section">
        <h2 class="mb-4">Sign In</h2>
        <form class="mt-5">
            <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Email address</label>
                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" v-model="v$.form.email.$model" placeholder="registered email">
                <div class="input-errors" v-for="(error, index) of v$.form.email.$errors" :key="index">
                    <div class="error-msg">{{ error.$message }}</div>
                </div>
                <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Password</label>
                <input type="password" class="form-control" id="exampleInputPassword1" v-model="v$.form.password.$model" placeholder="password">
                <div class="input-errors" v-for="(error, index) of v$.form.password.$errors" :key="index">
                    <div class="error-msg">{{ error.$message }}</div>
                </div>
            </div>
            <span v-if="signInError" id="error-display">{{ signInError }}</span>
            <button type="submit" class="btn submit-btn mt-4" :disabled="v$.form.$invalid" @click.prevent="submit">Sign In</button>
        </form>
      </div> 
    </div>
  </template>

<script lang="ts">
import axios from 'axios'
import { useQuizStore } from '@/stores/quiz'
import useVuelidate from '@vuelidate/core'
import { required, email, minLength } from '@vuelidate/validators'
// import { remember } from '../composables/remember'
import { submit } from '../composables/submit'
import router from '@/router'

export default {
  setup () {
    return { v$: useVuelidate(), submit }
  },
  data() {
    return {
      store: useQuizStore(),
      signInError: '',
      form: {
        email: '',
        password: '',
      }
    }
  },
  methods: {
    submit() {
      axios.post('http://localhost:3333/signin', { email: this.form.email, password: this.form.password })
      .then(user => {
        this.store.setUser(user.data)
        sessionStorage.setItem('QUIZZY_USER', user.data.token.token)
        this.signInError = ''
        router.push('/')
      })
      .catch(err => {
        this.signInError = 'User credentials not found'
      })
    }
  },
  validations() {
    return {
      form: {
        email: {
           required, email 
        },
        password: {
            required, 
            min: minLength(6)
        }
      }
    }
  }

}
</script>

<style scoped>
@import url(@/assets/base.css);

.container {
  color: white;
  display:flex;
  flex-direction:column;
  align-items:center;
}

#error-display {
  color: red;
  margin-top:5px;
}

#view {
  text-align:left;
}


</style>