import store from "./store";

const prompt = (prompt) => {
   return new Promise((resolve, reject) => {
      store.handle({
         type: "prompts.prompt",
         prompt: { ...prompt, resolve, reject },
      });
   });
};

const dismiss = (id) => {
   return new Promise((resolve) => {
      store.handle({
         type: "prompts.dismiss",
         id,
      });
      return resolve();
   });
};

export default {
   dismiss,
   prompt,
};
