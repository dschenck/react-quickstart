import actions from "./actions";
import Component from "./components";
import constants from "./constants";

export default {
   Component,
   ...actions,
   ...constants,
};
