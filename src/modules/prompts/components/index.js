import React from "react";
import store from "./../store";
import actions from "./../actions";
import constants from "./../constants";
import utils from "../../../utilities";
import fields from "./../../../components/fields";

class BasePrompt extends React.Component {
   resolve(response) {
      actions.dismiss(this.props.id).then(() => {
         return this.props.resolve(response);
      });
   }
   render() {
      if (!this.props.render) {
         return (
            <div class="bg-white border border-red-800 p-2 w-full">
               <p class="mb-2 text-red-800">
                  There was an error creating this prompt
               </p>
               <div class="border-b border-gray-200 mb-2"></div>
               <div class="flex justify-between text-sm text-right">
                  <button
                     class="w-24 p-1 border border-red-800 text-red-800 font-bold mx-1 focus:outline-none"
                     onClick={() => actions.dismiss(this.props.id)}
                  >
                     ok
                  </button>
               </div>
            </div>
         );
      }
      return this.props.render(this.resolve.bind(this));
   }
}

class OkOnly extends React.Component {
   render() {
      return (
         <BasePrompt
            id={this.props.id}
            render={(resolve) => {
               return (
                  <div class="bg-white border border-gray-300 p-2 w-full">
                     <utils.If test={this.props.title}>
                        <h1 class="font-bold border-b border-gray-200">
                           {this.props.title}
                        </h1>
                     </utils.If>
                     <p class="mb-4 py-4 border-b border-gray-200">
                        {this.props.message}
                     </p>
                     <div class="flex justify-between text-sm">
                        <button
                           class="w-24 p-1 border mx-1 focus:outline-none"
                           onClick={() => resolve("ok")}
                        >
                           ok
                        </button>
                     </div>
                  </div>
               );
            }}
            {...this.props}
         />
      );
   }
}

class YesNo extends React.Component {
   render() {
      return (
         <BasePrompt
            id={this.props.id}
            render={(resolve) => {
               return (
                  <div class="bg-white border border-gray-300 p-2 w-full">
                     <utils.If test={this.props.title}>
                        <h1 class="font-bold border-b border-gray-200">
                           {this.props.title}
                        </h1>
                     </utils.If>
                     <p class="mb-4 py-4 border-b border-gray-200">
                        {this.props.message}
                     </p>
                     <div class="flex justify-between text-sm">
                        <button
                           class="w-24 p-1 border mx-1 focus:outline-none"
                           onClick={() => resolve("no")}
                        >
                           no
                        </button>
                        <button
                           class="w-24 p-1 border mx-1 focus:outline-none"
                           onClick={() => resolve("yes")}
                        >
                           yes
                        </button>
                     </div>
                  </div>
               );
            }}
            {...this.props}
         />
      );
   }
}

class YesNoCancel extends React.Component {
   render() {
      return (
         <BasePrompt
            id={this.props.id}
            render={(resolve) => {
               return (
                  <div class="bg-white border border-gray-300 p-2 w-full">
                     <utils.If test={this.props.title}>
                        <h1 class="font-bold border-b border-gray-200">
                           {this.props.title}
                        </h1>
                     </utils.If>
                     <p class="mb-4 py-4 border-b border-gray-200">
                        {this.props.message}
                     </p>
                     <div class="flex justify-between text-sm">
                        <button
                           class="w-24 p-1 border mx-1 focus:outline-none"
                           onClick={() => resolve("cancel")}
                        >
                           cancel
                        </button>
                        <button
                           class="w-24 p-1 border mx-1 focus:outline-none"
                           onClick={() => resolve("no")}
                        >
                           no
                        </button>
                        <button
                           class="w-24 p-1 border mx-1 focus:outline-none"
                           onClick={() => resolve("yes")}
                        >
                           yes
                        </button>
                     </div>
                  </div>
               );
            }}
            {...this.props}
         />
      );
   }
}

class Input extends React.Component {
   constructor(props) {
      super(props);
      this.state = { value: "" };
   }
   render() {
      return (
         <BasePrompt
            render={(resolve) => {
               return (
                  <div class="bg-white border border-gray-300 p-2 w-full">
                     <utils.If test={this.props.title}>
                        <h1 class="font-bold border-b border-gray-200">
                           {this.props.title}
                        </h1>
                     </utils.If>
                     <p class="mb-2">{this.props.message}</p>
                     <div class="mb-2">
                        <fields.Text
                           onChange={(e) => this.setState({ value: e.value })}
                        />
                     </div>
                     <div class="flex justify-between text-sm">
                        <button
                           class="w-24 p-1 border mx-1 focus:outline-none"
                           onClick={() => resolve(this.state.value)}
                        >
                           ok
                        </button>
                     </div>
                  </div>
               );
            }}
            {...this.props}
         />
      );
   }
}

export default class Component extends React.Component {
   constructor(props) {
      super(props);
      this.state = { prompts: [] };
   }
   componentDidMount() {
      store.on("change", () => {
         this.setState(() => {
            return { prompts: store.prompts || [] };
         });
      });
   }
   get last() {
      return this.state.prompts[this.state.prompts.length - 1];
   }
   render() {
      if (this.last == undefined) {
         return null;
      }

      const prompt = ((prompt) => {
         switch (prompt.type) {
            case constants.yesNo:
               return <YesNo key={prompt.id} {...prompt} />;
            case constants.yesNoCancel:
               return <YesNoCancel key={prompt.id} {...prompt} />;
            case constants.okOnly:
               return <OkOnly key={prompt.id} {...prompt} />;
            case constants.input:
               return <Input key={prompt.id} {...prompt} />;
            default:
               return <BasePrompt key={prompt.id} {...prompt} />;
         }
      })(this.last);

      return (
         <div class="flex fixed w-full h-full z-40 bg-gray-800 bg-opacity-50">
            <div class="mx-auto my-auto w-1/3">{prompt}</div>
         </div>
      );
   }
}
