export interface Quiz {
    id?: number
    title: string
    description: string
    questions: Question[]
    creator_id?: number
    created_at?: string
}

export interface Question {
    id?: number
    question: string
    correct_answer?: number
    answers: Answer[]
}

export interface Answer {
    id?: number
    answer: string
}

export interface User {
    id: number
    username: string
    role: string,
    created_at?: string
}

export interface Result {
    user_id?: number
    quiz_id: number
    question_id: number
    answer_id: number
}

export interface QuizResults {
    quiz: Quiz
    questions: QuestionResults[]

    total_answered: number
    total_correct: number
}

export interface QuestionResults {
    question: Question
    answers: Answer[]
    correct_answer_id: number

    total_answered?: number
    total_correct?: number
}

export interface QuizUsersResults {
    quiz: Quiz

    questions: QuestionResults[]
    users: UsersResults[]
}

export interface UsersResults {
    user: User
    results: Result[]
}
