/**
 * 多个表单校验处理
 * @param formName 表单名称
 * @param that this
 */
export function validateHandle(formName, that) {
  const promise = new Promise((resolve, reject) => {
    that.$refs[formName].validate(valid => {
      !!valid ? resolve() : reject();
    });
  });
  return promise;
}