export default class {
    static get template() {
        return `<button on-click="handleClick">Click Me</button>`;
    }

    handleClick() {
        console.log("Clicked");
    }
}
