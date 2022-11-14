/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/quizzes', 'QuizzesController.ShowAll')

Route.get('/getquiz/:id', 'QuizzesController.GetQuiz')

Route.get('/quiz/:id', 'QuizzesController.ShowOne')

Route.get('/search/:name', 'QuizzesController.Search')

Route.get('/categorys', 'QuizzesController.Categorys')

Route.get('/category/:category', 'QuizzesController.Category')

Route.get('/newestquizzes', 'QuizzesController.NewestQuizzes')

Route.post('/newquiz', 'QuizzesController.Create')

Route.get('/dashboard:/id', 'QuizzesController.Dashboard')

Route.get('/quizleadingscores/:quizID', 'QuizzesController.LeadingScores')

Route.put('/savescore', 'QuizzesController.savescore')

Route.post('/signin', 'AuthController.Signin')

Route.post('/register', 'AuthController.Register')

Route.post('/logout', 'AuthController.Logout')






