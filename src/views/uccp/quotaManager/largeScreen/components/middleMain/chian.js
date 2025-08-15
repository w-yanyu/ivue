// var uploadedDataURL = "/asset/get/s/data-1603422575261-JsWEAc3zU.json";

//也可将chinaJson单独保存为文件，再引入
/*$.getJSON("js/mapJson/china.json", function (data) {
            echarts.registerMap('china', data);
        })*/

const  chinaJson = []
export default{chinaJson}
// echarts.registerMap('china', chinaJson);

// $.getJSON(uploadedDataURL, (json) => {
//     json.splice(
//         json.findIndex(item => item.source === "上海"),
//         1
//     )
//     let geoCoordMap = {};
//     let dataT = [];
//     for (let item of json) {
//         geoCoordMap[item.sourceCity] = [item.longitude, item.latitude];
//         dataT.push({
//             name: item.sourceCity,
//             value: item.percent
//         })
//     }
//     geoCoordMap["上海"] = [121.47, 31.23];
//     let GZData = []
//     dataT.map((item, index) => {
//         GZData.push([item, {
//             name: "上海"
//         }])
//     })
//     let tempData = ["上海", GZData]
//     let convertData = (data) => {
//         let res = [];
//         for (let i = 0; i < data.length; i++) {
//             let dataItem = data[i];
//             let fromCoord = geoCoordMap[dataItem[0].name];
//             let toCoord = geoCoordMap[dataItem[1].name];
//             if (fromCoord && toCoord) {
//                 res.push({
//                     fromName: dataItem[0].name,
//                     toName: dataItem[1].name,
//                     coords: [fromCoord, toCoord],
//                     value: dataItem[0].value
//                 });
//             }
//         }
//         return res;
//     };
//     let color = [
//         '#ff73b7',
//         '#ffff46',
//         '#acff43',
//         '#27bbfe',
//     ];
//     let series = [];

//     series.push({
//         name: "chinamap",
//         type: "map",
//         geoIndex: 0, //必须有，才能显示颜色
//         data: [{
//             name: '上海',
//             value: 1000
//         }], //name省份名字
//     }, {
//         name: tempData[0],
//         type: 'lines',
//         coordinateSystem: 'geo',
//         zlevel: 3,
//         symbol: ['none', 'circle'],
//         effect: {
//             show: true,
//             // period: 3, //箭头指向速度，值越小速度越快
//             trailLength: 0, // 特效尾迹长度[0,1]值越大，尾迹越长重
//             symbolSize: 3, // 图标大小
//             constantSpeed: 30

//         },
//         lineStyle: {
//             normal: {
//                 opacity: 1,
//                 curveness: 0.4, // 曲线的弯曲程度
//                 color: '#609fd4'
//             }
//         },
//         data: convertData(tempData[1])
//     }, {
//         name: tempData[0],
//         type: 'scatter',
//         coordinateSystem: 'geo',
//         zlevel: 2,
//         rippleEffect: {
//             brushType: 'stroke'
//         },
//         label: {
//             normal: {
//                 show: true,
//                 position: 'right',
//                 formatter: '{b}',
//                 textStyle: {
//                     fontWeight: 'bolder'
//                 }
//             }
//         },
//         symbolSize: function(val) {
//             return 10
//         },
//         itemStyle: {
//             normal: {
//                 // fontSize: 80,
//             }
//         },
//         data: tempData[1].map((dataItem) => {
//             return {
//                 name: dataItem[0].name,
//                 value: geoCoordMap[dataItem[0].name].concat([dataItem[0].value])
//             }
//         })
//     }, {
//         type: 'effectScatter',
//         coordinateSystem: 'geo',
//         zlevel: 4,
//         symbolSize: 15,
//         label: {
//             normal: {
//                 show: true,
//                 position: 'right',
//                 formatter: '{b}',

//                 color: 'white'
//             }
//         },
//         itemStyle: {
//             normal: {
//                 color: 'white'
//             }
//         },
//         rippleEffect: {
//             scale: 4,
//             brushType: 'stroke'
//         },
//         data: [{
//             name: tempData[0],
//             value: geoCoordMap[tempData[0]],
//             visualMap: true
//         }]
//     })

//     let option = {
//         backgroundColor: '#012248',
//         tooltip: {
//             //触发类型  数据项图形触发，主要在散点图，饼图等无类目轴的图表中使用。
//             trigger: "item",
//             formatter: (params) => {
//                 if (params.seriesType === 'scatter' && params.name !== tempData[0]) {
//                     return (
//                         '<br>' +
//                         params.seriesName +
//                         ' <--- ' +
//                         params.data.name +
//                         '<br />数量：' +
//                         params.data.value[2]
//                     )
//                 } else if (params.seriesType === 'lines') {
//                     return (
//                         '<br>' +
//                         params.data.fromName +
//                         ' ---> ' +
//                         params.data.toName +
//                         '<br />数量：' +
//                         params.data.value
//                     )
//                 } else {
//                     return params.name
//                 }
//             }

//         },
//         visualMap: {
//             type: "continuous",
//             text: ["高", "低"],
//             // 调整改变整体颜色对应
//             min: 0.5,
//             max: 3,
//             // itemWidth: 14,
//             // itemHeight: 80,
//             calculable: true,
//             color: color,
//             textStyle: {
//                 color: "#fff"
//             },
//             // bottom: 10,
//             // left: 10,
//             show: true
//         },
//         //地图配置
//         geo: {
//             map: 'china',
//             //调整以下3个配置项与页面地图重合
//             // aspectScale: 1,			//echarts地图的长宽比（就是胖瘦）
//             center: [104.29, 35.8], //设置可见中心坐标，以此坐标来放大和缩小
//             zoom: 1.20, //放大级别
//             scaleLimit: {
//                 min: 1,
//                 max: 50,
//             },
//             roam: true,
//             label: {
//                 normal: {
//                     show: true,
//                     textStyle: {
//                         color: 'rgba(249, 249, 249,1)'
//                     }

//                 },
//                 emphasis: {
//                     show: true,
//                     textStyle: {
//                         color: '#f75a00'
//                     }
//                 },
//             },
//             itemStyle: {
//                 normal: {
//                     areaColor: 'rgba(51, 204, 255,0.6)',
//                     borderColor: '#104E8B',
//                     borderType: 'dotted',
//                     borderWidth: 0.5,
//                     // areaColor: '#24CFF4',
//                     // borderColor: '#53D9FF',
//                     // shadowBlur: 15,
//                     // shadowColor: 'rgb(58,115,192)',
//                     // shadowOffsetX: 1,
//                     // shadowOffsetY: 1,

//                 },
//                 emphasis: {
//                     areaColor: '#8dd7fc',
//                     borderWidth: 2, //设置外层边框
//                     borderColor: '#66ccff',
//                     borderType: 'solid',
//                     shadowBlur: 25,
//                 }
//             },
//             regions: [{
//                 name: "南海诸岛",
//                 value: 0,
//                 itemStyle: {
//                     normal: {
//                         opacity: 0,
//                         label: {
//                             show: false
//                         }
//                     }
//                 }
//             }]

//         },
//         series: series
//     };
//     myChart.setOption(option);
//     myChart.off('click');
//     myChart.on('click', echartsMapClick);
// })
// //echarts点击事件
// function echartsMapClick(params) {
//     console.log(params)
// }