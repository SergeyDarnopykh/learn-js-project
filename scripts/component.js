const CLASS_HIDDEN = 'js-hidden';

export default class Component {
    constructor({ element }) {
        this.element = element;
    }

    hide() {
        this.element.classList.add(CLASS_HIDDEN);
    }

    show() {
        this.element.classList.remove(CLASS_HIDDEN);
    }

    subscribe (eventName, callback) {
        this.element.addEventListener(eventName, (event) => {
            callback(event.detail);
        });
    }

    emit (eventName, data) {
        const event = new CustomEvent(eventName, {
            detail: data
        });

        this.element.dispatchEvent(event);
    }

    on(eventName, elementName, callback) {
        this.element.addEventListener(eventName, (event) => {
            const delegateTarget = event.target.closest(`[data-element="${elementName}"]`);

            if (!delegateTarget) {
                return;
            }

            callback(event);
        });
    }
}