const express = require('express');
const checkToken = require("../middleware/getUserFromToken");
const dbQuery = require("../config/dbQuery");
const router = express.Router();

router.post('/set', async (req, res) => {
    try {
        const user = await checkToken(req.body.token)
        if (!user) {
            const error = new Error
            error.message = "User not logged in"
            error.status = 403
            throw error
        }

        const results = req.body.results;

        //Checks if user already sent results for this quizz
        const sqlCheckResultsAlreadyExist = "SELECT id FROM results WHERE user_id = ? AND quiz_id = ?";
        const checkResult = await dbQuery(sqlCheckResultsAlreadyExist, [user.id, results[0].quiz_id])
        if (checkResult.length !== 0) {
            const error = new Error
            error.status = 409
            error.message = 'User already answered this Quiz'
            throw error
        }


        //For each answer sent by user: add a row in DB
        for (const result of results) {
            const sqlResult = "INSERT INTO results (user_id, quiz_id, question_id, answer_id) VALUES (?, ?, ?, ?)";
            await dbQuery(sqlResult, [user.id, result.quiz_id, result.question_id, result.answer_id])
        }

        //If everything worked, send status 200, if error: catch and send error report to user
        res.status(200).send({"message": "Results sent successfully"})
    } catch (error) {
        res.status(500).send({
            "status": error.status,
            "message": error.message
        });
    }
})

router.get('/:quiz_id', async (req, res) => {
    try {
        const response = {}

        const sqlQuiz = "SELECT * FROM quizz WHERE id = ?"
        const quiz = await dbQuery(sqlQuiz, [req.params.quiz_id])
        response.quiz = quiz[0]


        const sqlAllResultsByQuiz = "SELECT * FROM results WHERE quiz_id = ?";
        const allResultsByQuiz = await dbQuery(sqlAllResultsByQuiz, [req.params.quiz_id])
        response.total_answered = allResultsByQuiz.length
        let correctAnswers = 0
        for(const result of allResultsByQuiz) {
            const sqlAnswer = "SELECT is_correct from answers WHERE id = ?"
            const answer = await dbQuery(sqlAnswer, result.answer_id)
            correctAnswers += answer[0].is_correct
        }
        response.total_correct = correctAnswers
        response.questions = []

        const sqlQuestions = "SELECT id, text AS question FROM questions WHERE quiz_id = ?"
        const questions = await dbQuery(sqlQuestions, [response.quiz.id])
        for(const question of questions) {
            const questionResult = {}
            questionResult.question = question
            //TODO add total answered and total correct to question result
            const sqlQuestionsResults = "SELECT * from results WHERE question_id = ?"
            const questionsResults = await dbQuery(sqlQuestionsResults, [question.id])
            questionResult.total_answered = questionsResults.length
            let correctQuestionAnswer = 0
            for(const questionsResult of questionsResults) {
                const sqlQuestionAnswer = "SELECT is_correct FROM answers WHERE id = ?"
                const questionAnswer = await dbQuery(sqlQuestionAnswer, [questionsResult.answer_id])
                correctQuestionAnswer += questionAnswer[0].is_correct
            }
            questionResult.total_correct = correctQuestionAnswer
            questionResult.answers = []

            const sqlAnswersByQuestion = "SELECT * FROM answers WHERE question_id = ?"
            const answersByQuestion = await dbQuery(sqlAnswersByQuestion, [question.id])
            for(const answerByQuestion of answersByQuestion) {
                answerByQuestion.is_correct === 1 ? questionResult.correct_answer_id = answerByQuestion.id : null
                questionResult.answers.push({id: answerByQuestion.id, answer: answerByQuestion.text})
            }

            response.questions.push(questionResult)
        }

        res.status(200).json(response)
    } catch (error) {
        console.error(error.message)
        res.status(500).send({"message": error.message});
    }
})

router.get('/users/:quiz_id', async (req, res) => {
    //Sends array of users who took the quiz
    try {
        const response = {}
        const sqlQuiz = "SELECT * FROM quizz WHERE id = ?"
        const quiz = await dbQuery(sqlQuiz, [req.params.quiz_id])
        response.quiz = quiz[0]

        response.questions = []

        const sqlQuestions = "SELECT * FROM questions WHERE quiz_id = ?"
        const questions = await dbQuery(sqlQuestions, [req.params.quiz_id])

        for (const question of questions) {
            const sqlAnswers = "SELECT * FROM answers WHERE question_id = ?"
            const answers = await dbQuery(sqlAnswers, [question.id])
            const correctAnswerId = answers.filter(answer => answer.is_correct === 1)
            response.questions.question = {
                question: question,
                answers: answers,
                correctAnswerId: correctAnswerId[0].id,
            }
            //TODO REGLER TOUT CE BORDEL...
        }

        console.dir(response, {depth: 50})
        res.status(200).json(response)
    } catch (error) {
        console.error(error.message)
        res.status(500).send({"message": error.message});
    }
})

module.exports = router;