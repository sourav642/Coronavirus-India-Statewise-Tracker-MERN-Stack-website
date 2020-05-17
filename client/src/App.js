import  React, { Component } from  'react';
import  API_Service  from  './App_Util';
import { Header,Modal,Icon,Loader,List,Flag,Menu,Popup} from 'semantic-ui-react'
import "./index.css";
import { LineChart} from 'react-chartkick'
import 'chart.js'



const  serviceObj  =  new  API_Service();
class  resultList  extends  Component {

  constructor(props) {
      super(props);
      this.state  = {
          dataList: [],
          graph_data: {},
          loading : false,
          Total : {},
      };
  }

componentDidMount() {
  var  self  =  this;
  serviceObj.getResult().then(function (res) {
    console.log(res);
    self.setState({ dataList: res , Total : res.pop()})

  });
}

graphData(stateName) {
  var self = this;
  self.setState({loading:true},()=>{serviceObj.getTrends(stateName).then(function (res) {
    console.log(res);
    self.setState({ loading:false, graph_data: res})
  });
});
}


render(){
return(
  <div>
    <h3>Covid19 INDIA: Live Stats</h3>
  <h2>{
      // Display Total data at the top
      <List horizontal relaxed inverted> 
      <List.Item >
        <List.Content>
          <List.Header>Confirmed</List.Header>
          {this.state.Total.confirmed}
        </List.Content>
      </List.Item>
      <List.Item>
        <List.Content>
          <List.Header>Active</List.Header>
          {this.state.Total.active}
        </List.Content>
      </List.Item>
      <List.Item>
        <List.Content>
          <List.Header>Recovered</List.Header>
          {this.state.Total.recovered}
        </List.Content>
      </List.Item>
      <List.Item>
        <List.Content>
          <List.Header>Deaths</List.Header>
          {this.state.Total.deaths}
        </List.Content>
      </List.Item>
      </List>}
    </h2>

      <table class = "Table">
        <caption style={{color:'grey'}}>Source:  <a href = "https://www.covid19india.org/" class="Redirect">Covid19India</a>
          {', '}
          <a href = "https://www.mohfw.gov.in/" class="Redirect">MOHFW</a>
        </caption>
        <thead> 
            <tr>
              <th ><h1>State</h1></th>
              <th ><h1>Confirmed</h1></th>
              <th ><h1>Active</h1></th>
              <th ><h1>Recovered</h1></th>
              <th ><h1>Deaths</h1></th>
            </tr>
        </thead>
        <tbody>
          {this.state.dataList.map(row =>
            <tr>
              <td> {row.state} {'\t\t'}               
          <Modal basic size = 'large' trigger = {<Icon name='chart line' link onClick={() => this.graphData(row.state)}/>}closeIcon>
                <Header icon='chart line' content={row.state.concat(' - Recent Trends')} />
                  {this.state.loading? <Loader>This might take a few seconds ... Please be patient</Loader>:
                  <Modal.Content>
                    <LineChart data={this.state.graph_data.line_chart} width='95%' height="400px"/>
                  </Modal.Content>}
                </Modal>
              </td>
              <td>{row.confirmed}</td>
              <td>{row.active}</td>
              <td>{row.recovered}</td>
              <td>{row.deaths}</td>
            </tr>
          )}
        </tbody>
      </table>
      <footer id="colophon" class="site-footer" role="contentinfo">
  <div class="social-wrapper">
  <ul>
  <li>
  <Menu.Item
      href="https://www.linkedin.com/in/souravac-4a1555164/"
      target="_blank"
      class = "Linkedin"
  >
      <Icon name='linkedin' link color='blue' size='big' alt="Linkedin Logo" class="Linkedin"/>
      </Menu.Item>
  </li>
  <li>
    <Menu.Item
      href="https://github.com/sourav642"
      target="_blank"
      class="Git"
    >
      <Icon name='github' link size='big' color ='grey' alt="Github Logo" class="Git"/>
      </Menu.Item>
  </li>
  
    </ul>
  </div>

  <p class="footer-nav" >
  Copyright &copy;  {1900 + new Date().getYear()} (Beta) | Made with  <Icon color='pink' name='heart' /> in <Flag name="in" width='100px' height='1px'/> by <a class="link" href="https://www.linkedin.com/in/souravac-4a1555164/">@Sourav</a>
  </p>
</footer>
        </div>
    );
  }
}

export default resultList;