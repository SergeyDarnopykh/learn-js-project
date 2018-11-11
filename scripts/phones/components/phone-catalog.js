import Component from '../../component.js'

export default class PhoneCatalog extends Component {
    constructor({ element }) {
        super({ element });
        this.bindEvents();
    }

    bindEvents() {
        this.on('click', 'phone-details-link', (ev) => {
            const phoneElement = ev.target.closest('[data-element="phone"]');

            this.emit('phoneSelected', phoneElement.dataset.phoneId);
        });

        this.on('click', 'add-button', (ev) => {
            const phoneElement = ev.target.closest('[data-element="phone"]');

            this.emit('add', phoneElement.dataset.phoneId);
        });
    }

    show(phones) {
        this.phones = phones;
        this.render();

        super.show();
    }

    render() {
        this.element.innerHTML = `
          <ul class="phones">
              ${ this.phones.map(phone => `
                  <li
                      class="thumbnail"
                      data-element="phone"
                      data-phone-id="${ phone.id }"
                  >
                      <a
                        href="#!/phones/${ phone.id }"
                        class="thumb"
                        data-element="phone-details-link"
                      >
                        <img alt="${ phone.name }" src="${ phone.imageUrl }">
                      </a>
          
                      <div class="phones__btn-buy-wrapper">
                        <a class="btn btn-success" data-element="add-button">
                          Add
                        </a>
                      </div>
          
                      <a
                          href="#!/phones/${ phone.id }"
                          data-element="phone-details-link"
                      >
                          ${ phone.name }
                      </a>
                    
                      <p>${ phone.snippet }</p>
                  </li>
              `).join('') }
          </ul>
        `;
    }
}