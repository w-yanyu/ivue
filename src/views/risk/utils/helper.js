//reset From的校验
export function resetForm(ev) {
  $(ev.$el).find('.ivu-form-item a').removeClass('editable-unsaved');
  $(ev.$el).find('.ivu-form-item a').removeClass('active');
}

export function findPageByName(vm, name) {
  let allpages = vm.$store.state.card.pagesAllFlattern;
  for (let i = 0; i < allpages.length; i++) {
    let item = allpages[i];
    if (item.name) {
      if (name == item.name[0]) return item;
    }
  }
  return null;
}

export function urlExtractModule(url) {
  let parts = url.split('/');
  if (parts.length >= 3) {
    return parts[2];
  } else {
    return parts[1]
  }
}

//通过身份证获取出生日期及性别
export function IdCard(UUserCard, num) {
  if (num == 1) {
    let birth = '';
    birth = UUserCard.substring(6, 10) + "-" + UUserCard.substring(10, 12) + "-" + UUserCard.substring(12, 14);
    return birth;
  }
  if (num == 2) {
    if ((UUserCard.substring(17, 1) * 1) % 2 == 1) {
      return '0';
    } else {
      return '1';
    }
  }
}


export function findPageCate(vm, page) {
  let allCates = vm.$store.state.card.pagesAll;
  for (let i = 0; i < allCates.length; i++) {
    let cate = allCates[i];
    for (let j = 0; j < cate.childs.length; j++) {
      let item = cate.childs[j];
      if (item.name == page.name) return cate;
    }
  }
  return null;
}

export function deepClone(data) {
  let obj;
  let type = typeof data;
  if (Array.isArray(data)) {
    obj = [];
  } else if (data == null) {
    return null;
  } else if (data instanceof Date) {
    return data;
  } else if (type === 'object') {
    obj = {};
  } else {
    return data;
  }
  if (Array.isArray(data)) {
    for (let i = 0, len = data.length; i < len; i++) {
      obj.push(deepClone(data[i]))
    }
  }
  if (type === 'object') {
    for (let key in data) {
      obj[key] = deepClone(data[key]);
    }
  }
  return obj;
}

// export function checkData(data) {
//   let type = typeof data;
//   if (type == 'object') {
//     for (let item in data) {

//     }
//   }
// }

export function getFrontSeq(now, sign) {
  if (!sign) {
    sign = "MNG";
  }

  let y = now.getFullYear();
  let m = now.getMonth() + 1;
  let d = now.getDate();
  let h = now.getHours();
  let mm = now.getMinutes();
  let s = now.getSeconds();
  let ss = now.getMilliseconds();
  let str = sign + y + m + d + h + mm + s + ss + parseInt(1000000 * Math.random());
  return str;
}

export var deepDiffMapper = function() {
  return {
    VALUE_CREATED: 'created',
    VALUE_UPDATED: 'updated',
    VALUE_DELETED: 'deleted',
    VALUE_UNCHANGED: 'unchanged',
    map: function(obj1, obj2) {
      if (this.isFunction(obj1) || this.isFunction(obj2)) {
        throw 'Invalid argument. Function given, object expected.';
      }
      if (this.isValue(obj1) || this.isValue(obj2)) {
        return {
          type: this.compareValues(obj1, obj2),
          data: (obj1 === undefined) ? obj2 : obj1
        };
      }
      var diff = {};
      for (var key in obj1) {
        if (this.isFunction(obj1[key])) {
          continue;
        }

        var value2;
        if ('undefined' != typeof(obj2[key])) {
          value2 = obj2[key];
        }

        diff[key] = this.map(obj1[key], value2);
      }
      for (var key1 in obj2) {
        if (this.isFunction(obj2[key1]) || ('undefined' != typeof(diff[key1]))) {
          continue;
        }

        diff[key1] = this.map(undefined, obj2[key1]);
      }

      return diff;

    },
    compareValues: function(value1, value2) {
      if (value1 === value2) {
        return this.VALUE_UNCHANGED;
      }
      if (this.isDate(value1) && this.isDate(value2) && value1.getTime() === value2.getTime()) {
        return this.VALUE_UNCHANGED;
      }
      if ('undefined' == typeof(value1)) {
        return this.VALUE_CREATED;
      }
      if ('undefined' == typeof(value1)) {
        return this.VALUE_DELETED;
      }

      return this.VALUE_UPDATED;
    },
    isFunction: function(obj) {
      return {}.toString.apply(obj) === '[object Function]';
    },
    isArray: function(obj) {
      return {}.toString.apply(obj) === '[object Array]';
    },
    isDate: function(obj) {
      return {}.toString.apply(obj) === '[object Date]';
    },
    isObject: function(obj) {
      return {}.toString.apply(obj) === '[object Object]';
    },
    isValue: function(obj) {
      return !this.isObject(obj) && !this.isArray(obj);
    },
    extract: function(data, keys) {
      let typelist = ['unchanged', 'deleted', 'created', 'updated'],
        result = {};
      for (let k in data) {
        let v = data[k];
        if (this.isObject(v)) {
          if (v.type && typeof(v.data) != 'undefined' && typelist.indexOf(v.type) >= 0) {
            if (keys.indexOf(v.type) >= 0) {
              result[k] = v.data;
            }
          } else {
            let result_ = this.extract(v, keys);
            if (Object.keys(result_).length > 0) result[k] = result_;
          }
        } else if (this.isArray(v)) {
          let len = v.length,
            changedItems = [];
          for (let i = 0; i < len; i++) {
            let item = v[i];
            changedItems.push(this.extract(item, keys))
          }
          if (changedItems.length > 0) result[k] = changedItems;
        }
      }
      return result;
    }
  }
}();

