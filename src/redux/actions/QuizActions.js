import * as axios from "axios";

const quizEndpoint = axios.create(
    {
        baseURL: "http://localhost:8080",
        timeout: 1000,
        headers: {
            contentType: "application/json"
        }
    }
);

export function groupHeaderClicked(id) {
    return {
        type: 'GROUP_HEADER_CLICKED',
        id: id
    }
}

export function quizClicked(quizIndex) {
    return {
        type: 'QUIZ_CLICKED',
        quizIndex: quizIndex
    }
}

export function createQuiz(quizData) {
    quizData.owner = "TestUser";
    const promise = quizEndpoint.post('/quiz', quizData);
    return {
        type: "QUIZ_CREATED",
        payload: promise
    }
}

export function getQuizzes(userID) {
    const promise = quizEndpoint.get(`/quizzes/${userID}`);
    return {
        type: "GET_QUIZZES",
        payload: promise
    }
}