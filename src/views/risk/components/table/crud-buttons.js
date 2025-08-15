import * as R from './cell-render'

export const editButton = (vm, h, currentRow, index) => {
  return h('el-button', {
    props: {
      type: currentRow.editting ? 'success' : 'primary',
      size: 'small',
      loading: currentRow.saving
    },
    style: {
      margin: '0 5px'
    },
    on: {
      'click': () => {
        if (!currentRow.editting) {
          vm.edittingStore[index].editting = true;
          R.dynamicRenderRow(vm, currentRow, index);
          vm.tableData = JSON.parse(JSON.stringify(vm.edittingStore));
          vm.$emit('change-editing',vm.tableData,index);//改变可编辑数据
        } else {
          let error_count = 0;
          vm.columns.forEach((colCell, i) => {
            let value = vm.edittingStore[index][colCell.key];
            if (!R.validateCell(vm,colCell, value,index,i)) {
              error_count += 1;

            }
          });
          if (error_count > 0)  {
            vm.tableData = JSON.parse(JSON.stringify(vm.edittingStore));
            return;
          }
          vm.edittingStore[index].saving = true;
          //vm.tableData = JSON.parse(JSON.stringify(vm.edittingStore));
          let edittingRow = vm.edittingStore[index];
          edittingRow.editting = false;
          edittingRow.saving = false;
          vm.tableData = JSON.parse(JSON.stringify(vm.edittingStore));
          vm.$emit('input', vm.handleBackdata(vm.tableData));
          vm.$emit('change-edit', vm.handleBackdata(vm.tableData), index);
        }
      }
    }
  }, currentRow.editting ? '保存' : '编辑');
};
export const checkButton = (vm, h, currentRow, index) => {
  return h('el-button', {
      style: {
        margin: '0 5px'
      },
      props: {
        type: 'primary',
        size: 'small',
        placement: 'top'
      },
      on: {
        'click': () => {
          vm.$emit('change-check', currentRow, index);
        }
      }
    }, '查看')
};

export const cancelButton = (vm, h, currentRow, index) => {
  return h('el-button', {
      style: {
        margin: '0 5px'
      },
      props: {
        type: 'primary',
        size: 'small',
        placement: 'top'
      },
      on: {
        'click': () => {
            vm.tableData.splice(index, 1);
        }
      }
    }, '取消')
};

export const deleteButton = (vm, h, currentRow, index) => {
  return h('Poptip', {
    props: {
      confirm: true,
      title: '您确定要删除这条数据吗?',
      transfer: true
    },
    on: {
      'on-ok': () => {
        // 删除正在加的内容，移除
        if (currentRow.adding) {
          vm.edittingStore.splice(index,1);
          vm.tableData = JSON.parse(JSON.stringify(vm.edittingStore));
          return;
        }
        // 删除已存在内容，交给外面去做，因为可能是调用接口的删除
        vm.$emit('input', vm.handleBackdata(vm.tableData));
        let rowdata = JSON.parse(JSON.stringify(vm.edittingStore[index]));
        vm.$emit('on-delete', rowdata, index);
      }
    }
  }, [
    h('el-button', {
      style: {
        margin: '0 5px'
      },
      props: {
        type: 'error',
        size: 'small',
        placement: 'top'
      }
    }, '删除')
  ]);
};

export const addButton = (vm, h, currentRow, index) => {
  return h('el-button', {
    props: {
      type: 'success',
      size: 'small',
      loading: currentRow.saving
    },
    style: {
      margin: '0 5px'
    },
    on: {
      'click': () => {
        let error_count = 0;
        vm.columns.forEach((colCell, i) => {
          let value = vm.edittingStore[index][colCell.key];

          if (!R.validateCell(vm,colCell,value,index,i)) {
            error_count += 1;
          }
        });
        if (error_count > 0)  {
           vm.tableData = JSON.parse(JSON.stringify(vm.edittingStore));
          return;
        }
        vm.edittingStore[index].saving = true;
        vm.tableData = JSON.parse(JSON.stringify(vm.edittingStore));
        let edittingRow = vm.edittingStore[index];
        edittingRow.adding = false;
        edittingRow.saving = false;
        vm.tableData = JSON.parse(JSON.stringify(vm.edittingStore));
        vm.$emit('input', vm.handleBackdata(vm.tableData));
        vm.$emit('change', vm.handleBackdata(vm.tableData), index);
      }
    }
  }, '保存')
};
// export const addButton = (vm, h, currentRow, index) => {
//   return h('Button', {
//     props: {
//       type: 'success',
//       size: 'small',
//       loading: currentRow.saving
//     },
//     style: {
//       margin: '0 5px'
//     },
//     on: {
//       'click': () => {
//         let error_count = 0;
//         vm.columns.forEach((colCell, i) => {
//           let value = vm.edittingStore[index][colCell.key];

//           if (!R.validateCell(colCell, value)) {
//             error_count += 1;
//           }
//         });
//         if (error_count > 0)  {
//            vm.tableData = JSON.parse(JSON.stringify(vm.edittingStore));
//           return;
//         }
//         vm.edittingStore[index].saving = true;
//         vm.tableData = JSON.parse(JSON.stringify(vm.edittingStore));
//         let edittingRow = vm.edittingStore[index];
//         edittingRow.adding = false;
//         edittingRow.saving = false;
//         vm.tableData = JSON.parse(JSON.stringify(vm.edittingStore));
//         vm.$emit('input', vm.handleBackdata(vm.tableData));
//         vm.$emit('on-change', vm.handleBackdata(vm.tableData), index);
//       }
//     }
//   }, '保存')
// };
