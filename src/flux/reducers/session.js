export default (state, action) => {
    switch (action.type) {
        case "authentication.registered":
            return { ...state, user: action.user };
        case "authentication.authenticated":
            return { ...state, user: action.user };
        case "authentication.unauthenticated":
            return { ...state, user: null };
    }
    return state;
};