// 测试上面的函数
let XYZ = deepDiffMapper.map({
  // a:'i am unchanged',
  // b:'i am deleted',
  // e:{ a: 1,b:false, c: null},
  // f: [1,{a: 'same',b:[{a:'same'},{d: 'delete'}]}],
  // g: new Date('2017.11.25'),
  i: { a: 2 }
}, {
  // a:'i am unchanged',
  // c:'i am created',
  // e:{ a: '1', b: '', d:'created'},
  // f: [{a: 'same',b:[{a:'same'},{c: 'create'}]},  {a: 'sam',b:[{a:'same'},{c: 'create'}]}],
  // g: new Date('2017.11.25'),
  i: {}
});
window.FFF = deepDiffMapper.extract(XYZ, ['updated']);


export function extractDomain(url) {
  let x = /http:\/\/(\w|\.|:|-)+/;
  let result = url.match(x);
  return result[0];
}

// 加密
export function RSAEncrypt(str) {
  let enc = new JSEncrypt();
  enc.setPublicKey('MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC4O6UcvNwYcog6R3ov5MHJvH5fXPgoq87yNbVISWj0UghH5/IOpINZVxlX4rsTSndr8zyJK1BhXhjNsY+EXEL9M6qg9S0ziI+PO/6DqPWXlqYqCIQExT1npI6NEIO4mGoFI1Ax/Ie4Se2kssz21ce++G9RBZUi6ULHJJYAJZfWVQIDAQAB');
  return enc.getKey().encrypt(str);
}

