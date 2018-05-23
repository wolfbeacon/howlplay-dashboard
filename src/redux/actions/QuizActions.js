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

export function quizClicked(quizID) {
    return {
        type: 'QUIZ_CLICKED',
        quizID: quizID,
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