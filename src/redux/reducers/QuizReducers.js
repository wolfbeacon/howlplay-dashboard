import cloneDeep from "lodash/cloneDeep";

const group_default_state = {
    "user" : {
        expanded: false,
        name: "PEPSICO",
        icon: "/icons/A.jpg",
        quizzes: ["q123"]
    }
};

export const GroupReducer = (state=group_default_state, action) => {
    let newState = cloneDeep(state);
    switch (action.type) {
        case "GROUP_HEADER_CLICKED":
            newState[action.id].expanded = !newState[action.id].expanded;
            break;
        default:
            break;

    }
    return newState;
};

const quiz_default_state = {
    activeQuiz: null,
    activeQuizIndex: null,
    quizzes: []
};

export const QuizReducer = (state=quiz_default_state, action) => {
    let newState = cloneDeep(state);
    switch (action.type) {
        case "QUIZ_CLICKED":
            if (!action.error) {
                newState.activeQuiz = state.quizzes[action.payload];
                newState.activeQuiz.questions = JSON.parse(newState.activeQuiz.questions);
                newState.activeQuizIndex = action.payload;
            }
            break;
        case "QUIZ_CREATED":
            if (!action.error) {
                newState.quizzes.push(action.payload.data);
                alert(`Quiz Access Code is ${action.payload.data.code}`);
            }
            break;
        case "QUIZ_UPDATED":
            // for future error handling
            break;
        case "QUIZ_DELETED":
            if (!action.error) {
                if (newState.activeQuizIndex) {
                    newState.quizzes.splice(newState.activeQuizIndex, 1);
                }
                newState.activeQuiz = null;
                newState.activeQuizIndex = null;
            }
            break;
        case "GET_QUIZZES":
            if (!action.error) {
                console.log('GET QUIZZES', action.payload);
                newState.quizzes = action.payload.data;
            } else {
                console.log(action.error);
            }
            break;
        default:
            break;
    }
    return newState;
};
