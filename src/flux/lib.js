import { EventEmitter } from "events";

/**
 * Base store
 */
export class Store extends EventEmitter {
   constructor(reducer, state = {}, enhancers = []) {
      super();
      this.reducer = reducer;
      this.enhancers = enhancers;
      this.state = this.reducer(state, {});
      this.listeners = [];
   }
   emit() {
      for (let listener of this.listeners) {
         listener(this.state);
      }
   }
   subscribe(listener) {
      this.listeners.push(listener);
      return () => {
         this.listeners.splice(this.listeners.indexOf(listener), 1);
      };
   }
   handle(event) {
      this.state = this.reducer(this.state, event);
      this.emit();
   }
}

/**
 * Combine several reducers as one
 *
 * @param {object} reducers
 * @returns new state
 */
export const combine = (reducers) => {
   return (state, action) => {
      return Object.keys(reducers).reduce((newstate, name) => {
         newstate[name] = reducers[name](state[name], action);
         return newstate;
      }, {});
   };
};

/**
 * Chain several enhancers
 *
 * @param {*} enhancers
 * @returns
 */
export const chain = (enhancers) => {
   return (event) => {
      return enhancers.reduce((event, enhancer) => {
         return enhancer(event);
      }, event);
   };
};
