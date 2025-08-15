/*
 * @Author: weisiyi weisiyi@sunline.cn
 * @Date: 2023-10-27 15:01:35
 * @LastEditors: weisiyi weisiyi@sunline.cn
 * @LastEditTime: 2023-10-27 15:15:21
 * @FilePath: /ivue/src/views/dynamicScreem/charts/cardMap1/map.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export const getMap = () => {
  // 获取 node_modules/echarts/map/json 文件夹下的所有 .json 配置项
  const config = require.context("../../../../../node_modules/echarts/map/json", true, /.json$/);
  console.log("获取地图所有文件==============", config);
  
  // 将得到的上下文作用域转为数组方便遍历
  const requireAll = (context) => context.keys().map(context);

  const mapUrl = '';
  requireAll(config).forEach((conf) => {
    console.log("进入地图循环===========conf", conf);
  });
  return mapUrl;
};
