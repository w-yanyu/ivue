import {
  cloneJSON
} from '@jsmini/clone';

const RE_NUMBER = /^\d+(\.\d+)?$/;

export default {
  // 转化最终数据格式为自定义数据格式
  cvtOrigin2Custom(data) {
    console.log('将natureExpression 的json转成数据类', data);
    let res = {
      type: 'all_any',
      condition: 'all',
      children: [],
    };
    if (data.all !== undefined) {
      res.condition = 'all';
      data.all.leftType = data.all.dataType
      for (const child of data.all) {
        console.log('data.all !== undefined     data.all', data.all);
        console.log('data.all !== undefined    child', child);
        // const tempChild = cloneJSON(child);
        // const tempChild = deepClone(child);
        const tempChild = child
        console.log('data.all !== undefined     tempChild', tempChild);
        if (tempChild.all !== undefined || tempChild.any !== undefined) {
          res.children.push(this.cvtOrigin2Custom(tempChild));
          console.log('data.all !== undefined     1111111', res);
        } else {
          tempChild.type = 'condition';
          // console.log('data.all !== undefined   tempChild.leftType==', tempChild.leftType);
          // tempChild.leftType = typeof tempChild.value;
          // console.log('data.all !== undefined22222   tempChild.leftType==', tempChild.leftType);
          res.children.push(tempChild);
          console.log('data.all !== undefined     22222', res);
        }
      }
    } else if (data.any !== undefined) {
      res.condition = 'any';
      for (const child of data.any) {
        console.log('data.any !== undefined     data.any', data.any);
        const tempChild = cloneJSON(child);
        if (tempChild.all !== undefined || tempChild.any !== undefined) {
          res.children.push(this.cvtOrigin2Custom(tempChild));
        } else {
          tempChild.type = 'condition';
          // console.log('data.any !== undefined   tempChild.leftType==', tempChild.leftType);
          // tempChild.leftType = typeof tempChild.value;
          // console.log('data.any !== undefined22222   tempChild.leftType==', tempChild.leftType);
          res.children.push(tempChild);
        }
      }
    }
    console.log('将natureExpression 的json转成数据类最终的结果输出', res);
    return res;
  },
  // 转化最终数据格式为自定义数据格式
  cvtOrigin2CustomForOne(data) {
    console.log('将natureExpression 的json转成数据类给单条数据使用', data);
    let res = {
      type: 'all_any',
      condition: 'all',
      children: [],
    };
    if (data.all !== undefined) {
      res.condition = 'all';
      data.all.leftType = data.all.dataType
      for (const child of data.all) {
        console.log('data.all !== undefined     data.all', data.all);
        console.log('data.all !== undefined    child', child);
        // const tempChild = cloneJSON(child);
        // const tempChild = deepClone(child);
        const tempChild = child
        console.log('data.all !== undefined     tempChild', tempChild);
        if (tempChild.all !== undefined || tempChild.any !== undefined) {
          res.children.push(this.cvtOrigin2Custom(tempChild));
          console.log('data.all !== undefined     1111111', res);
        } else {
          tempChild.type = 'condition';
          // console.log('data.all !== undefined   tempChild.leftType==', tempChild.leftType);
          // tempChild.leftType = typeof tempChild.value;
          // console.log('data.all !== undefined22222   tempChild.leftType==', tempChild.leftType);
          res.children.push(tempChild);
          console.log('data.all !== undefined     22222', res);
        }
      }
    } else if (data.any !== undefined) {
      res.condition = 'any';
      for (const child of data.any) {
        console.log('data.any !== undefined     data.any', data.any);
        const tempChild = cloneJSON(child);
        if (tempChild.all !== undefined || tempChild.any !== undefined) {
          res.children.push(this.cvtOrigin2Custom(tempChild));
        } else {
          tempChild.type = 'condition';
          // console.log('data.any !== undefined   tempChild.leftType==', tempChild.leftType);
          // tempChild.leftType = typeof tempChild.value;
          // console.log('data.any !== undefined22222   tempChild.leftType==', tempChild.leftType);
          res.children.push(tempChild);
        }
      }
    }
    console.log('将natureExpression 的json转成数据类最终的结果输出', res);
    return res;

  },
  //将规则设置类转译成规则描述 有中文
  cvtZhRule(data) {
    //debugger;
    console.log('将规则设置类转译成规则描述有中文---准备 解析 打印规则设置类', data);
    let rs = '(';
    let bs = '';
    let logic = ''
    //子条件按钮  all_any（显示添加条件按钮 子条件按钮）  添加条件按钮 condition（显示规则设置相关控件）
    //外层是子条件类型，说明children 需要遍历解析
    if (data.type === 'all_any') {
      // for (const child of data.children) {
      //遍历children 里面的数据
      data.children.forEach((child, index) => {
        //克隆 children内子项数据 避免修改源数据
        const tempChild = cloneJSON(child);
        logic = ''
        console.log('tempChild`````````````', tempChild);
        console.log('bs`````````````', bs);
        console.log('rs`````````````', rs);
        console.log('logic`````````````````````', logic);
        //子项里是否含有子条件类型，有的话，需要递归遍历
        if (tempChild.type === 'all_any') {
          console.log('遍历index==', index);
          //递归遍历返回的转译字符串
          let backStr = this.cvtZhRule(tempChild);
          console.log('递归返回的字符串', backStr);
          //如果是第一项遍历
          if (index === 0) {
            //缓存字符串拼接递归字符串
            bs = bs + backStr
            //
          } else if (data.condition === 'all') {
            // bs = bs + ' 且 ' + backStr
            bs = bs + backStr

          } else {
            bs = bs + ' ' + backStr
          }

          console.log("递归拼接新的字符串", bs);
          //添加条件按钮点击
        } else if (tempChild.type === "condition") {
          // console.log("tempChild.type === 444444444444444444444444444444444444", RE_NUMBER.test(String(tempChild.rightValue)));
          if (tempChild.leftType && tempChild.leftType === 'Int' && RE_NUMBER.test(String(tempChild
              .rightValue))) { //左边选择了int型 右边坑填写有数值
            tempChild.rightValue = Number(tempChild.rightValue); //右边坑主动转成数值型
            // console.log("tempChild.type === 'condition'  tempChild.rightValue", tempChild.rightValue);
          } else if (tempChild.leftType && tempChild.leftType === 'String') { //如果左边选择了字符串型
            tempChild.rightValue = String(tempChild.rightValue); //右边坑转字符串行
            // console.log("tempChild.type === 'condition'  empChild.leftType === 'String'", tempChild.rightValue);
            if (tempChild.rightValueBetween) { //如果有特殊情况的输入 右边第二坑转字符串类型
              tempChild.rightValueBetween = String(tempChild.rightValueBetween);
              // console.log("tempChild.type === 'condition'  empChild.leftType === 33333333 ", tempChild .rightValueBetween);
            }
          }

          //如果只添加了一个条件，那么logic=‘’
          if (data.children.length === 1) {
            console.log('11111', tempChild);
            logic = ''
          } else if (data.condition === 'all') {
            // console.log('22222', tempChild);
            // console.log('bs3333', bs);
            // console.log('rs3333', rs);
            logic = ' 且 '
          } else {
            logic = ' 或者 '
          }

          console.log('logic', logic);
          // 删除多余字段
          // delete tempChild.type;
          // delete tempChild.leftType;
          if (tempChild.operator && tempChild.operator === 'IN' || tempChild.operator === 'POW' || tempChild
            .operator === 'NOT_IN' ||
            tempChild.operator === 'BETWEEN' || tempChild.operator === 'LIKE' || tempChild.operator ===
            'NOT_LIKE' ||
            tempChild.operator === 'STARTSWITH' || tempChild.operator === 'NOT_STARTSWITH' ||
            tempChild.operator === 'ENDSWITH' || tempChild.operator === 'NOT_ENDSWITH'
          ) { //特定操作符的转译
            bs = bs + cvtZhRuleContxt(tempChild.operator, tempChild, logic)
            // console.log('规则描述 有中文 存在特殊场景的选择11111', bs);
          } else { //普通操作符号的转译,如等于
            if (tempChild.centerBtnType && tempChild.centerBtnType === 'variable') { //选择变量的时候
              if (tempChild.rightValueBtnType === 'input') {
                bs = bs + '(' + tempChild.leftDesc + '' + opertatorContxt(tempChild.operator) + '' + tempChild
                  .rightDesc +
                  opertatorContxt(tempChild.rightSelect) + tempChild.rightValue + ')'
              } else {
                bs = bs + '(' + tempChild.leftDesc + '' + opertatorContxt(tempChild.operator) + '' + tempChild
                  .rightDesc +
                  opertatorContxt(tempChild.rightSelect) + tempChild.rightValueDesc + ')'
              }
              // console.log('规则描述 有中文 选择了常量按钮的情况22222', bs);
            } else { //选择常量的时候
              if (tempChild.rightValueBtnType === 'input') {
                console.log('tempChild.rightValue', tempChild.rightValue);
                let rightValue = tempChild.rightValue === "true" ? '真' : tempChild.rightValue === "false" ? '假' :
                  tempChild.rightValue
                bs = bs + tempChild.leftDesc + '' + opertatorContxt(tempChild.operator) + '' + rightValue

                // console.log('规则描述 有中文 正常场景的情况33333333', bs);
              } else {
                bs = bs + tempChild.leftDesc + '' + opertatorContxt(tempChild.operator) + '' + tempChild
                  .rightValueDesc
              }
            }
          }
          // console.log('bs = bs + logi11111111111111111', logic);
          // console.log(' bs = bs + logic  bs22222222222222222', bs);
        }
        // console.log('bs = bs + logic33333333', logic);
        // console.log(' bs = bs + logic  bs44444444', bs);
        if (index != data.children.length - 1) {
          bs = bs + logic;
        }
        // console.log(' bs = bs + logic  bs7777777', bs);
      });


      // console.log('循环完成后的bs', bs);
      // console.log('循环完成后的rs', rs);
      // console.log('循环完成后的logic', logic);
    }
    // if (data.children.length >= 2  ) {
    //   console.log('data.children.length >= 2  befor', bs);
    //   bs = bs.substr(0, bs.length - 3);
    //   console.log('data.children.length >= 2  after', bs);
    // }
    // console.log('rs = rs + bs55555555', bs);
    // console.log('rs = rs + bs666666666', rs);
    rs = rs + bs + ')'
    // console.log('规则描述 有中文---完成解析', rs);
    return rs;
  },
  //一共给单个条件用的解析
  cvtZhRuleForOne(data) {
    //debugger;
    console.log('将规则设置类转译成规则描述有中文---准备 解析 打印规则设置类', data);
    let rs = '';
    let bs = '';
    let logic = '';
    //克隆 children内子项数据 避免修改源数据
    const tempChild = cloneJSON(data);
    logic = ''
    // console.log('tempChild`````````````', tempChild);
    // console.log('bs`````````````', bs);
    // console.log('rs`````````````', rs);
    // console.log('logic`````````````````````', logic);
    //子项里是否含有子条件类型，有的话，需要递归遍历
    // console.log("tempChild.type === 444444444444444444444444444444444444", RE_NUMBER.test(String(tempChild.rightValue)));
    if (tempChild.leftType && tempChild.leftType === 'Int' && RE_NUMBER.test(String(tempChild
        .rightValue))) { //左边选择了int型 右边坑填写有数值
      tempChild.rightValue = Number(tempChild.rightValue); //右边坑主动转成数值型
      // console.log("tempChild.type === 'condition'  tempChild.rightValue", tempChild.rightValue);
    } else if (tempChild.leftType && tempChild.leftType === 'String') { //如果左边选择了字符串型
      tempChild.rightValue = String(tempChild.rightValue); //右边坑转字符串行
      // console.log("tempChild.type === 'condition'  empChild.leftType === 'String'", tempChild.rightValue);
      if (tempChild.rightValueBetween) { //如果有特殊情况的输入 右边第二坑转字符串类型
        tempChild.rightValueBetween = String(tempChild.rightValueBetween);
        // console.log("tempChild.type === 'condition'  empChild.leftType === 33333333 ", tempChild .rightValueBetween);
      }
    }

    // 删除多余字段
    // delete tempChild.type;
    // delete tempChild.leftType;
    if (tempChild.operator && tempChild.operator === 'IN' || tempChild.operator === 'POW' || tempChild.operator ===
      'NOT_IN' ||
      tempChild.operator === 'BETWEEN' || tempChild.operator === 'LIKE' || tempChild.operator === 'NOT_LIKE' ||
      tempChild.operator === 'STARTSWITH' || tempChild.operator === 'NOT_STARTSWITH' ||
      tempChild.operator === 'ENDSWITH' || tempChild.operator === 'NOT_ENDSWITH'
    ) { //特定操作符的转译
      bs = bs + cvtZhRuleContxt(tempChild.operator, tempChild, logic)
      // console.log('规则描述 有中文 存在特殊场景的选择11111', bs);
    } else { //普通操作符号的转译,如等于
      if (tempChild.centerBtnType && tempChild.centerBtnType === 'variable') { //选择变量的时候
        if (tempChild.rightValueBtnType === 'input') {
          bs = bs + '' + tempChild.leftDesc + '' + opertatorContxt(tempChild.operator) + '' + tempChild.rightDesc +
            opertatorContxt(tempChild.rightSelect) + tempChild.rightValue + ''
        } else {
          bs = bs + '' + tempChild.leftDesc + '' + opertatorContxt(tempChild.operator) + '' + tempChild.rightDesc +
            opertatorContxt(tempChild.rightSelect) + tempChild.rightValueDesc + ''
        }
        // console.log('规则描述 有中文 选择了常量按钮的情况22222', bs);
      } else { //选择常量的时候
        if (tempChild.rightValueBtnType === 'input') {
          // console.log('tempChild.rightValue', tempChild.rightValue);
          let rightValue = tempChild.rightValue === "true" ? '真' : tempChild.rightValue === "false" ? '假' : tempChild
            .rightValue
          bs = bs + tempChild.leftDesc + '' + opertatorContxt(tempChild.operator) + '' + rightValue

          // console.log('规则描述 有中文 正常场景的情况33333333', bs);
        } else {
          bs = bs + tempChild.leftDesc + '' + opertatorContxt(tempChild.operator) + '' + tempChild.rightValueDesc
        }
      }
    }
    // console.log('bs = bs + logi11111111111111111', logic);
    // console.log(' bs = bs + logic  bs22222222222222222', bs);
    // console.log('bs = bs + logic33333333', logic);
    // console.log(' bs = bs + logic  bs44444444', bs);
    // console.log('tempChild`````````````', tempChild);
    // console.log('bs`````````````', bs);
    // console.log('rs`````````````', rs);
    // console.log('logic`````````````````````', logic);
    bs = bs + logic;
    // console.log(' bs = bs + logic  bs7777777', bs);


    rs = rs + bs + ''
    console.log('将规则设置类转译成规则描述有中文---完成解析 解析 打印规则设置类', rs);
    return rs;
  },

  // 将规则设置类转译成规则表达式 只有公式
  cvtRule(data) {
    //debugger;
    console.log('规则表达式 没有中文---准备解析', data);
    let rs = "(";
    let bs = '';
    let logic = '';
    if (data.type === 'all_any') {
      // for (const child of data.children) {
      data.children.forEach((child, index) => {
        logic = '';
        const tempChild = cloneJSON(child);
        if (tempChild.type === 'all_any') {
          if (index === 0) {
            bs = bs + this.cvtRule(tempChild)
          } else if (data.condition === 'all') {
            // bs = bs + ' && ' + this.cvtRule(tempChild)
            bs = bs + this.cvtRule(tempChild)
          } else {
            bs = bs + ' ' + this.cvtRule(tempChild)
          }
          console.log('规则表达式 没有中文---递归后的解析', bs);
        } else if (tempChild.type === 'condition') {
          if (tempChild.leftType && tempChild.leftType === 'Int' && RE_NUMBER.test(String(tempChild.rightValue))) {
            if (tempChild.rightValueBtnType == 'input') {
              tempChild.rightValue = Number(tempChild.rightValue);
              console.log('规则表达式 没有中文---1111111', tempChild.rightValue);
            }
          } else if (tempChild.leftType && tempChild.leftType === 'String') {
            if (tempChild.rightValue.indexOf(',') != -1 && tempChild.operator === 'IN' || tempChild.rightValue
              .indexOf(',') != -1 && tempChild.operator === 'NOT_IN') {
              let tempStr = tempChild.rightValue.split(",");
              let valueStr = '';
              for (const strChild of tempStr) {
                valueStr = valueStr + '"' + strChild + '",';
              }
              //删除间隔最后一组的，号
              tempChild.rightValue = valueStr.substr(0, valueStr.length - 1);
              console.log('规则表达式 没有中文---22222', tempChild.rightValue);
            } else if (tempChild.rightValueBtnType === 'input') {
              tempChild.rightValue = '"' + String(tempChild.rightValue) + '"';
            } else {
              tempChild.rightValue = String(tempChild.rightValue);
            }

            console.log('规则表达式 没有中文---333333', tempChild.rightValue);
            if (tempChild.rightValueBetween) {
              if (tempChild.rightValueBetween.indexOf(',') != -1) {
                let tempStr = tempChild.rightValueBetween.split(",");
                let valueStr = '';
                for (const strChild of tempStr) {
                  valueStr = valueStr + '"' + strChild + '",';
                }
                tempChild.rightValueBetween = valueStr.substr(0, valueStr.length - 1);
                console.log('规则表达式 没有中文---4444444', tempChild.rightValueBetween);
              } else
                tempChild.rightValueBetween = '"' + String(tempChild.rightValueBetween) + '"';
              console.log('规则表达式 没有中文---5555555555', tempChild.rightValueBetween);
            }
          }
          // logic = '';
          if (data.children.length === 1) {
            logic = ''
          } else if (data.condition === 'all') {
            logic = '&&'
          } else {
            logic = '||'
          }
          // 删除多余字段
          // delete tempChild.type;
          //     delete tempChild.leftType;
          if (tempChild.operator && tempChild.operator === 'IN' || tempChild.operator === 'NOT_IN' || tempChild
            .operator === 'POW' || tempChild
            .operator === 'BETWEEN' ||
            tempChild.operator === 'LIKE' || tempChild.operator === 'NOT_LIKE' || tempChild.operator ===
            'STARTSWITH' ||
            tempChild.operator === 'NOT_STARTSWITH' ||
            tempChild.operator === 'ENDSWITH' || tempChild.operator === 'NOT_ENDSWITH'
          ) {
            bs = bs + cvtRuleContxt(tempChild.operator, tempChild, logic)
            console.log('规则表达式 没有中文---666666666666666', bs);
          } else {
            if (tempChild.centerBtnType && tempChild.centerBtnType === 'variable') {
              bs = bs + "(" + tempChild.left + '' + tempChild.operator + '' + tempChild.right + tempChild
                .rightSelect +
                tempChild.rightValue + ")"
              console.log('规则表达式 没有中文---7777777777777777777', bs);
            } else {
              bs = bs + tempChild.left + '' + tempChild.operator + '' + tempChild.rightValue
              console.log('规则表达式 没有中文---888888888888888', bs);
            }
          }
        }
        if (index != data.children.length - 1) {
          bs = bs + logic;
        }
      });
    }
    // if (data.children.length >= 2 ) {
    //   // console.log('规则表达式 没有中文---data.children.length >= 2', bs);
    //   bs = bs.substr(0, bs.length - 3);
    //   // console.log('规则表达式 没有中文---data.children.length >= 2 1', bs);
    // }
    rs = rs + bs + ")"
    // console.log('规则表达式 没有中文---完成解析', data);
    return rs;
  },
  //为单条数据做解析
  cvtRuleForOne(data) {
    console.log('规则表达式 没有中文---准备解析', data);
    let rs = "";
    let bs = '';
    let logic = '';
    // for (const child of data.children) {
    logic = '';
    const tempChild = cloneJSON(data);
    if (tempChild.leftType && tempChild.leftType === 'Int' && RE_NUMBER.test(String(tempChild.rightValue))) {
      if (tempChild.rightValueBtnType == 'input') {
        tempChild.rightValue = Number(tempChild.rightValue);
        // console.log('规则表达式 没有中文---1111111', tempChild.rightValue);
      }
    } else if (tempChild.leftType && tempChild.leftType === 'String') {
      if (tempChild.rightValue.indexOf(',') != -1 && tempChild.operator === 'IN' || tempChild.rightValue
        .indexOf(',') != -1 && tempChild.operator === 'NOT_IN') {
        let tempStr = tempChild.rightValue.split(",");
        let valueStr = '';
        for (const strChild of tempStr) {
          valueStr = valueStr + '"' + strChild + '",';
        }
        //删除间隔最后一组的，号
        tempChild.rightValue = valueStr.substr(0, valueStr.length - 1);
        // console.log('规则表达式 没有中文---22222', tempChild.rightValue);
      } else if (tempChild.rightValueBtnType === 'input') {
        tempChild.rightValue = '"' + String(tempChild.rightValue) + '"';
      } else {
        tempChild.rightValue = String(tempChild.rightValue);
      }

      // console.log('规则表达式 没有中文---333333', tempChild.rightValue);
      if (tempChild.rightValueBetween) {
        if (tempChild.rightValueBetween.indexOf(',') != -1) {
          let tempStr = tempChild.rightValueBetween.split(",");
          let valueStr = '';
          for (const strChild of tempStr) {
            valueStr = valueStr + '"' + strChild + '",';
          }
          tempChild.rightValueBetween = valueStr.substr(0, valueStr.length - 1);
          // console.log('规则表达式 没有中文---4444444', tempChild.rightValueBetween);
        } else
          tempChild.rightValueBetween = '"' + String(tempChild.rightValueBetween) + '"';
        // console.log('规则表达式 没有中文---5555555555', tempChild.rightValueBetween);
      }
    }
    // logic = '';
    if (data.condition === 'all') {
      logic = '&&'
    } else {
      logic = '||'
    }
    // 删除多余字段
    // delete tempChild.type;
    //     delete tempChild.leftType;
    if (tempChild.operator && tempChild.operator === 'IN' || tempChild.operator === 'NOT_IN' || tempChild
      .operator === 'POW' || tempChild
      .operator === 'BETWEEN' ||
      tempChild.operator === 'LIKE' || tempChild.operator === 'NOT_LIKE' || tempChild.operator ===
      'STARTSWITH' ||
      tempChild.operator === 'NOT_STARTSWITH' ||
      tempChild.operator === 'ENDSWITH' || tempChild.operator === 'NOT_ENDSWITH'
    ) {
      bs = bs + cvtRuleContxt(tempChild.operator, tempChild, logic)
      // console.log('规则表达式 没有中文---666666666666666', bs);
    } else {
      if (tempChild.centerBtnType && tempChild.centerBtnType === 'variable') {
        bs = bs + "(" + tempChild.left + '' + tempChild.operator + '' + tempChild.right + tempChild
          .rightSelect +
          tempChild.rightValue + ")"
        // console.log('规则表达式 没有中文---7777777777777777777', bs);
      } else {
        bs = bs + tempChild.left + '' + tempChild.operator + '' + tempChild.rightValue
        // console.log('规则表达式 没有中文---888888888888888', bs);
      }
    }


    // if (data.children.length >= 2 ) {
    //   // console.log('规则表达式 没有中文---data.children.length >= 2', bs);
    //   bs = bs.substr(0, bs.length - 3);
    //   // console.log('规则表达式 没有中文---data.children.length >= 2 1', bs);
    // }
    rs = rs + bs + ""
    console.log('规则表达式 没有中文---完成解析', rs);
    return rs;
  },
  cvtRuleRvl(data, cs) {
    // console.log("cvtRule数据结构", data)
    let rs = "(";
    let bs = '';
    let logic = '';
    const res = {};
    if (data.type === 'all_any') {
      res[data.condition] = [];
      for (const child of data.children) {
        const tempChild = cloneJSON(child);
        if (tempChild.type === 'all_any') {
          res[data.condition].push(this.cvtRuleRvl(tempChild, cs));
        } else if (tempChild.type === 'condition') {
          if (tempChild.leftType && tempChild.leftType === 'Int' && RE_NUMBER.test(String(tempChild.rightValue))) {
            tempChild.rightValue = Number(tempChild.rightValue);
          } else if (tempChild.leftType && tempChild.leftType === 'String') {
            tempChild.rightValue = String(tempChild.rightValue);
          }
          logic = '';
          if (data.children.length === 1) {
            logic = ''
          } else if (data.condition === 'all') {
            logic = '&&'
          } else {
            logic = '||'
          }
          // 删除多余字段
          delete tempChild.type;
          delete tempChild.leftType;
          bs = bs + tempChild.left + '' + tempChild.operator + '' + tempChild.rightValue
          res[data.condition].push(tempChild);
        }
        bs = bs + logic;
      }
    }
    rs = cs + rs + bs + ")"
    return rs;
  },
  //规则自然语言表达式转译方法
  cvtCustom2Origin(data) {
    // console.log("保存提交时的json格式化", data)
    // const res = {};
    let res = {};
    // console.log("cvtCustom2Origin+++res", res)
    if (data.type === 'all_any') {
      res[data.condition] = [];
      // console.log('cvtCustom2Origin---res', res);
      for (const child of data.children) {
        const tempChild = cloneJSON(child);
        // console.log('cvtCustom2Origin---tempChild', res);
        if (tempChild.type === 'all_any') {
          res[data.condition].push(this.cvtCustom2Origin(tempChild));
          // console.log('all_any', res);
        } else if (tempChild.type === 'condition') {
          if (tempChild.leftType && tempChild.leftType === 'Int' && RE_NUMBER.test(String(tempChild.rightValue))) {
            tempChild.rightValue = Number(tempChild.rightValue);
            // console.log('cvtCustom2Origin---Int', tempChild);
          } else if (tempChild.leftType && tempChild.leftType === 'String') {
            tempChild.rightValue = String(tempChild.rightValue);
            // console.log('cvtCustom2Origin---String', tempChild);
          }
          // tempChild.dataType=tempChild.leftType
          // 删除多余字段
          delete tempChild.type;
          // delete tempChild.leftType;
          res[data.condition].push(tempChild);
        }
      }
    }
    console.log('规则自然语言表达式转译方法 最终输出字符串', res);
    return res;
  },

  cvtCustom2OriginForOne(data) {
    console.log("保存提交时的json格式化", data)
    // const res = {};
    let res = {};
    // console.log("cvtCustom2Origin+++res", res)
    // console.log('cvtCustom2Origin---res', res);
    const tempChild = data;
    console.log('cvtCustom2Origin---tempChild', res);
    if (tempChild.leftType && tempChild.leftType === 'Int' && RE_NUMBER.test(String(tempChild.rightValue))) {
      tempChild.rightValue = Number(tempChild.rightValue);
      // console.log('cvtCustom2Origin---Int', tempChild);
    } else if (tempChild.leftType && tempChild.leftType === 'String') {
      tempChild.rightValue = String(tempChild.rightValue);
      // console.log('cvtCustom2Origin---String', tempChild);
    }
    // tempChild.dataType=tempChild.leftType
    // 删除多余字段
    delete tempChild.type;
    // delete tempChild.leftType;
    res = tempChild

    console.log('规则自然语言表达式转译方法 最终输出字符串', res);
    return res;
  },
};

