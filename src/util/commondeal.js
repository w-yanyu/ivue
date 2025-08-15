/*
 * @Author: weisiyi weisiyi@sunline.cn
 * @Date: 2023-11-21 10:38:33
 * @LastEditors: weisiyi weisiyi@sunline.cn
 * @LastEditTime: 2024-01-31 09:33:41
 * @FilePath: /ivue/src/util/commondeal.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

/* eslint-disable no-param-reassign */

/**
 * 字符串转数字
 * 例如 “1234” 转换成 1234
 */
export function stringToNumber(val) {
  if (val) {
    let newVal = Number(val.toString())
    return newVal;
  }
}

/**
 * 保留两位小数，四舍五入,输出字符串
 */
export function stringToNumberFix2(val) {
  if (val) {
    let newVal;
    newVal = parseFloat(val).toFixed(2);
    return newVal
  }
}
/**
 * 保留两位小数，四舍五入,输出数字
 */
export function toDecimal2(val) { 
  var newVal = parseFloat(val);
  if (isNaN(newVal)) { 
   return;
  }
  newVal = Math.round(val * 100) / 100;
  return newVal;
 }
/**
 * 保留两位小数，不四舍五入向下取整,输出数字
 */
export function stringToNumberFloor2(val) {
  let newVal;
  newVal = Math.floor(val * 100) / 100;
  return newVal
}
/**
  * 字典值转换
  */
 export function formatDictData(data, list) {
  let name = '';
  (list || []).forEach(function(item, index){
      if (data === item.dictId){
        name = item.dictName;
      }
  })
  return name;
}

/**
 * 货币格式化，千份符且保留两位小数
 * @param {*} value 
 */
export function formatCurrency(value)  {
  const blankValue = '-';
  if (!value) {
    return blankValue;
  }
  try {
    value = Number(value);
  } catch (e) {
    return blankValue;
  }
  const currency = Number(value.toFixed(2)).toLocaleString('zh');
  // eslint-disable-next-line prefer-const
  let [int, float] = currency.split('.');
  if (!float || float.length < 2) {
    float = (float || '').padEnd(2, '0');
  }
  return `￥${int}.${float}`;
};

/**
 * 比率保留两位小数
 * @param {*} value 
 */
export function formatRate(value) {
  const blankValue = '-';
  if (!value) {
    return blankValue;
  }
  try {
    value = Number(value);
  } catch (e) {
    return blankValue;
  }
  const rate = value.toFixed(2);
  // eslint-disable-next-line prefer-const
  let [int, float] = rate.split('.');
  if (!float || float.length < 2) {
    float = (float || '').padEnd(2, '0');
  }
  return `${int}.${float}%`;
};

/**
 * 整数千分符
 * @param {*} number 
 */
export function filterComma(number) {
  const blankValue = '-';
  return (number ? String(number).replace(/(?=(\B\d{3})+$)/g, ',') : blankValue);
}
