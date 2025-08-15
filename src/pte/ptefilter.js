/**
 * 过滤和拼接selection的字段
 *
 */
let changeData = {
  allService: function (config) {
    if (config && config.data && config.data.servicecode) {
      if (changeData[config.data.servicecode] !== undefined) {
        config = changeData[config.data.servicecode](config);
        return config;
      } else {
        return config;
      }
    } else {
      return config;
    }
  },
  ce4556: function (config) {
    let temp = [];
    config.data.apply_journal_no.forEach(item => {
      temp.push(item.apply_journal_no);
    });
    temp = temp.join(",");
    config.data.apply_journal_no = temp;
    return config;
  },
  ce4557: function (config) {
    let temp = [];
    config.data.apply_journal_no.forEach(item => {
      temp.push(item.apply_journal_no);
    });
    temp = temp.join(",");
    config.data.apply_journal_no = temp;
    return config;
  },
  ce4610: function (config) {
    let temp = [];
    config.data.apply_id.forEach(item => {
      temp.push(item.apply_id);
    });
    temp = temp.join(",");
    config.data.apply_id = temp;
    return config;
  },
  ce4665: function (config) {
    let temp = [];
    config.data.apply_id.forEach(item => {
      temp.push(item.apply_id);
    });
    temp = temp.join(",");
    config.data.apply_id = temp;
    return config;
  },
  ce2531: function (config) {
    let temp = [];
    config.data.case_no.forEach(item => {
      temp.push(item.case_no);
    });
    temp = temp.join(",");
    config.data.case_no = temp;
    return config;
  },
  ce2535: function (config) {
    console.log(JSON.stringify(config));
    let temp = [];
    config.data.case_no.forEach(item => {
      temp.push(item.case_no);
    });
    temp = temp.join(",");
    config.data.case_no = temp;
    return config;
  },
  ce2538: function (config) {
    let temp = [];
    config.data.proxy_seqno.forEach(item => {
      temp.push(item.proxy_seqno);
    });
    temp = temp.join(",");
    config.data.proxy_seqno = temp;
    return config;
  },
  ce2541: function (config) {
    let temp = [];
    config.data.apply_journal_no.forEach(item => {
      temp.push(item.apply_journal_no);
    });
    temp = temp.join(",");
    config.data.apply_journal_no = temp;
    return config;
  },
  ce4666: function (config) {
    let temp = [];
    config.data.assign_id.forEach(item => {
      temp.push(item.assign_id);
    });
    temp = temp.join(",");
    config.data.assign_id = temp;
    return config;
  },
  ce4676: function (config) {
    let temp = [];
    config.data.case_no.forEach(item => {
      temp.push(item.case_no);
    });
    temp = temp.join(",");
    config.data.case_no = temp;
    return config;
  },
  ce4559: function (config) {
    let temp = [];
    config.data.case_no.forEach(item => {
      temp.push(item.case_no);
    });
    temp = temp.join(",");
    config.data.case_no = temp;
    return config;
  },
  ce4561: function (config) {
    console.log(JSON.stringify(config.data));
    let temp = [];
    config.data.selectedData.forEach(item => {
      temp.push(item.case_no);
    });
    temp = temp.join(",");
    config.data.case_no = temp;
    delete config.data.selectedData;
    console.log(JSON.stringify(config.data));
    return config;
  },
  ce4562: function (config) {
    let temp = [];
    config.data.case_no.forEach(item => {
      temp.push(item.case_no);
    });
    temp = temp.join(",");
    config.data.case_no = temp;
    return config;
  },
  ce4566: function (config) {
    let temp = [];
    config.data.work_seqno.forEach(item => {
      temp.push(item.work_seqno);
    });
    temp = temp.join(",");
    config.data.work_seqno = temp;
    return config;
  },
  ce4567: function (config) {
    let temp = [];
    config.data.selectedData.forEach(item => {
      temp.push(item.work_id);
    });
    temp = temp.join(",");
    config.data.work_id = temp;
    return config;
  },
  ce4698: function (config) {
    let temp = [];
    config.data.selectedData.forEach(item => {
      temp.push(item.case_no);
    });
    temp = temp.join(",");
    config.data.case_no = temp;
    return config;
  },
  ce4699: function (config) {
    console.log(JSON.stringify(config.data.selectedData));
    let temp = [];
    config.data.selectedData.forEach(item => {
      temp.push(item.case_no);
    });
    temp = temp.join(",");
    config.data.case_no = temp;
    return config;
  },
  ce4685: function (config) {
    console.log(JSON.stringify(config.data));
    let temp = [];
    config.data.work_id.forEach(item => {
      temp.push(item.work_id);
    });
    temp = temp.join(",");
    config.data.work_id = temp;
    return config;
  },
  ce4718: function (config) {
    console.log(JSON.stringify(config.data));
    let temp = [];
    config.data.selectedData.forEach(item => {
      temp.push(item.case_no);
    });
    temp = temp.join(",");
    config.data.case_no = temp;
    delete config.data.selectedData;
    console.log(JSON.stringify(config.data));
    return config;
  },
  ce4709: function (config) {
    let temp = [];
    config.data.case_no.forEach(item => {
      temp.push(item.case_no);
    });
    temp = temp.join(",");
    config.data.case_no = temp;
    return config;
  },
  ce4702: function (config) {
    let temp = [];
    config.data.apply_journal_no.forEach(item => {
      temp.push(item.apply_journal_no);
    });
    temp = temp.join(",");
    config.data.apply_journal_no = temp;
    return config;
  },
  ce4703: function (config) {
    let temp = [];
    config.data.apply_journal_no.forEach(item => {
      temp.push(item.apply_journal_no);
    });
    temp = temp.join(",");
    config.data.apply_journal_no = temp;
    return config;
  },
  ce1501: function (config) {
    let temp = [];
    config.data.apply_journal_no.forEach(item => {
      temp.push(item.apply_journal_no);
    });
    temp = temp.join(",");
    config.data.apply_journal_no = temp;
    return config;
  },
  /*ce1503: function (config) {
    let temp = [];
    config.data.apply_journal_no.forEach(item => {
      temp.push(item.apply_journal_no);
    });
    temp = temp.join(",");
    config.data.apply_journal_no = temp;
    return config;
  },*/
  ce4719: function (config) {
    let temp = [];
    config.data.selectedData.forEach(item => {
      temp.push(item.case_no);
    });
    temp = temp.join(",");
    config.data.case_no = temp;
    return config;
  },
  ce4674: function (config) {
    let temp = [];
    config.data.selectedData.forEach(item => {
      temp.push(item.work_id);
    });
    temp = temp.join(",");
    config.data.work_id = temp;
    return config;
  },
  ce4686: function (config) {
    let temp = [];
    config.data.selectedData.forEach(item => {
      temp.push(item.work_id);
    });
    temp = temp.join(",");
    config.data.work_id = temp;
    return config;
  },
  ce3508: function (config) {
    let temp = [];
    config.data.case_no.forEach(item => {
      temp.push(item.case_no);
    });
    temp = temp.join(",");
    config.data.case_no = temp;
    return config;
  },
  ap1073: function (config) {
    let queryList = [];
    config.data.tableData.forEach(item => {
      item["module"] = config.data.module;
      item["org_id"] = config.data.org_id;
      queryList.push(item);
    })
    config.data.queryList = queryList;
    return config;
  },
  ap1074: function (config) {
    let paramList = [];
    config.data.selectedData.forEach(item => {
      item["org_id"] = config.data.org_id;
      paramList.push(item);
    })
    config.data.paramList = paramList;
    return config;
  },
  ce1521: function (config) {
    let temp = [];
    config.data.apply_journal_no.forEach(item => {
      temp.push(item.apply_journal_no);
    });
    temp = temp.join(",");
    config.data.apply_journal_no = temp;
    return config;
  },
  ce1552: function (config) {
    let temp = [];
    config.data.apply_journal_no.forEach(item => {
      temp.push(item.apply_journal_no);
    });
    config.data.apply_journal_no = temp;
    return config;
  },
  ce1575: function (config) {
    let temp = [];
    config.data.apply_journal_no.forEach(item => {
      temp.push(item.apply_journal_no);
    });
    config.data.apply_journal_no = temp;
    return config;
  },
  ru2004: function (config) {
    let temp = [];
    console.log(JSON.stringify(config.data));
    config.data.selectedData.forEach(item => {
      temp.push(item.file_name);
    });
    temp = temp.join(",");
    config.data.file_name = temp;
    delete config.data.selectedData;
    console.log(JSON.stringify(config.data));
    return config;
  },
  ru6005: function (config) {
    let temp = [];
    config.data.selectedData.forEach(item => {
      temp.push(item.strategy_code);
    });
    temp = temp.join(",");
    config.data.strategy_codes = temp;
    config.data.selectedData = null;
    return config;
  },
  ru6011: function (config) {
    let temp = [];
    config.data.selectedData.forEach(item => {
      temp.push(item.strategy_code);
    });
    temp = temp.join(",");
    config.data.strategy_code = temp;
    config.data.selectedData = null;
    return config;
  },
  ru6003: function (config) {
    console.log(JSON.stringify(config.data));
    let temp = [];
    config.data.selectedData.forEach(item => {
      temp.push(item.strategy_code);
    });
    temp = temp.join(",");
    config.data.strategy_code = temp;
    config.data.selectedData = null;
    return config;
  },
  ce1566: function (config) {
    let temp = [];
    config.data.apply_journal_no.forEach(item => {
      temp.push(item.apply_journal_no);
    });
    temp = temp.join(",");
    config.data.apply_journal_no = temp;
    return config;
  },
  ap1808: function (config) {
    let role_ids = [];
    let branch_ids = [];
    config.data.selectedList.forEach(item => {
      role_ids.push(item["role_id"]);
      branch_ids.push(item["branch_id"]);
    })
    config.data.role_ids = role_ids;
    config.data.branch_ids = branch_ids;
    return config;
  },
  ap1809: function (config) {
    let role_ids = [];
    config.data.selectedList.forEach(item => {
      role_ids.push(item["role_id"]);
    })
    config.data.role_ids = role_ids;
    return config;
  },
  ap1811: function (config) {
    let menu_id = [];
    config.data.selectedTree.forEach(item => {
      menu_id.push(item);
    })
    config.data.parentNodes.forEach(item => {
      menu_id.push(item);
    })
    config.data.menu_id = menu_id;
    return config;
  },
  ICMSLNTS6911: function (config) {
    let temp = [];
    config.data.selectedList.forEach(item => {
      temp.push(item.dtl_prod_cd);
    });
    temp = temp.join(",");
    config.data.prod_cds = temp;
    return config;
  },
  ICMSLNTS6909: function (config) {
    let temp = [];
    config.data.selectedList.forEach(item => {
      temp.push(item.dtl_prod_cd);
    });
    temp = temp.join(",");
    config.data.prod_cds = temp;
    return config;
  },
  ICMSLNTS0207: function (config) {
    let temp = [];
    config.data.selectedList.forEach(item => {
      temp.push(item.agreement_cd);
    });
    temp = temp.join(",");
    config.data.agreement_cd = temp.toString();
    return config;
  },
  us0006: function (config) {
    let servicecode = config.data.servicecode;
    config.data = config.data.info;
    config.data.servicecode = servicecode;
    return config;
  },
  us0052: function (config) {
    let rela_classify = config.data.rela_classify;
    config.data.rela_classify = rela_classify.replaceAll("class-", "");
    return config;
  },
  us0002: function (config) {
    let servicecode = config.data.servicecode;
    config.data = config.data.info;
    config.data.servicecode = servicecode;
    return config;
  },
  pd0220: function (config) {
    let servicecode = config.data.servicecode;
    config.data = config.data.info;
    config.data.servicecode = servicecode;
    return config;
  },
  pd1202: function (config) {
    let servicecode = config.data.servicecode;
    config.data = config.data.info;
    config.data.servicecode = servicecode;
    return config;
  },
  pd1211: function (config) {
    let servicecode = config.data.servicecode;
    config.data = config.data.info;
    config.data.servicecode = servicecode;
    return config;
  },

  pd0230: function (config) {
    let servicecode = config.data.servicecode;
    config.data = config.data.info;
    config.data.servicecode = servicecode;
    return config;
  },
  pd0314: function (config) {
    let servicecode = config.data.servicecode;
    config.data = config.data.info;
    config.data.servicecode = servicecode;
    return config;
  },
  pd0502: function (config) {
    let servicecode = config.data.servicecode;
    let sale_prod_cd = config.data.sale_prod_cd;
    let prod_version = config.data.prod_version;
    config.data = config.data.info;
    config.data.servicecode = servicecode;
    config.data.sale_prod_cd = sale_prod_cd;
    config.data.prod_version = prod_version;
    return config;
  },
  us1101: function (config) {
    let str = config.data.node_type;
    let node_type = parseInt(str) + 1;
    config.data.node_type = node_type;
    return config;
  },
  pd0133: function (config) {
    let tableData = config.data.selectedList;
    let sort = 0;
    tableData.forEach(function (temp) {
      temp.sort_no = sort;
      sort++;
    });
    config.data.selectedList = tableData;
    return config;
  },
  pd0158: function (config) {
    let tableData = config.data.selectedList;
    let sort = 0;
    tableData.forEach(function (temp) {
      temp.sort_no = sort;
      sort++;
    });
    config.data.selectedList = tableData;
    return config;
  },
  cb0055: function (config) {
    let formData = [];
    config.data.list01.id=config.data.id;
    formData.push(config.data.list01);
    config.data.list01 = formData;
    return config;
  },
  cb0056: function (config) {
    let formData = [];
    config.data.list01.id=config.data.id;
    formData.push(config.data.list01);
    config.data.list01 = formData;
    return config;
  },
  cb0032: function (config) {
    let tableData = config.data.selectedList;
    let org_id = config.data.org_id;
    tableData.forEach(function (temp) {
      temp.org_id = org_id;
    });
    config.data.list01 = tableData;
    return config;
  },
  cb0033: function (config) {
    let tableData = config.data.selectedList;
    config.data.list01 = tableData;
    return config;
  },
  cb0039: function (config) {
    let tableData = config.data.selectedList;
    let org_id = config.data.org_id;
    tableData.forEach(function (temp) {
      temp.org_id = org_id;
    });
    config.data.list01 = tableData;
    return config;
  },
  cb0040: function (config) {
    let tableData = config.data.selectedList;
    config.data.list01 = tableData;
    return config;
  },
  cb0134: function (config) {
    let temp = [];
    config.data.case_id.forEach(item => {
      temp.push(item.case_id);
    });
    temp = temp.join(",");
    config.data.case_id = temp;
    return config;
  },
  cb0143: function (config) {
    let temp = [];
    config.data.case_id.forEach(item => {
      temp.push(item.case_id);
    });
    temp = temp.join(",");
    config.data.case_id = temp;
    return config;
  },
  cb0131: function (config) {
    let temp = [];
    config.data.serial_no.forEach(item => {
      temp.push(item.serial_no);
    });
    temp = temp.join(",");
    config.data.serial_no = temp;
    return config;
  },
  cb0173: function (config) {
    let temp = [];
    config.data.selectedData.forEach(item => {
      temp.push(item.work_order_id);
    });
    temp = temp.join(",");
    config.data.work_order_id = temp;
    return config;
  },
  cb0174: function (config) {
    let temp = [];
    config.data.selectedData.forEach(item => {
      temp.push(item.work_order_id);
    });
    temp = temp.join(",");
    config.data.work_order_id = temp;
    return config;
  },
  pd0214: function (config) {
    let cust_class = config.data.cust_class;
    if (cust_class != null && cust_class != "" && cust_class != undefined){
      if (cust_class.length == 2){
        return config;
      }
      cust_class = cust_class.substring(0,2);
    }
    config.data.cust_class = cust_class;
    return config;
  },
  cb0207: function (config) {
    let temp = [];
    config.data.apply_id.forEach(item => {
      temp.push(item.apply_id);
    });
    temp = temp.join(",");
    config.data.apply_id = temp;
    return config;
  },
  cb0209: function (config) {
    let temp = [];
    config.data.apply_id.forEach(item => {
      temp.push(item.apply_id);
    });
    temp = temp.join(",");
    config.data.apply_id = temp;
    return config;
  },
  cb0210: function (config) {
    let temp = [];
    config.data.apply_id.forEach(item => {
      temp.push(item.apply_id);
    });
    temp = temp.join(",");
    config.data.apply_id = temp;
    return config;
  },
  cb0211: function (config) {
    let temp = [];
    config.data.apply_id.forEach(item => {
      temp.push(item.apply_id);
    });
    temp = temp.join(",");
    config.data.apply_id = temp;
    return config;
  },
  cb0213: function (config) {
    let temp = [];
    config.data.case_id.forEach(item => {
      temp.push(item.case_id);
    });
    temp = temp.join(",");
    config.data.case_id = temp;
    return config;
  },
  cb0220: function (config) {
    let temp = [];
    config.data.case_id.forEach(item => {
      temp.push(item.case_id);
    });
    temp = temp.join(",");
    config.data.case_id = temp;
    return config;
  },
  cb0223: function (config) {
    let temp = [];
    config.data.work_id.forEach(item => {
      temp.push(item.work_id);
    });
    temp = temp.join(",");
    config.data.work_id = temp;
    return config;
  },
  cb0194: function (config) {
    let oa_org_id = config.data.oa_org_id;
    let plan_id = config.data.commission_plan_id;
    let start_date = config.data.start_date;
    let end_date = config.data.end_date;
    config.data.case_id.forEach(item => {
      item.oa_org_id = oa_org_id;
      item.commission_plan_id = plan_id;
      item.start_date = start_date;
      item.end_date = end_date;
    });
    config.data.list01 =  config.data.case_id;
    config.data.case_id=null;
    return config;
  },
  cb0199: function (config) {
    config.data.list01 =  config.data.selectedData;
    delete config.data.selectedData;
    console.log(JSON.stringify(config.data));
    return config;
  },
  cb0200: function (config) {
    config.data.list01 =  config.data.selectedData;
    delete config.data.selectedData;
    console.log(JSON.stringify(config.data));
    return config;
  },
  cb0202: function (config) {
    let apply_reason = config.data.apply_reason;
    config.data.list01.forEach(item => {
      item.apply_reason = apply_reason;
    });
    return config;
  },
  cb0203: function (config) {
    config.data.list01 =  config.data.selectedData;
    delete config.data.selectedData;
    return config;
  },
  cb0205: function (config) {
    config.data.list01 =  config.data.selectedData;
    delete config.data.selectedData;
    return config;
  },
  cb0195: function (config) {
    let assign_algorithm =  config.data.assign_algorithm;
    config.data.list02 = config.data.list02.$all;
    config.data.list02.forEach(item => {
     item.assign_algorithm = assign_algorithm;
    });
    return config;
  },
  cb0269: function (config) {
    let temp = [];
    config.data.apply_id.forEach(item => {
      temp.push(item.apply_id);
    });
    temp = temp.join(",");
    config.data.apply_id = temp;
    return config;
  },
  cb0231: function (config) {
    let apply_reason =  config.data.apply_reason;
    let wo_type =  config.data.wo_type;
    config.data.list01.forEach(item => {
      item.apply_reason = apply_reason;
      item.wo_type = wo_type;
    });
    return config;
  },
  cb0242: function (config) {
    let check_status =  config.data.approval_status;
    let check_desc =  config.data.approval_desc;
    config.data.list01.forEach(item => {
      item.approval_status = check_status;
      item.approval_desc = check_desc;
    });
    return config;
  },
  cb0243: function (config) {
    let check_status =  config.data.approval_status;
    let check_desc =  config.data.approval_desc;
    config.data.list01.forEach(item => {
      item.approval_status = check_status;
      item.approval_desc = check_desc;
    });
    return config;
  },
  cb0250: function (config) {
    let check_status =  config.data.approval_status;
    let check_desc =  config.data.approval_desc;
    config.data.list01.forEach(item => {
      item.approval_status = check_status;
      item.approval_desc = check_desc;
    });
    return config;
  },
  cb0251: function (config) {
    let check_status =  config.data.approval_status;
    let check_desc =  config.data.approval_desc;
    config.data.list01.forEach(item => {
      item.approval_status = check_status;
      item.approval_desc = check_desc;
    });
    return config;
  },
  cb0233: function (config) {
    let approval_status =  config.data.approval_status;
    let approval_desc =  config.data.approval_desc;
    config.data.list01.forEach(item => {
      item.approval_status = approval_status;
      item.approval_desc = approval_desc;
    });
    return config;
  },
  cb0280: function (config) {
    let temp = [];
    config.data.case_no.forEach(item => {
      temp.push(item.case_no);
    });
    temp = temp.join(",");
    config.data.case_no = temp;
    return config;
  },
  cb0282: function (config) {
    let temp = [];
    config.data.case_id.forEach(item => {
      temp.push(item.case_id);
    });
    temp = temp.join(",");
    config.data.case_id = temp;
    return config;
  },
  cb0283: function (config) {
    let temp = [];
    config.data.case_id.forEach(item => {
      temp.push(item.case_id);
    });
    temp = temp.join(",");
    config.data.case_id = temp;
    return config;
  }
}


export default changeData
