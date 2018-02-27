import cloneDeep from "lodash/cloneDeep";

const group_default_state = {
    "abc" : {
        expanded: false,
        name: "Hackathon1",
        icon: "/icons/A.jpg",
        quizzes: ["q123"]
    },
    "123" : {
        expanded: false,
        name: "Hackathon2",
        icon: "/icons/Fox.jpg",
        quizzes: ["qabc"]
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
    quizzes: {
        "q123": {
            name: "TestQuiz1",
            group: "abc"
        },
        "qabc": {
            name: "TestQuiz2",
            group: "123"
        }
    }
};

export const QuizReducer = (state=quiz_default_state, action) => {
    let newState = cloneDeep(state);
    switch (action.type) {
        case "QUIZ_CLICKED":
            newState.activeQuiz = newState.quizzes[action.quizID];
            break;
        default:
            break;
    }
    return newState;
};
