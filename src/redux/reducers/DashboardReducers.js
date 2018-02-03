const navbar_default_state = {
    expanded: true,
    groups: ["abc", "123"] // array of group ids
};

export const DashboardNavbarReducer = (state=navbar_default_state, action) => {
    switch (action.type) {
    }
    return state;
};

