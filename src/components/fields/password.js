import React from "react";
import Field from "./field";

export default class Password extends Field {
   render() {
      return (
         <input
            class="w-full border border-gray-200 focus:outline-none text-sm p-1 bg-gray-100 focus:bg-gray-50"
            name={this.props.name}
            type="password"
            value={this.props.value}
            onChange={(e) =>
               this.onChange({
                  name: this.props.name,
                  value: e.target.value,
               })
            }
            onBlur={(e) =>
               this.onBlur({
                  name: this.props.name,
                  value: e.target.value,
               })
            }
            onFocus={(e) =>
               this.onFocus({
                  name: this.props.name,
                  value: e.target.value,
               })
            }
         />
      );
   }
}
