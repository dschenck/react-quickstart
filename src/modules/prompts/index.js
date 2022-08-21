import actions from "./actions";
import Component from "./components";
import constants from "./constants";

export default {
   actions,
   ...actions,
   Component,
   ...constants,
};
