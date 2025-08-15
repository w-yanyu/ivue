import {cloneJSON} from "@jsmini/clone";

export default {
  //树规则中文描述
  getTreeRuleDesc(data) {
    console.log("中文描述", data)
    let result = ''
    if (data.ruleOperate && data.ruleOperate === 'IN' || data.ruleOperate === 'POW' || data.operator === 'NOT_IN' || data.ruleOperate === 'BETWEEN' ||
      data.ruleOperate === 'LIKE' || data.ruleOperate === 'NOT_LIKE' || data.ruleOperate === 'STARTSWITH' ||
      data.ruleOperate === 'NOT_STARTSWITH' ||
      data.ruleOperate === 'ENDSWITH' || data.ruleOperate === 'NOT_ENDSWITH') {
      result = complexRuleZh(data.ruleOperate, data)
    } else {
      result = data.ruleLeftName + opertatorContxt(data.ruleOperate) + data.ruleRight
    }
    return result
  },
  //树规则表达式
  getTreeRuleExpress(data) {
    console.log("树规则表达式", data)
    let result = ''
    if (data.ruleOperate && data.ruleOperate === 'IN' || data.ruleOperate === 'POW' || data.operator === 'NOT_IN' || data.ruleOperate === 'BETWEEN' ||
      data.ruleOperate === 'LIKE' || data.ruleOperate === 'NOT_LIKE' || data.ruleOperate === 'STARTSWITH' ||
      data.ruleOperate === 'NOT_STARTSWITH' ||
      data.ruleOperate === 'ENDSWITH' || data.ruleOperate === 'NOT_ENDSWITH') {
      //复杂表达式
      result = getTreeRuleExpress(data.ruleOperate, data)
    } else {
      if (data.ruleLeftDataType === 'String') {
        result = data.ruleLeft + data.ruleOperate + '"' + data.ruleRight + '"'
      } else {
        result = data.ruleLeft + data.ruleOperate + data.ruleRight
      }
    }
    return result
  }
};


let opertatorContxt = function (opertator) {
  console.log('opertator',opertator);
  if(opertator){
     return opertatorStrategies[opertator]();
  }
  else
  return '';
 
};

let opertatorStrategies = {
  "": function () {
    return "";
  },
  '==': function () {
    return ' 等于 ';
  },
  '!=': function () {
    return ' 不等于 ';
  },
  '>': function () {
    return ' 大于 ';
  },
  '<': function () {
    return ' 小于 ';
  },
  '>=': function () {
    return ' 大于等于 ';
  },
  '<=': function () {
    return ' 小于等于 ';
  }
};


//特色场景选择的转译
let complexRuleZh = function (operator, data) {
  return strategiesZH[operator](data);
};

let strategiesZH = {
  "": function (data) {
    return "";
  },
  "IN": function (data) {
    let strRule = data.ruleLeftName + " 在";
    let forStr = '';
    let arr = '';
    if (data.ruleLeftDataType === 'String') {
      arr = data.ruleRight.split('|')
      arr.forEach(b => forStr = forStr + b + ",")
      return strRule + " " + forStr.substr(0, forStr.length - 1) + " " + '范围内';
    } else {
      if (data.ruleRight !== null) {
        if (data.ruleRight.length > 0 && data.ruleRight.search('|') !== -1) {
          arr = data.ruleRight.split('|')
          arr.forEach(b => forStr = forStr + b + ",")
          forStr = forStr.substr(0, forStr.length - 1);
        } else {
          forStr = data.ruleRight;
        }
      }
      return strRule + " " + forStr + " " + '范围内';
    }
  },
  "NOT_IN": function (data) {
    let strRule = data.ruleLeftName + " 不在";
    let forStr = '';
    let arr = '';
    if (data.ruleLeftDataType === 'String') {
      arr = data.ruleRight.split('|')
      arr.forEach(b => forStr = forStr + b + ",")
      return strRule + " " + forStr.substr(0, forStr.length - 1) + " " + '范围内';
    } else {
      if (data.ruleRight !== null) {
        if (data.ruleRight.length > 0 && data.ruleRight.search('|') !== -1) {
          arr = data.ruleRight.split('|')
          arr.forEach(b => forStr = forStr + b + ",")
          forStr = forStr.substr(0, forStr.length - 1);
        } else {
          forStr = data.ruleRight;
        }
      }
      return strRule + " " + forStr + " " + '范围内';
    }
  },
  "BETWEEN": function (data) {
    let rightValue = data.ruleRight.split("|")
    return data.ruleLeftName + ' ' + '在' + rightValue[0] + '与' + rightValue[1] + '之间';
  },
  "POW": function (data) {
    let rightValue = data.ruleRight.split("|")
    return data.ruleLeftName + ' ' + '大于' + rightValue[0] + '的' + rightValue[1] + '次方';
  },
  "LIKE": function (data) {
    return data.ruleLeftName + '包含' + data.ruleRight;
  },
  "NOT_LIKE": function (data) {
    return data.ruleLeftName + '不包含' + data.ruleRight;
  },
  "STARTSWITH": function (data) {
    return data.ruleLeftName + '开头是' + data.ruleRight;
  },
  "NOT_STARTSWITH": function (data) {
    return data.ruleLeftName + '开头不是' + data.ruleRight;
  },
  "ENDSWITH": function (data) {
    return data.ruleLeftName + '结尾是' + data.ruleRight;
  },
  "NOT_ENDSWITH": function (data) {
    return data.ruleLeftName + '结尾不是' + data.ruleRight;
  }
};


