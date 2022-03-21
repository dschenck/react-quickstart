import store from "./store";
import modules from "../modules";
import apis from "../apis";

const authentication = {
    register: (user) => {
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
    },
    login: (credentials) => {
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
    },
    logout: () => {
        store.handle({
            type: "authentication.unauthenticated",
        });
        return Promise.resolve();
    },
    resetting: {
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
    },
};

const clipboard = {
    copy: (node) => {
        const range = document.createRange();
        const selection = window.getSelection();
        selection.removeAllRanges();

        try {
            range.selectNodeContents(node);
            selection.addRange(range);
        } catch (e) {
            range.selectNode(node);
            selection.addRange(range);
        }
        document.execCommand("Copy");
        selection.removeAllRanges();

        modules.notifications.actions.notify({
            type: "success",
            message: "Table copied to clipboard",
        });
    },
};

export default {
    authentication,
    clipboard,
    notifications: modules.notifications.actions,
    prompts: modules.prompts.actions,
};
