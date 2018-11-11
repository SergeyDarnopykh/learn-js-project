import Component from '../../component.js';

export default class PhoneFilters extends Component {
    constructor({ element }) {
        super({ element });

        this.render();
        this.bindEvents();
    }

    bindEvents() {
        this.on('keyup', 'search', (ev) => {
            const searchElement = ev.target.closest('[data-element="search"]');

            this.emit('search', searchElement.value);
        });

        this.on('change', 'sort', (ev) => {
            const sortElement = ev.target.closest('[data-element="sort"]');
            this.sortQuery = sortElement.value;

            this.emit('sort', this.sortQuery);
        });
    }

    render() {
        this.element.innerHTML = `
            <p>
                Search:
                <input
                    data-element="search"
                    type="text"
                >
            </p>
    
            <p>
                Sort by:
                <select data-element="sort">
                    <option hidden></option>
                    <option value="name">Alphabetical</option>
                    <option value="age">Newest</option>
                </select>
            </p>
        `;
    }
}