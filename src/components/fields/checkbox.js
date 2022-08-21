import React from "react";
import Field from "./field";

export default class Checkbox extends Field {
   render() {
      return (
         <label class="inline-flex items-center text-sm font-bold">
            <input
               type="checkbox"
               class="h-4 w-4"
               name={this.props.name}
               checked={this.props.value}
               onChange={(e) =>
                  this.onChange({
                     name: this.props.name,
                     value: !this.props.value,
                  })
               }
               onBlur={(e) =>
                  this.onBlur({
                     name: this.props.name,
                     value: this.props.value,
                  })
               }
               onFocus={(e) =>
                  this.onBlur({
                     name: this.props.name,
                     value: this.props.value,
                  })
               }
            />
            <span class="ml-1">{this.props.label}</span>
         </label>
      );
   }
}
