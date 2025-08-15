function renderText(vm, h, param, colCell) {
  let currentRow = param.row;
  let hProps;
  try {
    hProps = colCell.input.options.props;
  } catch (e) {
    hProps = {}
  }
  hProps = Object.assign({
    type: 'text',
    value: currentRow[colCell.key]
  }, hProps);
  let x = param.row._index,
    y = param.column._index;
  return h('Tooltip', {
    props: {
      placement: "top",
      content: colCell.invalidation[x],
      disabled: colCell.invalidation[x] ? false : true
    }
  }, [
    h('Input', {
      props: hProps,
      class: {
        invalid: colCell.invalidation[x],
      },
      attrs: {
        cellname: vm.cells[`${x}-${y}`]
      },
      on: {
        'on-blur': (event) => {
          let key = param.column.key,
            value = event.target.value;
          vm.edittingStore[param.index][key] = event.target.value;

          validateCell(vm, colCell, value, param.index, param.column._index);
          if (vm.recFlag) {
            return;
          }
          //vm.tableData = JSON.parse(JSON.stringify(vm.edittingStore));
        },
      }
    }),
  ]);
}


function renderSelect(vm, h, param, colCell) {
  let currentRow = param.row;
  let hOptions = colCell.input.options.map(one => {
    return h('Option', {
      props: {
        value: one.value,
      }
    }, one.label)
  });
  let x = param.row._index,
    y = param.column._index;
  return h('Tooltip', {
    props: {
      placement: 'top',
      content: colCell.invalidation[x],
      disabled: colCell.invalidation[x] ? false : true
    }
  }, [
    h('Select', {
      props: {
        value: currentRow[colCell.key]
      },
      class: {
        invalid: colCell.invalidation[x],
      },
      attrs: {
        cellname: vm.cells[`${x}-${y}`]
      },
      on: {
        'on-change': (v) => {
          let key = param.column.key;
          vm.edittingStore[param.index][key] = v;
          validateCell(vm, colCell, v, param.index, param.column._index);
          if (vm.recFlag) {
            return;
          }
        }
      }
    }, hOptions),
  ]);
}

function renderDate(vm, h, param, colCell) {
  // let currentRow = param.row;
  let hProps = colCell.input.options.props;
  if (colCell.key) {
    let hValue = param.row[colCell.key];
    hProps = Object.assign(hProps, {
      value: hValue
    });
  }
  let x = param.row._index,
    y = param.column._index;
  return h('Tooltip', {
    props: {
      placement: 'top',
      content: colCell.invalidation[x],
      disabled: colCell.invalidation[x] ? false : true
    }
  }, [
    h('DatePicker', {
      props: hProps,
      class: {
        invalid: colCell.invalidation[x],
      },
      attrs: {
        cellname: vm.cells[`${x}-${y}`]
      },
      on: {
        'on-change': (v) => {
          let key = param.column.key;
          vm.edittingStore[param.index][key] = v;
          validateCell(vm, colCell, v, param.index, param.column._index);
          if (vm.recFlag) {
            return;
          }
        }
      },
    })
  ]);
}

/*
export function validateCell(vm,colCell,value,index,k) {
    let flag=true;
    let cellClassNameObj={};
    if(colCell.key){
      if(!value){
        if(vm.edittingStore[index]['cellClassName']){
          for(let key in cellClassNameObj){
            if(colCell.key!=key){
              cellClassNameObj[key]='valid-cell';

            }else{
              cellClassNameObj[key]='';
            }
          }
        }else{//cellClassNameObj不存在创建并初始化属性
          vm.columns.forEach(function(col,index){
            if(col.key){
              cellClassNameObj[col.key]="";
            }
          });
          vm.edittingStore[index]['cellClassName']=cellClassNameObj;
          for(let key in cellClassNameObj){
            cellClassNameObj[key]='valid-cell';

          }
        }
        for (let i=0; i<colCell.validation.length; i++) {
            let vf = colCell.validation[i];
            let message = vf(null, value);
            if (message) {
              let invalidMsg="<span style='color:red'>"+message+"</span>"
              $(".ivu-table").find('tr').eq(index+1).find('td').eq(k).find('.table-cell-invalidation').append(invalidMsg);
                flag=false;
                break;
                  // colCell.invalid = true;
                //colCell.invalidMessage = message;
            }
        }
        flag=false;
    }else{
      if(!vm.edittingStore[index]['cellClassName']){
          vm.columns.forEach(function(col,index){
            if(col.key){
              cellClassNameObj[col.key]="";
            }
          });
          vm.edittingStore[index]['cellClassName']=cellClassNameObj;
      }
      vm.edittingStore[index]['cellClassName'][colCell.key]="";
    }
  }
    return flag;
}
*/

export function validateCell(vm, colCell, value, x, y) {
  colCell.invalidation = colCell.invalidation || {};
  colCell.invalidation[x] = "";
  let flag = true;

  if (colCell.validation) {
    for (let i = 0; i < colCell.validation.length; i++) {
      let vf = colCell.validation[i];
      let message = vf(null, value);
      if (message) {
        colCell.invalidation[x] = message;
        flag = false;
        break;
      }
    }
  }
  vm.cells[`${x}-${y}`] = Date.now(); // 触发cell重渲染
  return flag;
}

export function dynamicRenderRow(vm, row, rowindex) {
  let columnnum = Object.keys(row).length;
  // 动态增加单元格监听属性
  for (let i = 0; i < columnnum; i++) {
    Vue.set(vm.cells, `${rowindex}-${i}`, 0);
  }
}


export const cellRender = {
  'text': renderText,
  'select': renderSelect,
  'date': renderDate,
  'dynamicRenderRow': dynamicRenderRow
}
