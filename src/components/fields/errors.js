import React from "react";

export default class Errors extends React.Component {
   get messages() {
      if (Array.isArray(this.props.errors)) {
         return this.props.errors;
      }
      if (typeof this.props.errors == "string") {
         return [this.props.errors];
      }
      if (typeof this.props.errors == "object" && this.props.errors !== null) {
         return Object.keys(this.props.errors).reduce((acc, curr) => {
            acc.push(`${curr}:${this.props.errors[curr]}`);
            return acc;
         }, []);
      }
      return [];
   }
   render() {
      if (this.props.errors) {
         return (
            <ul class="text-sm text-red-800">
               {this.messages.map((message, i) => (
                  <li key={i}>{message}</li>
               ))}
            </ul>
         );
      }
      return null;
   }
}
