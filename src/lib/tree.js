import uuid from "uuid";

export default class Node {
   constructor(value, meta, parent) {
      if (value instanceof Node) {
         this.value = {
            ...value.value,
            children: value.children
               ? value.children.map((child) => new Node(child, {}, this))
               : undefined,
         };
         this.meta = { id: uuid.v4(), ...value.meta, ...meta };
      } else {
         if (value.children) {
            this.value = {
               ...value,
               children: value.children.map(
                  (child) => new Node(child, {}, this)
               ),
            };
         } else {
            this.value = value;
         }
         this.meta = { id: uuid.v4(), ...meta };
      }
      this.parent = parent;
   }
   get children() {
      return this.value.children;
   }
   get root() {
      if (!this.parent) return this;
      return this.parent.root;
   }
   get siblings() {
      if (!this.parent) return;
      return this.parent.children;
   }
   get index() {
      if (!this.parent) return;
      return this.parent.children.indexOf(this);
   }
   get level() {
      if (!this.parent) return 0;
      return this.parent.level + 1;
   }
   get path() {
      if (!this.parent) return "/";
      if (!this.parent.parent) return `/${this.index}`;
      return `${this.parent.path}/${this.index}`;
   }
   get ancestors() {
      if (!this.parent) return [this];
      return [this].concat(this.parent.ancestors);
   }
   get descendants() {
      if (!this.children) return [];
      return this.children.reduce((acc, child) => {
         return acc.concat([child, ...child.descendants]);
      }, []);
   }
   get leaves() {
      if (!this.children) return [this];
      return this.children.reduce((acc, child) => {
         return acc.concat(child.leaves);
      }, []);
   }
   get size() {
      return 1 + this.descendants.length;
   }
   get height() {
      if (!this.children) return 0;
      return (
         1 +
         this.children.reduce((acc, child) => {
            return Math.max(acc, child.height);
         }, 0)
      );
   }
   get left() {
      if (!this.parent) return;
      return this.parent.children[this.index - 1];
   }
   get right() {
      if (!this.parent) return;
      return this.parent.children[this.index + 1];
   }
   get first() {
      if (!this.parent) return true;
      return this.parent.children[0] == this;
   }
   get last() {
      if (!this.parent) return true;
      return this.parent.children[this.parent.children.length - 1] == this;
   }
   get IPL() {
      if (!this.children) return 0;
      return (
         1 +
         this.children.length +
         this.children.reduce((acc, child) => {
            return acc + child.IPL;
         }, 0)
      );
   }
   get(path) {
      if (path == "/") {
         return this.root;
      }
      if (path.startsWith("/")) {
         return this.root.get(path.substring(1));
      }
      if (path.startsWith("../")) {
         return this.parent.get(path.substring(3));
      }
      if (path.split("/").length == 1) {
         return this.children[Number(path)];
      }
      return this.children[Number(path.split("/")[0])].get(
         path.split("/").slice(1).join("/")
      );
   }
   clone() {
      if (this.children) {
         return new Node(
            {
               ...this.value,
               children: this.children.map((child) => child.clone()),
            },
            { ...this.meta, id: uuid.v4() }
         );
      }
      return new Node(this.value, { ...this.meta, id: uuid.v4() });
   }

   push(child) {
      if (!this.children) {
         throw new Error("Node has no children");
      }
      return new Node(
         { ...this.value, children: [...this.children, child] },
         this.meta
      );
   }

   pop() {
      return new Node(this.children.pop(), this.meta);
   }

   insert(child, index) {
      if (!this.children) {
         throw new Error("Node has no children");
      }
      return new Node(
         {
            ...this.value,
            children: [
               ...this.children.slice(
                  0,
                  index === undefined ? this.children.length : index
               ),
               child,
               ...this.children.slice(
                  index === undefined ? this.children.length : index,
                  this.children.length
               ),
            ],
         },
         this.meta
      );
   }
   map(func) {
      return ((node) => {
         if (node.children) {
            return new Node(
               {
                  ...node.value,
                  children: node.children.map((child) => child.map(func)),
               },
               node.meta
            );
         }
         return node;
      })(new Node(func(this)));
   }
   transform(func) {
      //(this, constructor) passed to function
      return new Node(func(this, (value, meta) => new Node(value, meta)));
   }
   filter(func) {
      if (!func(this)) return;

      if (this.children) {
         return new Node(
            {
               ...this.value,
               children: this.children
                  .map((child) => child.filter(func))
                  .filter((child) => child !== undefined),
            },
            this.meta
         );
      }

      return this;
   }
   find(predicate) {
      if (predicate(this)) return this;

      if (this.children) {
         for (let i = 0; i < this.children.length; i++) {
            const match = this.children[i].find(predicate);
            if (match) return match;
         }
      }
   }
   search(predicate) {
      if (this.children) {
         return (predicate(this) ? [this] : []).concat(
            this.children.reduce((acc, child) => {
               return acc.concat(child.search(predicate));
            }, [])
         );
      }
      return predicate(this) ? [this] : [];
   }
   LCA(other) {
      if (other.root != this.root) return;
      const [foo, bar] = [other.ancestors, this.ancestors];
      for (let i = 1; i <= Math.min(foo.length, bar.length); i++) {
         if (foo[foo.length - i] != bar[bar.length - i]) {
            return foo[foo.length - i - 1];
         }
      }
   }
   //To be removed.... are not immutable methods!
   js() {
      if (!this.children) return { ...this.value };

      return {
         ...this.value,
         children: this.children.map((child) => child.js()),
      };
   }

   move(node, target, before) {
      if (node.ancestors.indexOf(this) == -1) {
         throw new Error("Node should be a child of this tree");
      }
      if (target.ancestors.indexOf(this) == -1) {
         throw new Error("Target should be a child of this tree");
      }
      if (before !== undefined && target.children.indexOf(before) == -1) {
         throw new Error("Before should be a child of the target");
      }
      return this.delete(node).map((child) => {
         if (child.meta.id == target.meta.id) {
            return child.insert(node, before ? before.index : undefined);
         }
         return child;
      });
   }

   delete(node) {
      if (node.ancestors.indexOf(this) == -1) {
         throw new Error("Node should be a child of this tree");
      }
      return this.filter((child) => child != node);
   }
}
