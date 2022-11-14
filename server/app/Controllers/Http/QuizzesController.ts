// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
//import Quiz from '../Models/Quiz'
// import Route from '@ioc:Adonis/Core/Route'

export default class QuizzesController { // done
  public async ShowAll({ request }) {
    const limit = 20
    const page = request.input('page', 1)
    
    return (await Database.from('quizzes').select('*').orderBy('createdAt', 'desc').limit(limit).paginate(page, limit))
  }

  public async GetQuiz({ params }) {
    return (await Database.from('quizzes').join('questions', 'questions.quiz_id', '=', 'quizzes.id').join('answers', 'answers.question_id', '=', 'questions.id')
            .where('quizzes.id', '=', params.id))
    //return (await Database.from('quizzes').select('*').where('id', '=', params.id).first)
 }

  public async ShowOne({ params }) { 
    // return all questions and answers from a quiz
    return (await Database.from('questions').select('*').innerJoin('answers', 'answers.question_id', 'questions.id').where('quiz_id', params.id))
  }

  public async Search({ params }) {
    // Return all rows that are like search criteria
    let searchTerm = `%${params.name}%`
        
    const foundQuizzes = await Database.from('quizzes').where('name', 'LIKE', searchTerm)
    return foundQuizzes
  }

  public async Categorys() { 
    // Return distinct categorys list
    return (await Database.from('quizzes').select('category').orderBy('category').distinct())
  }

  public async Category({ params }) {
    // Return all quizzes in a category
    return (await Database.from('quizzes').select('*').where('category', params.category).orderBy('name'))
  }

  public async NewestQuizzes() {
    return (await Database.from('quizzes').select('*').orderBy('createdAt', 'desc').limit(10))
  }

  public async Create({ request }) {
    try {
      const data = request.all()
      
      let quizQuestionID = undefined
      const quiz_id = await Database.table('quizzes').insert({ name: data.quizName.toUpperCase(), category: data.quizCategory.toUpperCase(), description: data.quizDesc, count: data.questionCount, timed: false,
                                                               time_limit: null, creator_id: data.creator_id, creator: data.creator, createdAt: Date.now() })
           
      for(var i = 0; i <= data.questionData.length; i++) {                
        quizQuestionID = await Database.table('questions').insert({ quiz_id: quiz_id, question: data.questionData[i].question.toUpperCase(), correctanswer: data.questionData[i].correctAnswer })
        await Database.table('answers').insert({ question_id: quizQuestionID[0], answer: data.questionData[i].answerA }),
        await Database.table('answers').insert({ question_id: quizQuestionID[0], answer: data.questionData[i].answerB }),
        await Database.table('answers').insert({ question_id: quizQuestionID[0], answer: data.questionData[i].answerC }),
        await Database.table('answers').insert({ question_id: quizQuestionID[0], answer: data.questionData[i].answerD })
      }
    }
    catch(err) {
      console.log(err.message)
    }
  }

  public async Dashboard({ params }) {
    return (await Database.from('users', 'quizzes').where('users.id', params.id))

  }

  public async LeadingScores({ params }) {
    // get top 10 highest scores with users in quiz with quizID
    return (await Database.from('quizdata').select('*').where('quiz_id', params.quizID).orderBy('score', 'desc').limit(10))
  }

  public async savescore({request, response}) {
    const { id, user, score } = request.all()
    const data = await Database.from('quizdata').select('*').where('quiz_id', id).where('member', user).orderBy('score', 'desc').first()
    
    if(!data) {
      await Database.table('quizdata').insert({ quiz_id: id, member: user, score: score })
      response.status(200).send('Score Saved')
    }
    else {
      if(data.score < score) {
        try {
          // await Database.table('quizdata').insert({ quiz_id: id, member: user, score: score })
          await Database.from('quizdata').where('quiz_id', id).where('member', user).update({ score : score })
          response.status(200).send('Score Saved')
        }
        catch(err) {
          console.log(err.message)
          response.status(401).send('Server Error - Could not save new score')
        }
      }
      else {
        response.status(201).send('You already have a better or equal score')
      }
    }
  }
}
