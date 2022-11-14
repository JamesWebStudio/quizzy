<template>
    <div>
        <h3>New Quiz</h3>
        <form>
            <div class="form-group mb-4">
                <label for="quizName">Quiz Name (8-30 characters)</label>
                <input type="text" name="quizName" class="form-control" v-model="store.newQuiz.quizName" required min="8" maxlength="30" @change="checkValidation">
                <span class="input-errors" v-for="(error, index) of v$.quizName.$errors" :key="index">
                    <div class="error-msg">{{ error.$message }}</div>
                </span>
            </div>
            <div class="form-group mb-4">
                <label for="description">Brief Description (max 100 characters)</label>
                <input type="text" name="description" class="form-control" v-model="store.newQuiz.quizDesc" required maxlength="100" @blur="checkValidation">
                <span class="input-errors" v-for="(error, index) of v$.quizCategory.$errors" :key="index">
                    <div class="error-msg">{{ error.$message }}</div>
                </span>
            </div>
            <div class="form-group mb-4">
                <label for="category">Quiz Category (max 30 characters)</label>
                <input type="text" name="category" class="form-control" v-model="store.newQuiz.quizCategory" required maxlength="30" @blur="checkValidation">
                <span class="input-errors" v-for="(error, index) of v$.quizDesc.$errors" :key="index">
                    <div class="error-msg">{{ error.$message }}</div>
                </span>
            </div>
            <div class="form-group mb-5 timed-section">
                <label for="myToggle" class="mr-3">Timed</label>
                <label for="myToggle" class="toggle">
                    <input type="checkbox" id="myToggle" class="toggle__input" v-model="store.newQuiz.timed">
                    <div class="toggle__fill"></div>
                </label>
                <div v-if="timed" id="ifTimed">
                    <label for="time">Time Limit (minutes)</label>
                    <input type="number" value="10">
                </div>
            </div>
            <div class="form-group mb-4">
                <NewQuestion />
            </div>
            <router-link to="review"><button type="submit">Review Quiz</button></router-link>
        </form>
    </div>
</template>

<script setup lang="ts">
    import axios from 'axios'
    import NewQuestion from '@/components/NewQuestion.vue'
    import useVuelidate from '@vuelidate/core'
    import { required, minLength, maxLength } from '@vuelidate/validators'
    import { reactive, ref, computed, onMounted, onBeforeMount } from 'vue'
    import { useQuizStore } from '@/stores/quiz'
    import { useRouter } from 'vue-router'

    const store = useQuizStore()
    const router = useRouter()
  
    let timed = ref<boolean>(false)  
    //let questionCount = ref<number>(10) 
    const data = reactive({
        quizName: <string>'',
        quizCategory: <string>'',
        quizDesc: <string>''
    })
    
    const rules = computed(() => {
        return {
            quizName: { required, minLength: minLength(8), maxLength: maxLength(30) },
            quizCategory: { required, maxlength:maxLength(30) },
            quizDesc: { required, maxLength: maxLength(100) }
        }
    })

    const v$ = useVuelidate(rules, data)

    async function checkValidation() {
        const validated = await v$.value.$validate()
        if(validated) {
            store.newQuiz.quizName = data.quizName
            store.newQuiz.quizCategory = data.quizCategory
            store.newQuiz.quizDesc = data.quizDesc
        }
    }

    onMounted(() => {
        const firstInput = document.getElementsByName('quizName')
        firstInput[0].focus()
    })

    onBeforeMount(() => {
        if(!store.user.username) { router.push('signin') }
    })
</script>

<style scoped>
div {
    color: white;
    max-width: 1000px;
}

#numberofquestions {
    width:150px;
    border-radius:5px;
}

.toggle {
  --width: 50px;
  --height: calc(var(--width) / 2);
  --border-radius: calc(var(--height) / 2);
  display: inline-block;
  cursor: pointer;
}

.toggle__input {
  display: none;
}

.toggle__fill {
  position: relative;
  width: var(--width);
  height: var(--height);
  border-radius: var(--border-radius);
  background: #dddddd;
  transition: background 0.2s;
}

.toggle__input:checked ~ .toggle__fill {
  background: var(--btn-gradient);
}

.toggle__fill::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  height: var(--height);
  width: var(--height);
  background: #ffffff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
  border-radius: var(--border-radius);
  transition: transform 0.2s;
}

.toggle__input:checked ~ .toggle__fill::after {
  transform: translateX(var(--height));
}

.timed-section {
    display:flex;
    max-width:600px;
    margin:0;
}

.timed-section > * {
    margin-right: 20px;
}

.timed-section div > * {
    margin-right: 15px;
}

#ifTimed > lable {
    margin-right: 20px;
}

</style>