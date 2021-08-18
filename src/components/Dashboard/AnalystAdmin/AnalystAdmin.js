
import React, { Component } from 'react';
import Chart from 'react-apexcharts'
import Container from '../helper/Container/Container';
class DonutChart extends Component {

  constructor(props) {
    super(props);

    this.state = {
      options: {
          labels: ['Truy Cập', 'Blogs hoạt động', 'Users', 'Blogs bị khóa']
      },
      series: [44, 55, 41, 17],
    }
  }

  render() {

    return (
      <Container>
        <Chart options={this.state.options} series={this.state.series} type="donut" width="100%" height="auto" />
      </Container>
    );
  }
}

export default DonutChart;