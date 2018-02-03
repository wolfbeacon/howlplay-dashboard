export function groupHeaderClicked(id) {
    return {
        type: 'GROUP_HEADER_CLICKED',
        id: id
    }
}

export function quizClicked(groupID, quizID) {
    return {
        type: 'QUIZ_CLICKED',
        quizID: quizID,
        groupID: groupID
    }
}