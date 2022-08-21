import { EventEmitter } from "events";
import uuid from "uuid";

class Store extends EventEmitter {
   constructor() {
      super();
      this.prompts = [];
   }
   handle(event) {
      switch (event.type) {
         case "prompts.prompt":
            this.prompts.push({ ...event.prompt, id: uuid.v4() });
            this.emit("change");
            break;
         case "prompts.dismiss":
            this.prompts = this.prompts.filter((n) => n.id != event.id);
            this.emit("change");
            break;
      }
   }
}

export default new Store();
