import React from "react";
import actions from "../flux/actions";
import modals from "../modules/modals";

class Section extends React.Component {
   onClick(event) {
      if (event.name == "delete") {
         return actions.prompts
            .prompt({
               type: "yesNo",
               title: "Delete user information",
               message: "Are you sure you want to delete this account?",
            })
            .then((response) => {
               if (response == "yes") {
                  actions.notifications.notify({
                     type: "success",
                     message: "User successfully deleted account",
                  });
               }
            });
      }
      if (event.name == "enter") {
         return actions.prompts
            .prompt({
               type: "yesNo",
               title: "Casino",
               message: "Are you sure you want to enter the casino?",
            })
            .then((response) => {
               if (response == "yes") {
                  actions.prompts
                     .prompt({
                        type: "input",
                        title: "Confirm user age",
                        message: "Please confirm your age",
                     })
                     .then((response) => {
                        if (Number(response) > 17) {
                           actions.notifications.notify({
                              type: "success",
                              message: "User entered the casino",
                           });
                        } else {
                           actions.notifications.notify({
                              type: "info",
                              message: "User walked away",
                           });
                        }
                     });
               }
            });
      }

      if (event.name == "open") {
         return modals.open((close) => {
            return (
               <div class="bg-white p-2 mx-auto my-auto w-1/3">
                  <div>This is a modal</div>
                  <div>
                     <button
                        onClick={() =>
                           close().then(console.log("closed modal"))
                        }
                     >
                        close
                     </button>
                  </div>
               </div>
            );
         });
      }
   }
   render() {
      return (
         <div class="bg-white p-2 border border-gray-200 w-1/2 mx-auto mb-2 mt-1">
            <button
               class="w-24 p-1 border border-red-800 text-red-800 mr-2"
               onClick={() => this.onClick({ name: "delete" })}
            >
               delete
            </button>
            <button
               class="w-24 p-1 border border-blue-800 text-blue-800 mr-2"
               onClick={() => this.onClick({ name: "enter" })}
            >
               enter
            </button>
            <button
               class="w-24 p-1 border border-blue-800 text-blue-800 mr-2"
               onClick={() => this.onClick({ name: "open" })}
            >
               open
            </button>
         </div>
      );
   }
}

export default class Page extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         tableref: React.createRef(),
      };
   }
   copy() {
      actions.clipboard.copy(this.state.tableref.current);
   }
   render() {
      return (
         <div>
            <div class="bg-white p-2 border border-gray-200 w-1/2 mx-auto mb-2 mt-1">
               <h1 class="text-2xl text-gray-900 pb-2">Kitchen sink</h1>
               <div class="mb-2 text-right">
                  <button
                     onClick={this.copy.bind(this)}
                     class="p-1 border border-blue-800 text-blue-800"
                  >
                     copy table
                  </button>
               </div>
               <table ref={this.state.tableref} class="w-full text-center">
                  <thead>
                     <tr class="border-b border-t border-blue-700">
                        <td>header 1</td>
                        <td>header 2</td>
                        <td>header 3</td>
                        <td>header 4</td>
                        <td>header 5</td>
                        <td>header 6</td>
                     </tr>
                  </thead>
                  <tbody>
                     {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => {
                        return (
                           <tr key={i}>
                              <td>row {i}</td>
                              <td>row {i}</td>
                              <td>row {i}</td>
                              <td>row {i}</td>
                              <td>row {i}</td>
                              <td>row {i}</td>
                           </tr>
                        );
                     })}
                  </tbody>
               </table>
            </div>
            <Section />
         </div>
      );
   }
}
