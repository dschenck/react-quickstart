import store from './store'

const open = (render, props) => {
    store.handle({
        type: "modals.open",
        modal: { render, props }
    })
}

const close = id => {
    store.handle({
        type: "modals.close",
        id
    })
}

export default {
    open,
    close
}