let cvtRuleContxt = function(level, tempChild, logic) {
  return strategies[level](tempChild, logic);
};
let strategies = {
  "": function(tempChild, logic) {
    return "";
  },
  "IN": function(tempChild, logic) {
    let strRule = "include(seq.set";
    let forStr = '';
    let arr = '';
    if (tempChild.leftType === 'String') {
      arr = tempChild.rightValue.slice(1, tempChild.rightValue.length - 1).split('|')
      arr.forEach(b => forStr = forStr + '"' + b + '"' + ",")
      return strRule + "(" + forStr.substr(0, forStr.length - 1) + ")" + "," + tempChild.left + ")";
    } else {
      if (tempChild.rightValue !== null) {
        if (tempChild.rightValue.length > 0 && tempChild.rightValue.search('|') !== -1) {
          arr = tempChild.rightValue.split('|')
          arr.forEach(b => forStr = forStr + b + ",")
          forStr = forStr.substr(0, forStr.length - 1);
        } else {
          forStr = tempChild.rightValue;
        }
      }
      return strRule + "(" + forStr + ")" + "," + tempChild.left + ")";
    }
  },
  "NOT_IN": function(tempChild, logic) {
    let strRule = "!include(seq.set";
    let forStr = '';
    let arr = '';
    if (tempChild.leftType === 'String') {
      arr = tempChild.rightValue.slice(1, tempChild.rightValue.length - 1).split('|')
      arr.forEach(b => forStr = forStr + '"' + b + '"' + ",")
      return strRule + "(" + forStr.substr(0, forStr.length - 1) + ")" + "," + tempChild.left + ")";
    } else {
      if (tempChild.rightValue !== null) {
        if (tempChild.rightValue.length > 0 && tempChild.rightValue.search('|') !== -1) {
          arr = tempChild.rightValue.split('|')
          arr.forEach(b => forStr = forStr + b + ",")
          forStr = forStr.substr(0, forStr.length - 1);
        } else {
          forStr = tempChild.rightValue;
        }
      }
      return strRule + "(" + forStr + ")" + "," + tempChild.left + ")";
    }
  },
  "BETWEEN": function(tempChild, logic) {
    return '(' + tempChild.left + '' + '>' + '' + tempChild.rightValue + '&&' + tempChild.left + '' + '<' + '' +
      tempChild.rightValueBetween + ")";
  },
  "POW": function(tempChild, logic) {
    console.log("tempChild.leftDesc", tempChild.leftDesc);
    console.log("tempChild.rightValue", tempChild.rightValue);
    console.log("tempChild.rightValueBetween", tempChild.rightValueBetween);
    return `( ${ tempChild.left} >  math.pow(${tempChild.rightValue},${tempChild.rightValueBetween}))`;
  },
  "LIKE": function(tempChild, logic) {
    return '(string.containsIgnoreCase(' + tempChild.left + ',' + '' + tempChild.rightValue + '))';
  },
  "NOT_LIKE": function(tempChild, logic) {
    return '(!string.containsIgnoreCase(' + tempChild.left + ',' + '' + tempChild.rightValue + '))';
  },
  "STARTSWITH": function(tempChild, logic) {
    return '(string.startsWith(' + tempChild.left + ',' + '' + tempChild.rightValue + '))';
  },
  "NOT_STARTSWITH": function(tempChild, logic) {
    return '(!string.startsWith(' + tempChild.left + ',' + '' + tempChild.rightValue + '))';
  },
  "ENDSWITH": function(tempChild, logic) {
    return '(string.endsWith(' + tempChild.left + ',' + '' + tempChild.rightValue + '))';
  },
  "NOT_ENDSWITH": function(tempChild, logic) {
    return '(!string.endsWith(' + tempChild.left + ',' + '' + tempChild.rightValue + '))';
  }
};


