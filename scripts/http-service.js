const API_URL = 'https://sdarnopykh.github.io/learn-js-project';
// const API_URL = 'http://localhost:3000';

const HttpService = {
    sendRequest(url) {
        return fetch(`${API_URL}/api/${url}`)
            .then(response => response.json());
    }
};

export default HttpService;