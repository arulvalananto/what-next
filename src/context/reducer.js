export const initialState = {
    reminders: [],
};

// Action Types
export const actionTypes = {
    FETCH_REMINDERS: "FETCH_REMINDERS",
};

// Reducers
export const reducer = (state, action) => {
    switch (action.type) {
        case actionTypes.FETCH_REMINDERS:
            return {
                ...state,
                reminders: action.payload,
            };
        default:
            return state;
    }
};
