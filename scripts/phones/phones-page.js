import PhoneCatalog from './components/phone-catalog.js';
import PhoneViewer from './components/phone-viewer.js';
import PhonesFilter from './components/phone-filter.js';
import ShoppingCart from './components/shopping-cart.js';
import PhoneService from './services/phone-service.js';

export default class PhonesPage {
    constructor({ element }) {
        this.element = element;

        this.render();

        this.initCatalog();
        this.initViewer();
        this.initShoppingCart();
        this.initFilters();
    }

    initCatalog () {
        this.catalog = new PhoneCatalog({
            element: this.element.querySelector('[data-component="phone-catalog"]'),
        });

        this.loadPhonesFromServer();

        this.catalog.subscribe('phoneSelected', (phoneId) => {
            PhoneService.getPhone(phoneId)
                .then((phoneDetails) => {
                    this.catalog.hide();
                    this.viewer.show(phoneDetails);
                });
        });

        this.catalog.subscribe('add', (phoneId) => {
            this.shoppingCart.addItem(phoneId);
        });
    }

    loadPhonesFromServer() {
        PhoneService.getPhones()
            .then((phones) => {
                this.catalog.show(phones);
            });
    }

    initViewer() {
        this.viewer = new PhoneViewer({
            element: this.element.querySelector('[data-component="phone-viewer"]'),
        });

        this.viewer.subscribe('add', (phoneId) => {
            this.shoppingCart.addItem(phoneId);
        });

        this.viewer.subscribe('back', () => {
            this.viewer.hide();
            this.loadPhonesFromServer();
        });
    }

    initShoppingCart() {
        this.shoppingCart = new ShoppingCart({
            element: this.element.querySelector('[data-component="shopping-cart"]'),
        });
    }

    initFilters() {
        this.filter = new PhonesFilter({
            element: this.element.querySelector('[data-component="phones-filter"]'),
        });

        this.filter.subscribe('search', (query) => {
            PhoneService.getPhones()
                .then((phones) => {
                    const parsedPhones = phones.filter(phone => phone.name.toLowerCase().includes(query.toLowerCase()));

                    if (this.filter.sortQuery) {
                        parsedPhones.sort(this.sortByQuery(this.filter.sortQuery));
                    }

                    this.catalog.show(parsedPhones);
                });
        });

        this.filter.subscribe('sort', (sortQuery) => {
            this.catalog.show(this.catalog.phones.sort(this.sortByQuery(sortQuery)));
        });
    }

    sortByQuery(query) {
        return (a, b) => a[query] > b[query] ? 1 : -1;
    }

    render() {
        this.element.innerHTML = `
            <div class="container-fluid">
                <div class="row">
          
                <!--Sidebar-->
                <div class="col-md-2">
                    <section>
                        <div data-component="phones-filter"></div>
                    </section>
          
                    <section>
                    <div data-component="shopping-cart"></div>
                    </section>
                </div>
          
                <!--Main content-->
                <div class="col-md-10">
                    <div data-component="phone-catalog" class="js-hidden"></div>
                    <div data-component="phone-viewer" class="js-hidden"></div>
                </div>
            </div>
          </div>
        `;
    }
}