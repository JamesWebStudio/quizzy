import { defineStore } from 'pinia'
import { ref, reactive } from 'vue'
import axios from 'axios'

type questionDataType = {
    question: string,
    correctAnswer: string,
    answerA: string,
    answerB: string,
    answerC: string,
    answerD: string
}

export const useQuizStore = defineStore({
  id: 'quizzes',
  state: () => ({
    user: reactive({
      id: undefined,
      username: '',
      firstname: '',
      lastname: '',
    }),
    categoryList: ref([]),
    categoriesList: ref([]),
    newestQuizzes: ref([]),
    quizIndex: ref(0),
    activeQuiz: ref(),
    quizMeta: ref(),
    errorMessage: '',
    quizResult: ref<Array<object>>([]),
    newQuiz: reactive({
      creator_id: undefined,
      creator: '',
      quizName: '',
      quizCategory: '',
      quizDesc: '',
      timed: false,
      time_limit: 0,
      questionCount: 0,
      questionData: <Array<questionDataType>>[],
    }),
    sidebarComponent: 'Members',
    searchedQuizList: reactive([])
  }),
  getters: {
    getAllInCategory(state) {
      return state.categoryList
    },
    getCategories(state) {
      return state.categoriesList
    },
    getNewestQuizzes(state) {
      return state.newestQuizzes
    },
    getQuizIndex(state) {
      return state.quizIndex
    },
    getActiveQuiz(state) {
      return state.activeQuiz
    },
    getQuizMeta(state) {
      return state.quizMeta
    },
    getSingleQuiz(state) {
      return state.activeQuiz
    },
    getSearchedQuizzes(state) {
      return state.searchedQuizList
    }
  },
  actions: {
    setCategoryList(category: string) {
      this.categoryList = []
      axios.get('http://127.0.0.1:3333/category/' + category)
      .then(data=> {
          this.categoryList = []
          for(let i = 0; i < data.data.length; i++) {
              this.categoryList.push(Object.values(data.data[i]))
          }
      })
      .catch(err => {
          console.log(err.message)
      })
    },
    setCategoriesList() {
      this.categoriesList = []
      axios.get('http://127.0.0.1:3333/categorys')
      .then(data => {
          this.categoriesList = []
          for(let i = 0; i < data.data.length; i++) {
              this.categoriesList.push(Object.values(data.data[i]).toString())
          }
      })
      .catch(err => {
          console.log(err.message)
          this.errorMessage = 'Unable to retrieve category list'
      })
    },
    setNewestQuizzes() {
      this.newestQuizzes = []
      axios.get('http://127.0.0.1:3333/newestquizzes')
      .then(data => {
        for(let i = 0; i < data.data.length; i++) {
          this.newestQuizzes.push(Object.values((data.data[i])))
        }
      })
      .catch(err => {
        this.errorMessage = 'Unable to retrieve latest quizzes'
      })
    },
    setActiveQuiz(id: number) {
      axios.get('http://localhost:3333/getquiz/' + id)
        .then(response => {
          this.activeQuiz = response.data
        })
        .catch(err => {
          console.log(err.message)
        })
    },
    setQuizMeta(index: number) {
      this.quizMeta = this.categoryList[this.quizIndex]
    },
    setQuizIndex(index: number) {
      this.quizIndex = index
    },
    setUser(user: object) {
      this.user = user
    },
    setSearchedQuizzes(quizList) {
      this.searchedQuizList = quizList
    },
    setQuizResult(result) {
      this.quizResult.push({
        question: result.value.question,
        correctanswer: result.value.correctAnswer,
        answer: result.value.answer
      })
    }
  }
})

// SELECT * FROM `quizzes`
// INNER JOIN questions 
// ON quizzes.id = questions.quiz_id
// INNER JOIN answers
// ON answers.question_id = questions.id
// WHERE quizzes.id = 1




