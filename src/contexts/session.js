import React from "react";
import store from "../flux/store";

const Context = React.createContext({});

class Session extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        this.unsubscribe = store.subscribe((state) => {
            this.setState({ session: state.session });
        });
    }
    render() {
        return (
            <Context.Provider value={this.state.session}>
                {this.props.children}
            </Context.Provider>
        );
    }
}

export default {
    Component: Session,
    context: Context,
};
