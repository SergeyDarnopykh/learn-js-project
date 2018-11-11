import Component from '../../component.js'

export default class ShoppingCart extends Component {
    constructor({ element }) {
        super({ element });

        this.items = {
            test: 2,
            foo: 1,
            bar: 3
        };

        this.render();
        this.bindEvents();
    }

    bindEvents() {
        this.on('click', 'button-remove', (event) => {
            this.removeItem(event.target.dataset.item);
        });
    }

    addItem(item) {
        if (!this.items[item]) {
            this.items[item] = 0;
        }

        this.items[item]++;

        this.render();
    }

    removeItem(item) {
        if (this.items[item]) {
            this.items[item]--;
        }

        if (this.items[item] === 0) {
            delete this.items[item];
        }

        this.render();
    }

    render() {
        this.element.innerHTML = `
            <h3>Shopping Cart</h3>
            <ul>
                ${ Object.keys(this.items).map(item => `
            
                 <li>
                    ${ item } (${ this.items[item] })
                    <button
                        data-element="button-remove"
                        data-item="${ item }"
                    >
                    x
                    </button>
                 </li>
    
                `).join('')}
            </ul>
        `;
    }
}