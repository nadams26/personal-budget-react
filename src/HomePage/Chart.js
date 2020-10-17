import React from 'react';
import {Pie} from 'react-chartjs-2';
import axios from 'axios'
const dataSource = {
  datasets: [
      {
          data: [],
          backgroundColor: []
      }
  ],
  labels: []
};
export default class App extends React.Component {
  
  componentDidMount() {
    axios.get(`http://localhost:3001/budget`)
      .then(res => {
        for(var i = 0; i < res.data.myBudget.length; i++){
          dataSource.datasets[0].data[i] = res.data.myBudget[i].budget;
          dataSource.labels[i] = res.data.myBudget[i].title;
          const randomColor = Math.floor(Math.random()*16777215).toString(16);
          dataSource.datasets[0].backgroundColor[i] = "#" + randomColor;
        }
        this.setState({dataSource})
        console.log(res.data.myBudget);
        console.log(dataSource);
      })
  }
  render() {
    return (
      <Pie 
        data={dataSource}
        width='400'
        height='400'
        id='myChart'
      />
    );
  }
}