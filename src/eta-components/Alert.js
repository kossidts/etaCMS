/**
 * @typedef {object} Props
 * @property {string} [type]
 * @property {string} title
 * @property {string} content
 */
export default class {
    /** @param {Props} props */
    constructor(props) {
        /** @type {Props} */
        this.props = {
            type: "info",
            ...props,
        };
    }

    render() {
        return `<div class="alert alert-${this.props.type == "error" ? "danger" : this.props.type}" role="alert">
            ${this.props.title ? `<h4 class="alert-heading">${this.props.title}</h4>` : ""}
            ${this.props.content}
        </div>`;
    }
}
