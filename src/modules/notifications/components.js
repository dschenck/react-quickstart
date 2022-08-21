import React from "react";
import store from "./store";
import actions from "./actions";

class Notification extends React.Component {
   constructor(props) {
      super(props);
      this.state = { hovered: false };
   }
   componentDidMount() {
      this.timeout = setTimeout(() => {
         if (!this.state.hovered) {
            actions.dismiss(this.props.id);
         }
      }, this.props.ttl || 2000);
   }
   render() {
      const colour = {
         success: "border-green-800 bg-green-700",
         danger: "border-red-800 bg-red-700",
         info: "border-blue-800 bg-blue-700",
         warning: "border-yellow-600 bg-yellow-500",
      }[this.props.type];

      return (
         <div
            onMouseEnter={() => this.setState({ hovered: true })}
            class={`${colour} text-gray-100 hover:text-white w-72 text-sm rounded p-2 border opacity-80 hover:opacity-90 relative mb-2`}
         >
            <button
               class="absolute top-2 right-2 focus:outline-none"
               onClick={() => actions.dismiss(this.props.id)}
            >
               X
            </button>
            <h1 class="font-bold ">{this.props.title || "Info"}</h1>
            <p class="">{this.props.message || this.props.text}</p>
         </div>
      );
   }
}

export default class Component extends React.Component {
   constructor(props) {
      super(props);
      this.state = { notifications: [] };
   }
   componentDidMount() {
      store.on("change", () => {
         this.setState(() => {
            return { notifications: store.notifications };
         });
      });
   }
   render() {
      if (this.state.notifications.length == 0) {
         return null;
      }

      const notifications = this.state.notifications.map((notification) => {
         return <Notification {...notification} key={notification.id} />;
      });

      return <div class="absolute top-2 right-2 z-40">{notifications}</div>;
   }
}
