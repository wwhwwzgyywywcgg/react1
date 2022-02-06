import {useEffect,useRef} from 'react';
// import * as echarts from "echarts";
function MyLine() {
  // const chart = useRef<any>();
  // useEffect(() => {
  //   // 基于准备好的dom，初始化echarts实例
  //   var myChart = echarts.init(chart.current);
  //   // 绘制图表
  //   myChart.setOption({
  //     title: {
  //       text: "产品销量",
  //     },
  //     tooltip: {},
  //     xAxis: {
  //       data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
  //     },
  //     yAxis: {},
  //     series: [
  //       {
  //         name: "销量",
  //         type: "bar",
  //         data: [5, 20, 36, 10, 10, 20],
  //       },
  //       {
  //         name: "价格",
  //         type: "bar",
  //         data: [52, 120, 236, 110, 110, 420],
  //       },
  //     ],
  //   });
  // }, []);
  return <div>
     <div 
     className='="main'
     style={{width:"800px",height:"500px"}}
     ></div>
  </div>;
}

export default MyLine;
