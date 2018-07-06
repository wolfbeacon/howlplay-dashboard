import * as axios from "axios";

export function groupHeaderClicked(id) {
    return {
        type: 'GROUP_HEADER_CLICKED',
        id: id
    }
}

export function quizClicked(quizId) {
    return {
        type: 'QUIZ_CLICKED',
        payload: quizId,
    }
}

export function createQuiz(quizData) {
    quizData.owner = 1;
    const promise = axios.post('/quiz', quizData);
    return {
        type: "QUIZ_CREATED",
        payload: promise
    }
}

export function getQuizzes() {
    const promise = axios.get('/quizzes');

    return {
        type: "GET_QUIZZES",
        payload: promise
    }
}

export function updateQuiz(quizData) {
    quizData.owner = "TestUser";
    const promise = axios.patch(`/quiz/${quizData.id}`, quizData, {
    });
    return {
        type: "QUIZ_UPDATED",
        payload: promise
    }
}

export function deleteQuiz(quizData) {
    const promise = axios.delete(`/quiz/${quizData.id}`, {
    });
    return {
        type: "QUIZ_DELETED",
        payload: promise
    }
}
