import store from "./store";

const notify = (notification) => {
   return store.handle({
      type: "notification.create",
      notification,
   });
};

const warn = (notification) => {
   return store.handle({
      type: "notification.create",
      notification: {
         ...notification,
         type: "warning",
      },
   });
};

const info = (notification) => {
   return store.handle({
      type: "notification.create",
      notification: {
         ...notification,
         type: "info",
      },
   });
};

const dismiss = (notification) => {
   return store.handle({
      type: "notification.dismiss",
      notification,
   });
};

export default {
   dismiss,
   info,
   notify,
   warn,
};
