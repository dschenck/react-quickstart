import { EventEmitter } from "events";
import uuid from "uuid";

class Store extends EventEmitter {
   constructor() {
      super();
      this.notifications = [];
   }
   handle(event) {
      switch (event.type) {
         case "notification.create":
            this.notifications.push({
               ...event.notification,
               id: uuid.v4(),
            });
            this.emit("change");
            break;
         case "notification.dismiss":
            this.notifications = this.notifications.filter(
               (n) => n.id != event.notification
            );
            this.emit("change");
            break;
      }
   }
}

export default new Store();
