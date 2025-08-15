export const showList = [
  { label: "是", value: "Y" },
  { label: "否", value: "N" }
]

export const rules = {
  branch_id :[{ required: true, message: '请输入机构号', trigger: 'blur' }],
	real_branch_ind :[{  message: '请选择实体机构标志', trigger: 'blur' }],
  brch_relation_code :[{ required: true, message: '请选择机构关系', trigger: 'blur' }],
  ccy_code :[{ required: true, message: '请选择币种', trigger: 'blur' }],
  branch_level :[{ message: '请选择机构级别', trigger: 'blur' }],
  holiday_code :[{ message: '请输入节日代码', trigger: 'blur' }],
  branch_mail: [{ pattern: '^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\\.[a-zA-Z0-9_-]+)+$', message: '请输入正确格式的邮箱', trigger: 'blur' }],
  contacts_mail: [{ pattern: '^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\\.[a-zA-Z0-9_-]+)+$', message: '请输入正确格式的邮箱', trigger: 'blur' }],
  contacts_phone: [{ pattern: '^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\\d{8})$', message: '请输入正确格式的电话', trigger: 'blur' }],
}
