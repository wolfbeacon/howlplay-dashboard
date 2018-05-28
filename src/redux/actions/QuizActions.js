import * as axios from "axios";

const quizEndpoint = axios.create(
    {
        baseURL: "http://localhost:8080",
        timeout: 1000,
        headers: {
            // contentType: "application/json"
        }
    }
);

export function groupHeaderClicked(id) {
    return {
        type: 'GROUP_HEADER_CLICKED',
        id: id
    }
}

export function quizClicked(index, quizId) {
    const promise = quizEndpoint.get(`/quiz/${quizId}`);
    return {
        type: 'QUIZ_CLICKED',
        payload: promise,
        meta: {index}
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

export function updateQuiz(quizData) {
    quizData.owner = "TestUser";
    const promise = quizEndpoint.patch(`/quiz/${quizData.id}`, quizData, {
        headers: {'Authorization': "bearer TestUser"}
    });
    return {
        type: "QUIZ_UPDATED",
        payload: promise
    }
}

export function deleteQuiz(quizData) {
    const promise = quizEndpoint.delete(`/quiz/${quizData.id}`, {
        headers: {'Authorization': "bearer TestUser"}
    });
    return {
        type: "QUIZ_DELETED",
        payload: promise
    }
}