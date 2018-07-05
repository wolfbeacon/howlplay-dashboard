import axios from "axios";

axios.defaults.withCredentials = true;


export function groupHeaderClicked(id) {
    return {
        type: 'GROUP_HEADER_CLICKED',
        id: id
    }
}

export function quizClicked(index, quizId) {
    const promise = axios.get(`/quiz/${quizId}`);
    return {
        type: 'QUIZ_CLICKED',
        payload: promise,
        meta: {index}
    }
}

export function createQuiz(quizData) {
    quizData.owner = 1;
    const promise = axios.post('/dashboard/quizzes', quizData);
    return {
        type: "QUIZ_CREATED",
        payload: promise
    }
}

export function getQuizzes() {
    const promise = axios.get('/quizzes', {
        withCredentials: true
    });

    return {
        type: "GET_QUIZZES",
        payload: promise
    }
}

export function updateQuiz(quizData) {
    quizData.owner = "TestUser";
    const promise = axios.patch(`/quiz/${quizData.id}`, quizData, {
        headers: {'Authorization': "bearer TestUser"}
    });
    return {
        type: "QUIZ_UPDATED",
        payload: promise
    }
}

export function deleteQuiz(quizData) {
    const promise = axios.delete(`/quiz/${quizData.id}`, {
        headers: {'Authorization': "bearer TestUser"}
    });
    return {
        type: "QUIZ_DELETED",
        payload: promise
    }
}
