import axios from 'axios';


export default class API_Service{
    getResult() {
        return axios.get('/state-wise-data').then(response => response.data);
    }
    getTrends(state){
        return axios.get('/recent-trends',{params:{'state':state}}).then(response => response.data);
    }
}
