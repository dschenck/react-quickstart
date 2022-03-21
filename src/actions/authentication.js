import store from "../flux/store";
import apis from "../apis";

const register = (user) => {
    return apis
        .register(user)
        .then((response) => {
            store.handle({
                type: "authentication.registered",
                user: response.data,
            });
            return Promise.resolve(response);
        })
        .catch((response) => {
            return Promise.reject(response);
        });
};

const login = (credentials) => {
    return apis.auth
        .authenticate(credentials)
        .then((response) => {
            store.handle({
                type: "authentication.authenticated",
                user: response.data,
            });
            return Promise.resolve(response);
        })
        .catch((response) => {
            return Promise.reject(response);
        });
};
const logout = () => {
    store.handle({
        type: "authentication.unauthenticated",
    });
    return Promise.resolve();
};

const resetting = {
    request: (request) => {
        return apis.auth.resetting
            .request(request)
            .then((response) => {
                return Promise.resolve({});
            })
            .catch((response) => {
                return Promise.reject(response);
            });
    },
    reset: (credentials) => {
        return apis.auth.resetting
            .reset(credentials)
            .then((response) => {
                store.handle({
                    type: "authentication.authenticated",
                    user: response.data,
                });
                return Promise.resolve(response);
            })
            .catch((response) => {
                return Promise.reject(response);
            });
    },
};

export default {
    register,
    login,
    logout,
    resetting,
};
