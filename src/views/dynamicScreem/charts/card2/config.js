// 默认导出卡片配置项
export const option = {
    // 目前的单位是格子数！目前的单位是格子数！目前的单位是格子数！添加参数需要修改utils/index.js的参数解析
  kpzsmc: "card2", // 卡片展示名称
  kpid: "card2",  // 卡片id 需要与components/item里面组件名称对应上
  kd: 4, // 宽度
  gd: 4, // 高度
  x: 0, // 初始 x 位置
  y: 0, // 初始 y 位置
  zxkd: 2, // 最小宽度
  zxgd: 2, // 最小高度
  zdkd: 4, // 最大宽度
  zdgd: 4, // 最大高度
  titleName:"当日贷款进件趋势",//栏位标题
  unitName:"单位: 笔数",//栏位单位
  imgUrl:require(`../../assets/card2.png`),//图标预览图片
};
