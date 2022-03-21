const register = (user) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            return resolve({
                status: 200,
                data: {
                    firstname: "David",
                    lastname: "Schenck",
                    email: "david.schenck@outlook.com",
                },
            });
        }, 1000);
    });
};

const authenticate = (credentials) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Math.random() < 0.25) {
                return reject({ status: 500 });
            }
            if (credentials.password != "pass") {
                return reject({
                    status: 400,
                    data: { global: "Invalid credentials" },
                });
            }
            return resolve({
                status: 200,
                data: {
                    firstname: "David",
                    lastname: "Schenck",
                    email: "david.schenck@outlook.com",
                },
            });
        }, 1000);
    });
};

const reset = (credentials) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            return resolve({
                status: 201,
                data: {
                    firstname: "David",
                    lastname: "Schenck",
                    email: "david.schenck@outlook.com",
                },
            });
        }, 1000);
    });
};

const request = (request) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            return resolve({
                status: 200,
                data: {},
            });
        }, 1000);
    });
};

export default {
    authenticate,
    register,
    resetting: {
        request,
        reset,
    },
};