let opertatorContxt = function(opertator) {
  return opertatorStrategies[opertator]();
};

let opertatorStrategies = {
  "": function() {
    return "";
  },
  '==': function() {
    return ' 等于 ';
  },
  '!=': function() {
    return ' 不等于 ';
  },
  '>': function() {
    return ' 大于 ';
  },
  '<': function() {
    return ' 小于 ';
  },
  '>=': function() {
    return ' 大于等于 ';
  },
  '<=': function() {
    return ' 小于等于 ';
  },
  '+': function() {
    return ' 加 ';
  },
  '*': function() {
    return ' 乘 ';
  },
  '-': function() {
    return ' 减 ';
  },
  '/': function() {
    return ' 除 ';
  },
};

//特定场景选择的转译
let cvtZhRuleContxt = function(operator, tempChild, logic) {
  // console.log('特色场景选择的转译---operator', operator);
  // console.log('特色场景选择的转译---tempChild', tempChild);
  // console.log('特色场景选择的转译---logic', logic);
  return strategiesZH[operator](tempChild, logic);
};

let strategiesZH = {
  "": function(tempChild, logic) {
    return "";
  },
  "IN": function(tempChild, logic) {
    let strRule = "(" + tempChild.leftDesc + " 在";
    let forStr = '';
    let arr = '';
    if (tempChild.leftType === 'String') {
      // arr = tempChild.rightValue.slice(1, tempChild.rightValue.length - 1).split('|')
      arr = tempChild.rightValue.split('|')
      console.log(arr);
      arr.forEach(b => forStr = forStr + '"' + b + '"' + ",")
      return strRule + " " + forStr.substr(0, forStr.length - 1) + " " + '范围内' + ")";
    } else {
      if (tempChild.rightValue !== null) {
        if (tempChild.rightValue.length > 0 && tempChild.rightValue.search('|') !== -1) {
          arr = tempChild.rightValue.split('|')
          arr.forEach(b => forStr = forStr + b + ",")
          forStr = forStr.substr(0, forStr.length - 1);
        } else {
          forStr = tempChild.rightValue;
        }
      }
      return strRule + " " + forStr + " " + '范围内' + ")";
    }
  },
  "NOT_IN": function(tempChild, logic) {
    let strRule = "(" + tempChild.leftDesc + " 不在";
    let forStr = '';
    let arr = '';
    if (tempChild.leftType === 'String') {
      // arr = tempChild.rightValue.slice(1, tempChild.rightValue.length - 1).split('|')
      arr = tempChild.rightValue.split('|')
      arr.forEach(b => forStr = forStr + '"' + b + '"' + ",")
      return strRule + "(" + forStr.substr(0, forStr.length - 1) + ")" + " " + '范围内' + ")";
    } else {
      if (tempChild.rightValue !== null) {
        if (tempChild.rightValue.length > 0 && tempChild.rightValue.search('|') !== -1) {
          arr = tempChild.rightValue.split('|')
          arr.forEach(b => forStr = forStr + b + ",")
          forStr = forStr.substr(0, forStr.length - 1);
        } else {
          forStr = tempChild.rightValue;
        }
      }
      return strRule + "(" + forStr + ")" + " " + '范围内' + ")";
    }
  },
  "BETWEEN": function(tempChild, logic) {
    return '(' + tempChild.leftDesc + ' ' + '在' + tempChild.rightValue + '与' + tempChild.rightValueBetween +
      '之间' +
      ")";
  },
  "POW": function(tempChild, logic) {
    return '(' + tempChild.leftDesc + ' ' + '大于' + tempChild.rightValue + '的' + tempChild.rightValueBetween +
      '次方' +
      ")";
  },
  "LIKE": function(tempChild, logic) {
    return '(' + tempChild.leftDesc + '包含' + tempChild.rightValue + ')';
  },
  "NOT_LIKE": function(tempChild, logic) {
    return '(' + tempChild.leftDesc + '不包含' + tempChild.rightValue + ')';
  },
  "STARTSWITH": function(tempChild, logic) {
    return '(' + tempChild.leftDesc + '开头是' + tempChild.rightValue + ')';
  },
  "NOT_STARTSWITH": function(tempChild, logic) {
    return '(' + tempChild.leftDesc + '开头不是' + tempChild.rightValue + ')';
  },
  "ENDSWITH": function(tempChild, logic) {
    return '(' + tempChild.leftDesc + '结尾是' + tempChild.rightValue + ')';
  },
  "NOT_ENDSWITH": function(tempChild, logic) {
    return '(' + tempChild.leftDesc + '结尾不是' + tempChild.rightValue + ')';
  }
};

