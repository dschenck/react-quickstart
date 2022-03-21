export default class Node {
    constructor(value, parent) {
        if (value instanceof Node) {
            this.value = {
                ...value.value,
                children: value.children
                    ? value.children.map((child) => new Node(child, this))
                    : undefined,
            };
        } else if (value.children) {
            this.value = {
                ...value,
                children: value.children.map((child) => new Node(child, this)),
            };
        } else {
            this.value = value;
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
        if (!this.parent) return;
        return [this.parent].concat(this.parent.ancestors);
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
    js() {
        if (!this.children) return { ...this.value };
        return {
            ...this.value,
            children: this.children.map((child) => child.js()),
        };
    }
    clone() {
        if (this.children) {
            return new Node({
                ...this.value,
                children: this.children.map((child) => child.clone()),
            });
        }
        return new Node(this.value);
    }
    map(func) {
        if (!this.children) return new Node(func(this), this.parent);
        return new Node(
            func(
                new Node({
                    ...this.value,
                    children: this.children.map((child) => child.map(func)),
                })
            ),
            this.parent
        );
    }
    push(child) {
        this.children.push(new Node(child, this));
        return;
    }
    insert(child, position) {
        this.children.splice(
            position === null ? this.children.length : position,
            0,
            new Node(child, this)
        );
    }
    pop() {
        return new Node(this.children.pop());
    }
    traverse(func) {
        func(this);
        if (this.children) {
            this.children.forEach((child) => child.traverse(func));
        }
    }
    one(predicate) {
        if (predicate(this)) return this;
        if (this.children) {
            for (let i = 0; i < this.children.length; i++) {
                const match = this.children[i].one(predicate);
                if (match) return match;
            }
        }
    }
    all(predicate) {
        if (this.children) {
            return (predicate(this) ? [this] : []).concat(
                this.children.reduce((acc, child) => {
                    return acc.concat(child.all(predicate));
                }, [])
            );
        }
        return predicate(this) ? [this] : [];
    }
    delete() {
        if (!this.parent) return this;
        this.parent.children.splice(this.index, 1);
        this.parent = undefined;
        return this;
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
    sort(sorter) {
        if (!this.children) return;
        this.children.forEach((child) => child.sort(sorter));
        this.children.sort(sorter);
    }
    move(target, before = null) {
        this.root.get(target).insert(this.delete(), before);
        return;
    }
}
