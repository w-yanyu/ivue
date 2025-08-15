/*
 * @Author: weisiyi weisiyi@sunline.cn
 * @Date: 2023-11-21 16:57:02
 * @LastEditors: weisiyi weisiyi@sunline.cn
 * @LastEditTime: 2024-02-19 14:16:34
 * @FilePath: /ivue/src/util/validate.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */


/**
 * 校验方式，具体视情况使用
 * 表单校验使用例如：
 *  1、先在vue页面引入import { isvalidUsername } from "@/util/validate";
 *  2、在rules中具体字段如：
 *  username: [
      {
          required: true,
          trigger: "blur",
          message: "用户名不能为空",
      },
      {
        validator: (rule, value, callback) => {
          if (!isvalidUsername(value)) {
            callback("用户名输入格式有误！");
          }
        },
      },
  ],
 */

/* 合法用户名 大小写字母、数字及下划线 16位*/
export function isvalidUsername (str) {
  var reg = /^[a-zA-Z][a-zA-Z0-9_\-]{0,15}$/;
  return reg.test(str);
}

/* 合法uri*/
export function validateURL (textval) {
  const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
  return urlregex.test(textval);
}

/* 小写字母*/
export function validateLowerCase (str) {
  const reg = /^[a-z]+$/;
  return reg.test(str);
}

/* 大写字母*/
export function validateUpperCase (str) {
  const reg = /^[A-Z]+$/;
  return reg.test(str);
}

/* 大小写字母*/
export function validatAlphabets (str) {
  const reg = /^[A-Za-z]+$/;
  return reg.test(str);
}

/* 手机号码验证*/
export function validatePhone (str) {
  var myreg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
  return myreg.test(str);
}
/* 合法用户名 大小写字母、数字及下划线*/
export function checkUsername (str) {
  const reg = /^[a-zA-Z][a-zA-Z0-9_\-]/;
  return reg.test(str);
}
/*身份证检验 */
export function validateIdCard (str) {
  var myreg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
  return myreg.test(str);
}

/*邮箱检验 */
export function validateEmail (str) {
  var myreg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
  return myreg.test(str);
}

/*密码校验 */
export function validatePassword (str, reg) {
  var pwdRegex = new RegExp(reg);//'(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{8,20}'
  return pwdRegex.test(str);
}

/*正整数校验，可等于0*/
export function isPositiveInteger (s) {
  var re = /^[0-9]+$/;
  return re.test(s);
}

/*汉字检验*/
export function validateChinese (str) {
  var re = /.*[\u4e00-\u9fa5]+.*$/;
  return re.test(str);
}

/*大于0的正整数校验*/
export function validInteger (s) {
  var reg = /^\+?[1-9]\d*$/;
  return reg.test(s);
}

/*电话和手机号码格式校验 */
export function validateTelephone (s) {
  var isPhone = /^([0-9]{3,4}-)?[0-9]{7,8}$/;
  var isMob = /^[1][3,4,5,6,7,8][0-9]{9}$/;
  if (isMob.test(s) || isPhone.test(s)) {
      return true;
  } else {
      return false;
  }
}

/*只能填写正整数 */
export function validateOnlyNum (s) {
  var reg = /^[0-9]*$/;
  return reg.test(s);
}