function deepClone(obj, hash = new WeakMap()) {
  if (!isObject(obj)) {
    return obj
  }
  // 查表，防止循环拷贝
  if (hash.has(obj)) return hash.get(obj)

  let isArray = Array.isArray(obj)
  // 初始化拷贝对象
  let cloneObj = isArray ? [] : {}
  // 哈希表设值
  hash.set(obj, cloneObj)
  // 获取源对象所有属性描述符
  let allDesc = Object.getOwnPropertyDescriptors(obj)
  // 获取源对象所有的 Symbol 类型键
  let symKeys = Object.getOwnPropertySymbols(obj)
  // 拷贝 Symbol 类型键对应的属性
  if (symKeys.length > 0) {
    symKeys.forEach(symKey => {
      cloneObj[symKey] = isObject(obj[symKey]) ? deepClone(obj[symKey], hash) : obj[symKey]
    })
  }

  // 拷贝不可枚举属性,因为 allDesc 的 value 是浅拷贝，所以要放在前面
  cloneObj = Object.create(
    Object.getPrototypeOf(cloneObj),
    allDesc
  )
  // 拷贝可枚举属性（包括原型链上的）
  for (let key in obj) {
    cloneObj[key] = isObject(obj[key]) ? deepClone(obj[key], hash) : obj[key];
  }

  return cloneObj
}
// 判断是否为对象
function isObject(o) {
  return (typeof o === 'object' || typeof o === 'function') && o !== null
}
