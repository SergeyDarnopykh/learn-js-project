import Component from '../../component.js'

export default class PhoneViewer extends Component{
    constructor({ element }) {
        super({ element });
        this.bindEvents();
    }

    bindEvents() {
        this.on('click', 'back-button', () => {
            this.emit('back');
        });

        this.on('click', 'add-button', () => {
            this.emit('add', this.phone.id);
        });
    }

    show(phoneDetails) {
        this.phone = phoneDetails;
        this.render();

        super.show();
    }

    render() {
        const { images, name, description } = this.phone;

        this.element.innerHTML = `
            <img class="phone" src="${ images[0] }">
    
            <button data-element="back-button">
                Back
            </button>
          
            <button data-element="add-button">
                Add to basket
            </button>
      
            <h1>${ name }</h1>
      
            <p>${ description }</p>
      
            <ul class="phone-thumbs">
                ${ images.map(image => `
                    <li>
                        <img src="${ image }">
                    </li>
                `).join('')}
            </ul>
        `;
    }
}