var getTreeRuleExpress = function (operater, data) {
  return complexFuntionExpressStrategies[operater](data);
};
var complexFuntionExpressStrategies = {
  "": function (data) {
    return "";
  },
  "IN": function (data) {
    var strRule = "include(seq.set";
    var forStr = '';
    if (data.ruleLeftDataType === 'String') {
      var arr = data.ruleRight.split('|')
      arr.forEach(b => forStr = forStr + '"' + b + '"' + ",")
      return strRule + "(" + forStr.substr(0, forStr.length - 1) + ")" + "," + data.ruleLeft + ")";
    } else {
      if (data.ruleRight !== null) {
        if (data.ruleRight.length > 0 && data.ruleRight.search('|') !== -1) {
          var arr = data.ruleRight.split('|')
          arr.forEach(b => forStr = forStr + b + ",")
          forStr = forStr.substr(0, forStr.length - 1);
        } else {
          forStr = data.ruleRight;
        }
      }
      return strRule + "(" + forStr + ")" + "," + data.ruleLeft + ")";
    }
  },
  "NOT_IN": function (data) {
    var strRule = "!include(seq.set";
    var forStr = '';
    if (data.ruleLeftDataType === 'String') {
      var arr = data.ruleRight.split('|')
      arr.forEach(b => forStr = forStr + '"' + b + '"' + ",")
      return strRule + "(" + forStr.substr(0, forStr.length - 1) + ")" + "," + data.ruleLeft + ")";
    } else {
      if (data.ruleRight !== null) {
        if (data.ruleRight.length > 0 && data.ruleRight.search('|') !== -1) {
          var arr = data.ruleRight.split('|')
          arr.forEach(b => forStr = forStr + b + ",")
          forStr = forStr.substr(0, forStr.length - 1);
        } else {
          forStr = data.ruleRight;
        }
      }
      return strRule + "(" + forStr + ")" + "," + data.ruleLeft + ")";
    }
  },
  "BETWEEN": function (data) {
    if (data.ruleRight.length > 0 && data.ruleRight.search('|') !== -1) {
      var arr = data.ruleRight.split('|')
      if (arr.length === 1 || arr.length >= 3) {
        return "error";
      }
      if (data.ruleLeftDataType === "String") {
        return data.ruleLeft + '' + '>=' + '' + '"' + arr[0] + '"' + '&&' + data.ruleLeft + '' + '<' + '' + '"' + arr[1] + '"';
      } else {
        return data.ruleLeft + '' + '>=' + '' + arr[0] + '&&' + data.ruleLeft + '' + '<' + '' + arr[1];
      }
    } else {
      return "error";
    }
  },
  "LIKE": function (data) {
    return '(string.containsIgnoreCase(' + data.ruleLeft + ',' + '' + data.ruleRight + '))';
  },
  "NOT_LIKE": function (data) {
    return '(string.containsIgnoreCase(' + data.ruleLeft + ',' + '' + data.ruleRight + '))';
  },
  "STARTSWITH": function (data) {
    return '(string.startsWith(' + data.ruleLeft + ',' + '' + data.ruleRight + '))';
  },
  "NOT_STARTSWITH": function (data) {
    return '(!string.startsWith(' + data.ruleLeft + ',' + '' + data.ruleRight + '))';
  },
  "ENDSWITH": function (data) {
    return '(string.endsWith(' + data.ruleLeft + ',' + '' + data.ruleRight + '))';
  },
  "NOT_ENDSWITH": function (data) {
    return '(!string.endsWith(' + data.ruleLeft + ',' + '' + data.ruleRight + '))';
  }
};
