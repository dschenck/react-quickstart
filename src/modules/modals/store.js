import { EventEmitter } from 'events'
import uuid from 'uuid'

class Store extends EventEmitter {
    constructor() {
        super()
        this.modals = []
    }
    handle(event) {
        switch (event.type) {
            case "modals.open":
                this.modals.push({ ...event.modal, id: uuid.v4() })
                this.emit("change")
                break
            case "modals.close":
                this.modals = this.modals.filter(n => n.id != event.id)
                this.emit("change")
                break
        }
    }
}

export default new Store()
