import { create } from 'apisauce';

const apiClient = create({
    baseUrl: 'http://localhost:9000'
});

export default apiClient;