import React, { Component } from "react";
import Chart from "react-apexcharts";
import styles from './Chart.module.scss';
class ChartUsers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        chart: {
          id: "basic-bar"
        },
        xaxis: {
          categories: [2017, 2018, 2019, 2020, 2021]
        },
        stroke: {
          curve: 'straight'
        },
        grid: {
          row: {
            colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
            opacity: 0.5
          },
        },
        colors: ['#eb3971']
      },
      series: [
        {
          name: "Số lượng truy cập",
          data: [30, 40, 45, 50, 40]
        }
      ]
    };
  }

  render() {
    return (
      <div className={styles.chart}>
        <div>
          <div className={styles['chart__container']}>
            <Chart
              options={this.state.options}
              series={this.state.series}
              type="line"
              width="100%"
              height='auto'
            />
          </div>
        </div>
      </div>
    );
  }
}

export default ChartUsers;