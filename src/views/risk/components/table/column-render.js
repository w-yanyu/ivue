import * as B from './crud-buttons'
import * as R from './cell-render'

export const renderColumn = (vm, col) => {
  console.log("ssasas"+"table"+vm+col)
  col.invalidation = {};
  if (col.editable) {
    let defaultRender = col.render;
    col.render = (h, param) => {
      let currentRow = vm.tableData[param.index],
        noinput = (!currentRow.editting && !currentRow.adding) || (currentRow.editting && col.onlyEditable);
      if (noinput) {
        // 如果原本有render函数，使用它
        let v = currentRow[col.key];
        if (defaultRender) {
          v = defaultRender(h, param);
        } else if (col.input && col.input.tag == 'select') {
          let items = col.input.options.filter(one => one.value == v);
          v = items.length > 0 ? items[0].label : '';
        }
        return v
      } else {
        let args = [vm, h, param, col],
          tag = col.input ? col.input.tag : 'text';
        return R.cellRender[tag](...args);
      }
    }
  }
  if (col.handle) {
    col.render = (h, param) => {
      let currentRowData = vm.tableData[param.index];
      let children = [];
      col.handle.forEach((item, i) => {
        if (!currentRowData.adding) {
          if (item === 'edit') {
            children.push(B.editButton(vm, h, currentRowData, param.index));
          } else if (item === 'delete') {
            children.push(B.deleteButton(vm, h, currentRowData, param.index));
          } else if (item === 'check') {
            children.push(B.checkButton(vm, h, currentRowData, param.index));
          } else if (typeof item == 'function') {
            children.push(item(h, currentRowData))
          }
        } else {
          // 只加一个新增按钮
          if (i == 0) {
            children.push(B.addButton(vm, h, currentRowData, param.index));
            children.push(B.deleteButton(vm, h, currentRowData, param.index));
          }
        }
      });
      return h('div', children);
    };
  }


  // if (col.filter) {
  //   col.renderHeader = (h, param) => {
  //     let comp = null,
  //       tag = col.filter.tag;
  //     if (tag == 'date') {
  //       comp = h(fDate, {
  //         on: {
  //           'filter-daterange': (v) => {
  //             vm.$emit('on-filter', {
  //               key: param.column.key,
  //               value: v
  //             })
  //           }
  //         }
  //       })
  //     } else if (tag == 'number') {
  //       comp = h(fNumber, {
  //         on: {
  //           'filter-numrange': (v) => {
  //             vm.$emit('on-filter', {
  //               key: param.column.key,
  //               value: v
  //             })
  //           }
  //         }
  //       })
  //     } else if (tag == 'select') {
  //       comp = h(fSelect, {
  //         props: {
  //           'data': col.filter.options
  //         },
  //         on: {
  //           'filter-select': (v) => {
  //             vm.$emit('on-filter', {
  //               key: param.column.key,
  //               value: v
  //             })
  //           }
  //         }
  //       })
  //     } else if (tag == 'multiselect') {
  //       comp = h(fMultiselect, {
  //         props: {
  //           'data': col.filter.options
  //         },
  //         on: {
  //           'filter-multiselect': (v) => {
  //             vm.$emit('on-filter', {
  //               key: param.column.key,
  //               value: v
  //             })
  //           }
  //         }
  //       })
  //     }
  //     return h('div', [
  //       h('span', param.column.title),
  //       comp
  //     ])
  //   }
  // }
}
