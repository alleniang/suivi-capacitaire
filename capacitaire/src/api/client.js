import { create } from 'apisauce';

const apiClient = create({
    baseUrl: 'http://172.20.3.200:9000'
});

export default apiClient;