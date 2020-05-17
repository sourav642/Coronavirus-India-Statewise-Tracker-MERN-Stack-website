import axios from 'axios';
const port = process.env.PORT || 5000;
const URL = 'http://localhost:'+String(port)


export default class API_Service{
    getResult() {
        return axios.get(URL+'/state-wise-data').then(response => response.data);
    }
    getTrends(state){
        return axios.get(URL+'/recent-trends',{params:{'state':state}}).then(response => response.data);
    }
}