//type类型定义, type =1 商户类录入  type =2 非商户类录入  type = 3 溢缴款录入 type =4 卡转卡  type = 5购汇
export function mergeRow(routeName, arry, notNeedChangeRetrievalReferenceNumber) {
  console.log(arry, 'arry');
  if (routeName == "YJKL2" || routeName == "YJKLDetail" || routeName == "YJKLRefuse") {
    let arry1 = [];
    let arry2 = [];
    let count = 0;
    for (var i = 0; i < arry.length; i++) {
      if (i % 2 == 0) {
        arry1.push(arry[i]);
        count++
      } else {
        arry2.push(arry[i]);
      }
    }
    if (count == arry.length / 2) {
      for (let index in arry2) {
        arry1[index].transactionDescription2 = arry2[index].transactionDescription;
        arry1[index].transactionCode2 = arry2[index].transactionCode;
        arry1[index].transactionAmount2 = arry2[index].transactionAmount;
        arry1[index].virtualMerchantBankNumber2 = arry2[index].virtualMerchantBankNumber;
        arry1[index].transactionSource2 = arry2[index].transactionSource;
        arry1[index].transactionDate2 = arry2[index].transactionDate;
        if (arry2[index].statusMessage) {
          if (!arry1[index].statusMessage) {
            arry1[index].statusMessage = arry2[index].statusMessage;
          }
        }
      }
    }
    for (let index in arry1) {
      arry1[index].index = parseFloat(index) + 1;
      arry1[index].validateStatus = true;
      if (notNeedChangeRetrievalReferenceNumber) {
        arry1[index].notNeedChangeRetrievalReferenceNumber = true;
      }
    }
    return arry1;
  } else if (routeName == "KZKR2" || routeName == "KZKRDetail" || routeName == "KZKRRefuse") {
    let arry1 = [];
    let arry2 = [];
    let count = 0;
    for (let i = 0; i < arry.length; i++) {
      if (i % 2 == 0) {
        arry1.push(arry[i]);
        count++
      } else {
        arry2.push(arry[i]);
      }
    }
    if (count == arry.length / 2) {
      for (let index in arry2) {
        arry1[index].transactionDescription2 = arry2[index].transactionDescription;
        arry1[index].transactionCode2 = arry2[index].transactionCode;
        arry1[index].cardNumber2 = arry2[index].cardNumber;
        arry1[index].transactionDate2 = arry2[index].transactionDate;
        if (arry2[index].statusMessage) {
          if (!arry1[index].statusMessage) {
            arry1[index].statusMessage = arry2[index].statusMessage;
          }
        }
      }
    }
    for (let index in arry1) {
      arry1[index].index = parseFloat(index) + 1;
      arry1[index].validateStatus = true;
      if (notNeedChangeRetrievalReferenceNumber) {
        arry1[index].notNeedChangeRetrievalReferenceNumber = true;
      }
    }
    return arry1
  } else if (routeName == "GHJH2" || routeName == "GHJHDetail" || routeName == "GHJHRefuse") {
    let arry1 = [];
    let arry2 = [];
    let count = 0;
    for (let i = 0; i < arry.length; i++) {
      if (i % 2 == 0) {
        arry1.push(arry[i])
        count++
      } else {
        arry2.push(arry[i])
      }
    }
    if (count == arry.length / 2) {
      for (let index in arry2) {
        arry1[index].transactionDescription2 = arry2[index].transactionDescription;
        arry1[index].transactionCode2 = arry2[index].transactionCode;
        arry1[index].transactionAmount2 = arry2[index].transactionAmount;
        arry1[index].transactionCurrency2 = arry2[index].transactionCurrency;
        arry1[index].transactionDate2 = arry2[index].transactionDate;
        if (arry2[index].statusMessage) {
          if (!arry1[index].statusMessage) {
            arry1[index].statusMessage = arry2[index].statusMessage;
          }
        }
      }
    }
    for (let index in arry1) {
      arry1[index].index = parseFloat(index) + 1;
      arry1[index].validateStatus = true;
      if (notNeedChangeRetrievalReferenceNumber) {
        arry1[index].notNeedChangeRetrievalReferenceNumber = true;
      }
    }
    return arry1;
  } else if (routeName == "VASR2" || routeName == "FSHL2" || routeName == "FSHLDetail" || routeName == "VASRDetail" || routeName == "VASRRefuse" || routeName == "FSHLRefuse") {
    for (let index in arry) {
      arry[index].index = parseFloat(index) + 1;
      arry[index].validateStatus = true;
      arry[index].transactionDate2 = arry[index].transactionDate;
      arry[index].notNeedChangeRetrievalReferenceNumber = true;
    }
    return arry
  }
  return arry;
}

/**
 * 格式化证件号，卡号
 *
 * @param string{string} 需要格式化的字符串
 * @param formateType{Number}  格式化成何种类型 1表示4 4 4 4分割；2表示 6 8 4分割
 * @returns {string}
 */
export function formateCardNbr(string, formateType) {
  let mask = ""
  if (formateType === 1) {
    mask = "XXXX XXXX XXXX XXXX XXX"
  } else if (formateType == 2) {
    mask = "XXXXXX XXXXXXXX XXXX"
  } else {
    mask = "XXXX XXXX XXXX XXXX XXX"
  }
  if (!string) {
    return "空"
  }
  var formattedString = "";
  var numberPos = 0;
  for (var j = 0; j < mask.length; j++) {
    var currentMaskChar = mask[j];
    if (currentMaskChar == "X") {
      var digit = string.charAt(numberPos);
      if (!digit) {
        break;
      }
      formattedString += string.charAt(numberPos);
      numberPos++;
    } else {
      formattedString += currentMaskChar;
    }
  }
  return formattedString;
}
export function debounce(fn, delay) {
  var timer;
  return function() {
    var args = arguments;
    if (timer) {
      clearTimeout(timer);
    }


    timer = setTimeout(() => {
      console.log(this, 'thisthis')

      fn.apply(this, args)
    }, 500)
  }
}
