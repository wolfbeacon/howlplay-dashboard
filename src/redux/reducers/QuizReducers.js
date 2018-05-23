import cloneDeep from "lodash/cloneDeep";

const group_default_state = {
    "user" : {
        expanded: false,
        name: "Hackathon1",
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
    quizzes: []
};

export const QuizReducer = (state=quiz_default_state, action) => {
    let newState = cloneDeep(state);
    switch (action.type) {
        case "QUIZ_CLICKED":
            newState.activeQuiz = newState.quizzes[action.quizIndex];
            break;
        case "QUIZ_CREATED":
            if (!action.error) {
                newState.quizzes.push(action.payload.data);
                newState.activeQuiz = action.payload.data
            }
            break;
        case "GET_QUIZZES":
            if (!action.error) {
                newState.quizzes = action.payload.data
            }
            break;
        default:
            break;
    }
    return newState;
};
