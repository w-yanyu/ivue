<template>
    <div>
      <el-collapse v-model="activeNames_basic">
        <el-collapse-item :title="$i18ns('基本信息')" name="1">
          <el-form ref="basicForm" :model="basicForm" label-width="200px" class="custom-common--form">
            <el-row>
              <el-col :span="12">
                <el-form-item :label="$i18ns('借据号')" prop="loan_no">
                  <el-input v-model="basicForm.loan_no" oninput="value=value.replace(/[^\d]/g,'')" maxlength='30' @blur="infoGet($event)"></el-input>
                </el-form-item>
                <el-form-item :label="$i18ns('客户名称')" prop="cust_name">
                  <el-input v-model="basicForm.cust_name" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item :label="$i18ns('客户号')" prop="cust_no">
                  <el-input v-model="basicForm.cust_no" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item :label="$i18ns('证件号码')" prop="cert_no" hidden="true">
                  <el-input v-model="basicForm.cert_no" :disabled="true"></el-input>
                </el-form-item>
               <!-- <el-form-item label="产品名称" prop="prod_name">
                  <el-input v-model="basicForm.prod_name" :disabled="true"></el-input>
                </el-form-item>-->
                <el-form-item :label="$i18ns('产品代码')" prop="prod_no">
                  <el-input v-model="basicForm.prod_no" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item :label="$i18ns('手机号码')" prop="mobile_no" hidden="true">
                  <el-input v-model="basicForm.mobile_no" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item :label="$i18ns('贷款状态')" prop="loan_form">
                  <el-select v-model="basicForm.loan_form" :disabled="true">
                <el-option v-for="item in clssstList" :key="item.dictId" :label="item.dictName"
                             :value="item.dictId">
                  </el-option>
                </el-select>
              </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$i18ns('是否联合贷')" prop="is_unitln" hidden="true">
                  <el-select v-model="basicForm.is_unitln" :disabled="true">
                <el-option v-for="item in yesOrNoList" :key="item.dictId" :label="item.dictName"
                             :value="item.dictId">
                  </el-option>
                </el-select>
              </el-form-item>
                <el-form-item :label="$i18ns('是否法诉')" prop="is_lgfe">
                  <el-select v-model="basicForm.is_lgfe" :disabled="true">
               <el-option v-for="item in yesOrNoList" :key="item.dictId" :label="item.dictName"
                             :value="item.dictId">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item :label="$i18ns('产品名称')" prop="prod_name">
                  <el-input v-model="basicForm.prod_name" :disabled="true"></el-input>
                </el-form-item>
               <!-- <el-form-item label="产品代码" prop="prod_no">
                  <el-input v-model="basicForm.prod_no" :disabled="true"></el-input>
                </el-form-item>-->
                <el-form-item :label="$i18ns('当前案件委案状态')" prop="entrust_status">
                  <el-select v-model="basicForm.entrust_status" :disabled="true">
                <el-option v-for="item in enStatusList" :key="item.dictId" :label="item.dictName"
                             :value="item.dictId">
                  </el-option>
                </el-select>
              </el-form-item>
                <el-form-item :label="$i18ns('当前委案时间')" prop="entr_time" hidden="true">
                  <el-input v-model="basicForm.entr_time" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item :label="$i18ns('当前委案机构')" prop="entrorg" hidden="true">
                  <el-input v-model="basicForm.entrorg" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item :label="$i18ns('当前委案金额')" prop="entr_amt" hidden="true" >
                  <el-input v-model="basicForm.entr_amt" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item :label="$i18ns('当前案件诉讼状态')" prop="suit_status">
                  <el-select v-model="basicForm.suit_status" :disabled="true">
                    <el-option v-for="item in suStatusList" :key="item.dictId" :label="item.dictName"
                             :value="item.dictId">
                  </el-option>
                </el-select>
                </el-form-item>
                <el-form-item :label="$i18ns('借款缴费明细')" prop="work_end_time">
                <el-button type="primary" @click="searchTeller" icon="el-icon-search">{{$i18ns('查询')}}</el-button>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-collapse-item>
        <el-collapse-item :title="$i18ns('历史申请单信息')" name="2">
            <el-collapse v-model="activeNames_apply">
                <el-collapse-item :title="$i18ns('诉讼发起申请')" name="1">
                    <el-table ref="suStartTable" :data="suStartTable" :border="true" style="width: 98%;">
                        <el-table-column :label="$i18ns('申请单编号')"  prop="apply_no"  align="center">
                        </el-table-column>
                        <el-table-column :label="$i18ns('申请时间')"  prop="data_create_time"  align="center">
                        </el-table-column>
                        <el-table-column :label="$i18ns('结案时间')" prop="data_update_time" align="center">
                        </el-table-column>
                        <el-table-column :label="$i18ns('申请人')" prop="data_create_user" align="center" show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column :label="$i18ns('审批结果')" prop="apply_status" align="center" :formatter="formatData">
                        </el-table-column>
                       <!-- <el-table-column label="操作" prop="deal_type"  align="center" show-overflow-tooltip>
                            <template slot-scope="scope" >
                                <el-button type="text" icon="el-icon-document"  @click="viewRow(scope.row)">{{$i18ns('查看')}}详情</el-button>
                            </template>
                        </el-table-column>-->
                    </el-table>
                </el-collapse-item>
                <el-collapse-item :title="$i18ns('诉讼委案申请')" name="2">
                    <el-table ref="suEntrustTable" :data="suEntrustTable" :border="true" style="width: 98%;">
                        <el-table-column :label="$i18ns('申请单编号')"  prop="apply_no"  align="center">
                        </el-table-column>
                        <el-table-column :label="$i18ns('申请时间')"  prop="data_create_time"  align="center">
                        </el-table-column>
                        <el-table-column :label="$i18ns('结案时间')" prop="data_update_time" align="center">
                        </el-table-column>
                        <el-table-column :label="$i18ns('申请人')" prop="data_create_user" align="center" show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column :label="$i18ns('审批结果')" prop="apply_status" align="center" :formatter="formatData">
                        </el-table-column>
                        <!--<el-table-column label="操作" prop="deal_type"  align="center" show-overflow-tooltip>
                            <template slot-scope="scope" >
                                <el-button type="text" icon="el-icon-document"  @click="viewRow(scope.row)">{{$i18ns('查看')}}详情</el-button>
                            </template>
                        </el-table-column>-->
                    </el-table>
                </el-collapse-item>
                <el-collapse-item :title="$i18ns('诉讼资料用印申请')" name="3">
                    <el-table ref="yysqTable" :data="yysqTable" :border="true" style="width: 98%;">
                        <el-table-column :label="$i18ns('申请单编号')"  prop="apply_no"  align="center">
                        </el-table-column>
                        <el-table-column :label="$i18ns('申请时间')"  prop="data_create_time"  align="center">
                        </el-table-column>
                        <el-table-column :label="$i18ns('结案时间')" prop="data_update_time" align="center">
                        </el-table-column>
                        <el-table-column :label="$i18ns('申请人')" prop="data_create_user" align="center" show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column :label="$i18ns('审批结果')" prop="apply_status" align="center" :formatter="formatData">
                        </el-table-column>
                      <!--  <el-table-column label="操作" prop="deal_type"  align="center" show-overflow-tooltip>
                            <template slot-scope="scope" >
                                <el-button type="text" icon="el-icon-document"  @click="viewRow(scope.row)">{{$i18ns('查看')}}详情</el-button>
                            </template>
                        </el-table-column>-->
                    </el-table>
                </el-collapse-item>
                <el-collapse-item :title="$i18ns('借款缴费申请')" name="4">
                    <el-table ref="dzjfsqTable" :data="dzjfsqTable" :border="true" style="width: 98%;">
                        <el-table-column :label="$i18ns('申请单编号')"  prop="apply_no"  align="center">
                        </el-table-column>
                        <el-table-column :label="$i18ns('申请时间')"  prop="data_create_time"  align="center">
                        </el-table-column>
                        <el-table-column :label="$i18ns('结案时间')" prop="data_update_time" align="center">
                        </el-table-column>
                        <el-table-column :label="$i18ns('申请人')" prop="data_create_user" align="center" show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column :label="$i18ns('实际支付结果')" prop="pay_status" align="center" :formatter="formatDatap">
                        </el-table-column>
                        <el-table-column :label="$i18ns('审批结果')" prop="status" align="center" :formatter="formatData">
                        </el-table-column>
                      <!--  <el-table-column label="操作" prop="deal_type"  align="center" show-overflow-tooltip>
                            <template slot-scope="scope" >
                                <el-button type="text" icon="el-icon-document"  @click="viewRow(scope.row)">{{$i18ns('查看')}}详情</el-button>
                            </template>
                        </el-table-column>-->
                    </el-table>
                </el-collapse-item>
                <el-collapse-item :title="$i18ns('借款缴费确认申请')" name="5">
                    <el-table ref="dzjfqrTable" :data="dzjfqrTable" :border="true" style="width: 98%;">
                        <el-table-column :label="$i18ns('申请单编号')"  prop="apply_no"  align="center">
                        </el-table-column>
                        <el-table-column :label="$i18ns('申请时间')"  prop="data_create_time"  align="center">
                        </el-table-column>
                        <el-table-column :label="$i18ns('结案时间')" prop="data_update_time" align="center">
                        </el-table-column>
                        <el-table-column :label="$i18ns('申请人')" prop="data_create_user" align="center" show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column :label="$i18ns('审批结果')" prop="status" align="center" :formatter="formatData">
                        </el-table-column>
                      <!--  <el-table-column label="操作" prop="deal_type"  align="center" show-overflow-tooltip>
                            <template slot-scope="scope" >
                                <el-button type="text" icon="el-icon-document"  @click="viewRow(scope.row)">{{$i18ns('查看')}}详情</el-button>
                            </template>
                        </el-table-column>-->
                    </el-table>
                </el-collapse-item>
                <el-collapse-item :title="$i18ns('费用支付申请')" name="6">
                    <el-table ref="fyzfsqTable" :data="fyzfsqTable" :border="true" style="width: 98%;">
                        <el-table-column :label="$i18ns('申请单编号')"  prop="apply_no"  align="center">
                        </el-table-column>
                        <el-table-column :label="$i18ns('申请时间')"  prop="data_create_time"  align="center">
                        </el-table-column>
                        <el-table-column :label="$i18ns('结案时间')" prop="data_update_time" align="center">
                        </el-table-column>
                        <el-table-column :label="$i18ns('申请人')" prop="data_create_user" align="center" show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column :label="$i18ns('实际支付结果')" prop="pay_status" align="center" :formatter="formatDatap">
                        </el-table-column>
                        <el-table-column :label="$i18ns('审批结果')" prop="fystatus" align="center" :formatter="formatData">
                        </el-table-column>
                     <!--   <el-table-column label="操作" prop="deal_type"  align="center" show-overflow-tooltip>
                            <template slot-scope="scope" >
                                <el-button type="text" icon="el-icon-document"  @click="viewRow(scope.row)">{{$i18ns('查看')}}详情</el-button>
                            </template>
                        </el-table-column> -->
                    </el-table>
                </el-collapse-item>
                <el-collapse-item :title="$i18ns('立案受理信息记录申请')" name="7">
                    <el-table ref="laslTable" :data="laslTable" :border="true" style="width: 98%;">
                        <el-table-column :label="$i18ns('申请单编号')"  prop="apply_no"  align="center">
                        </el-table-column>
                        <el-table-column :label="$i18ns('申请时间')"  prop="data_create_time"  align="center">
                        </el-table-column>
                        <el-table-column :label="$i18ns('结案时间')" prop="data_update_time" align="center">
                        </el-table-column>
                        <el-table-column :label="$i18ns('申请人')" prop="data_create_user" align="center" show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column :label="$i18ns('审批结果')" prop="appr_status" align="center" :formatter="formatData">
                        </el-table-column>
                       <!-- <el-table-column label="操作" prop="deal_type"  align="center" show-overflow-tooltip>
                            <template slot-scope="scope" >
                                <el-button type="text" icon="el-icon-document"  @click="viewRow(scope.row)">{{$i18ns('查看')}}详情</el-button>
                            </template>
                        </el-table-column> -->
                    </el-table>
                </el-collapse-item>
                <el-collapse-item :title="$i18ns('立案受理结果记录申请')" name="8">
                    <el-table ref="lasljgTable" :data="lasljgTable" :border="true" style="width: 98%;">
                        <el-table-column :label="$i18ns('申请单编号')"  prop="apply_no"  align="center">
                        </el-table-column>
                        <el-table-column :label="$i18ns('申请时间')"  prop="data_create_time"  align="center">
                        </el-table-column>
                        <el-table-column :label="$i18ns('结案时间')" prop="data_update_time" align="center">
                        </el-table-column>
                        <el-table-column :label="$i18ns('申请人')" prop="data_create_user" align="center" show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column :label="$i18ns('审批结果')" prop="status" align="center" :formatter="formatData">
                        </el-table-column>
                      <!--  <el-table-column label="操作" prop="deal_type"  align="center" show-overflow-tooltip>
                            <template slot-scope="scope" >
                                <el-button type="text" icon="el-icon-document"  @click="viewRow(scope.row)">{{$i18ns('查看')}}详情</el-button>
                            </template>
                        </el-table-column> -->
                    </el-table>
                </el-collapse-item>
                <el-collapse-item :title="$i18ns('执行受理信息记录申请')" name="9">
                    <el-table ref="zxsljlsqTable" :data="zxsljlsqTable" :border="true" style="width: 98%;">
                        <el-table-column :label="$i18ns('申请单编号')"  prop="apply_no"  align="center">
                        </el-table-column>
                        <el-table-column :label="$i18ns('申请时间')"  prop="data_create_time"  align="center">
                        </el-table-column>
                        <el-table-column :label="$i18ns('结案时间')" prop="data_update_time" align="center">
                        </el-table-column>
                        <el-table-column :label="$i18ns('申请人')" prop="data_create_user" align="center" show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column :label="$i18ns('审批结果')" prop="status" align="center" :formatter="formatData">
                        </el-table-column>
                     <!--   <el-table-column label="操作" prop="deal_type"  align="center" show-overflow-tooltip>
                            <template slot-scope="scope" >
                                <el-button type="text" icon="el-icon-document"  @click="viewRow(scope.row)">{{$i18ns('查看')}}详情</el-button>
                            </template>
                        </el-table-column>-->
                    </el-table>
                </el-collapse-item>
                <el-collapse-item :title="$i18ns('执行受理结果记录申请')" name="10">
                    <el-table ref="zxjgjlsqTable" :data="zxjgjlsqTable" :border="true" style="width: 98%;">
                        <el-table-column :label="$i18ns('申请单编号')"  prop="apply_no"  align="center">
                        </el-table-column>
                        <el-table-column :label="$i18ns('申请时间')"  prop="data_create_time"  align="center">
                        </el-table-column>
                        <el-table-column :label="$i18ns('结案时间')" prop="data_update_time" align="center">
                        </el-table-column>
                        <el-table-column :label="$i18ns('申请人')" prop="data_create_user" align="center" show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column :label="$i18ns('审批结果')" prop="deal_ste" align="center" :formatter="formatData">
                        </el-table-column>
                    <!--    <el-table-column label="操作" prop="deal_type"  align="center" show-overflow-tooltip>
                            <template slot-scope="scope" >
                                <el-button type="text" icon="el-icon-document"  @click="viewRow(scope.row)">{{$i18ns('查看')}}详情</el-button>
                            </template>
                        </el-table-column> -->
                    </el-table>
                </el-collapse-item>
                <el-collapse-item :title="$i18ns('收案申请记录申请')" name="14">
                    <el-table ref="subackTable" :data="subackTable" :border="true" style="width: 98%;">
                        <el-table-column :label="$i18ns('申请单编号')"  prop="apply_no"  align="center">
                        </el-table-column>
                        <el-table-column :label="$i18ns('申请时间')"  prop="data_create_time"  align="center">
                        </el-table-column>
                        <el-table-column :label="$i18ns('结案时间')" prop="data_update_time" align="center">
                        </el-table-column>
                        <el-table-column :label="$i18ns('申请人')" prop="data_create_user" align="center" show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column :label="$i18ns('审批结果')" prop="apply_status" align="center" :formatter="formatData">
                        </el-table-column>
                     <!--   <el-table-column label="操作" prop="deal_type"  align="center" show-overflow-tooltip>
                            <template slot-scope="scope" >
                                <el-button type="text" icon="el-icon-document"  @click="viewRow(scope.row)">{{$i18ns('查看')}}详情</el-button>
                            </template>
                        </el-table-column>  -->
                    </el-table>
                </el-collapse-item>
                <el-collapse-item :title="$i18ns('诉讼关闭申请')" name="15">
                    <el-table ref="sucloseTable" :data="sucloseTable" :border="true" style="width: 98%;">
                        <el-table-column :label="$i18ns('申请单编号')"  prop="apply_no"  align="center">
                        </el-table-column>
                        <el-table-column :label="$i18ns('申请时间')"  prop="data_create_time"  align="center">
                        </el-table-column>
                        <el-table-column :label="$i18ns('结案时间')" prop="data_update_time" align="center">
                        </el-table-column>
                        <el-table-column :label="$i18ns('申请人')" prop="data_create_user" align="center" show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column :label="$i18ns('审批结果')" prop="apply_status" align="center" :formatter="formatData">
                        </el-table-column>
                      <!--  <el-table-column label="操作" prop="deal_type"  align="center" show-overflow-tooltip>
                            <template slot-scope="scope" >
                                <el-button type="text" icon="el-icon-document"  @click="viewRow(scope.row)">{{$i18ns('查看')}}详情</el-button>
                            </template>
                        </el-table-column> -->
                    </el-table>
                </el-collapse-item>
                <el-collapse-item :title="$i18ns('结案申请记录申请')" name="16">
                    <el-table ref="sufinishTable" :data="sufinishTable" :border="true" style="width: 98%;">
                        <el-table-column :label="$i18ns('申请单编号')"  prop="apply_no"  align="center">
                        </el-table-column>
                        <el-table-column :label="$i18ns('申请时间')"  prop="data_create_time"  align="center">
                        </el-table-column>
                        <el-table-column :label="$i18ns('结案时间')" prop="data_update_time" align="center">
                        </el-table-column>
                        <el-table-column :label="$i18ns('申请人')" prop="data_create_user" align="center" show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column :label="$i18ns('审批结果')" prop="apply_status" align="center" :formatter="formatData">
                        </el-table-column>
                 <!--   <el-table-column label="操作" prop="deal_type"  align="center" show-overflow-tooltip>
                            <template slot-scope="scope" >
                                <el-button type="text" icon="el-icon-document"  @click="viewRow(scope.row)">{{$i18ns('查看')}}详情</el-button>
                            </template>
                        </el-table-column>-->
                    </el-table>
                </el-collapse-item>
            </el-collapse>
        </el-collapse-item>
      </el-collapse>
      <el-dialog :title="$i18ns('借款缴费明细')" :visible.sync="modelVisible" :show-close="true" width="90.5%" :append-to-body="true">
          <div class="container-content--table">
                <el-table ref="list01Data" :data="list01Data" :border="true" style="width: 98%;">
                    <el-table-column :label="$i18ns('缴费申请单号')"  prop="apply_no" align="center" width="160px" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column :label="$i18ns('借据号')"  prop="loan_no"  align="center" width="160px" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column :label="$i18ns('客户名称')" prop="cust_name" align="center" width="80px" show-overflow-tooltip>
                    </el-table-column>
                   <!-- <el-table-column label="证件号码" prop="cert_no" align="center" width="160px" show-overflow-tooltip >
                    </el-table-column>-->
                    <el-table-column :label="$i18ns('费用类型')" prop="fee_type" align="center" width="80px" show-overflow-tooltip :formatter="formatFeeTypeData">
                    </el-table-column>
                    <el-table-column :label="$i18ns('费用金额')" prop="pay_amount" align="center" width="100px" show-overflow-tooltip >
                    </el-table-column>
                    <el-table-column :label="$i18ns('收款账户名称')" prop="acct_name" align="center" width="100px" show-overflow-tooltip >
                    </el-table-column>
                    <el-table-column :label="$i18ns('缴费发起人')" prop="data_create_user" align="center" width="100px" show-overflow-tooltip >
                    </el-table-column>
                    <el-table-column :label="$i18ns('缴费申请时间')" prop="data_create_time" align="center" width="150px" show-overflow-tooltip >
                    </el-table-column>

                    <el-table-column :label="$i18ns('缴费确认状态')" prop="pay_confirm_status" align="center" width="100px" show-overflow-tooltip :formatter="formatPayStautsData">
                    </el-table-column>

                   <el-table-column :label="$i18ns('客户承担金额')" prop="cust_amt" align="center" width="100px" show-overflow-tooltip >
                    </el-table-column>
                    <el-table-column :label="$i18ns('法院退回金额')" prop="court_back_amt" align="center" width="100px" show-overflow-tooltip >
                    </el-table-column>
                    <el-table-column :label="$i18ns('已处理法院退回金额')" prop="court_back_balance_after" align="center" width="100px" show-overflow-tooltip >
                    </el-table-column>
                    <el-table-column :label="$i18ns('未处理法院退回金额')" prop="court_back_balance" align="center" width="100px" show-overflow-tooltip >
                    </el-table-column>
                    <el-table-column :label="$i18ns('公司承担金额')" prop="compnay_amt" align="center" width="100px" show-overflow-tooltip >
                    </el-table-column>
                    <el-table-column :label="$i18ns('已处理公司承担金额')" prop="compnay_balance_after" align="center" width="100px" show-overflow-tooltip >
                    </el-table-column>
                    <el-table-column :label="$i18ns('未处理公司承担金额')" prop="compnay_balance" align="center" width="100px" show-overflow-tooltip >
                    </el-table-column>
                   <!-- <el-table-column label="缴费结案时间" prop="data_update_time" align="center" width="150px" show-overflow-tooltip >
                    </el-table-column>
                    <el-table-column label="缴费确认结案时间" prop="check_post_date" align="center" width="150px  " show-overflow-tooltip >
                    </el-table-column> -->
                </el-table>
            </div>
      </el-dialog>
    <el-dialog :close-on-click-modal="false" :title="$i18ns('申请单详情')" :visible.sync="resultShow" width="90%" :append-to-body="true">
      <div class="el-dialog-dev">
        <pte-resolver
          v-if="resultShow"
          :c-parent-meta="c_$meta"
          :c-parent-scope="c_$scope"
          :c-parent-params="c_$params"
          :to-request="toRequest"
        ></pte-resolver>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import MyAxios from "pte-ui/utils/MyAxios";
  export default {
    name: "SuitCaseInfo",
    props: {
      cMeta: Object, // 布局相关json数据
      cParentParams: Object, // 父页面传的参数
      cParentMeta: Object, // 父页面的相关json数据
      cParentScope: Object, // 父页面的scope数据对
    },
    data() {
      return {
        basicForm: { // 基础信息表单对象
          loan_no: "",//借据号
          cust_name: "",//客户名称
          cust_no: "",//客户号
          cert_no: "",//证件号码
          prod_name: "",//产品名称
          prod_no: "",//产品代码
          mobile_no: "",//手机号码
          loan_form: "",//贷款形态
          loan_form: "",//贷款形态(中字)
          jqstus: "",//结清状态
          jqstus_zn: "",//结清状态(中字)
          hxstus: "",//核销状态
          hxstus_zn: "",//核销状态(中字)
          ovdays: "",//逾期天数
          overdue_princi: "",//欠款本金
          isunitln: "",//是否联合贷
          isunitln_zn: "",//是否联合贷(中字)
          unitname: "",//联合贷公司名称
          is_lgfe: "",//是否法诉
          is_lgfe_zn: "",//是否法诉(中字)
          entrust_status: "",//当前案件委案状态
          entrust_status_zn: "",//当前案件委案状态(中字)
          entr_time: "",//当前委案时间
          entrorg_name: "",//当前委案机构
          entr_amt: "",//当前委案金额
          suit_status: "",//当前案件诉讼状态
          suit_status_zn: "",//当前案件委案状态(中字)
        },
       entr_amt: "", //当前委案金额
       list01Data:[],  //借款缴费明细
       suStartTable:[],//诉讼发起申请信息
       suEntrustTable:[],//诉讼委案申请信息
       yysqTable:[],//诉讼资料用印申请信息
       dzjfsqTable:[],//借款缴费申请信息
       dzjfqrTable:[],//借款缴费确认申请信息
       fyzfsqTable:[],//费用支付申请信息
       laslTable:[],//立案受理信息记录申请信息
       lasljgTable:[],//立案受理结果记录申请信息
       zxsljlsqTable:[],//执行受理信息记录申请信息
       zxjgjlsqTable:[],//执行受理结果记录申请信息
       subackTable:[],//收案申请记录申请信息
       sucloseTable:[],//诉讼关闭申请信息
       sufinishTable:[],//结案申请记录申请信息
       clssstList:[],//贷款形态list
       yesOrNoList:[],//是否list
       enStatusList:[],//案件委案状态list
       suStatusList:[],//案件诉讼状态list
       statusList:[],//审批结果list
       paystatusList:[],//支付状态list
       feeTypeList:[], //费用类型list
       payConfirmStatusList:[], //缴费确认状态list
       activeNames_basic: ["1","2"],
       activeNames_apply: ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17"],
       modelVisible: false,
       resultShow: false, //是否展示申请单详情
       c_$meta: {},
       c_$scope: {},
       c_$params: {
         appl_id: "",
         task_url1: "",
         task_url2: "",
       },
       toRequest: {
         "url": "@csAlredyToDoDetails",
         "method": "GET",
         "target": "navTab",
         "params": {
            "framecd": "warnMan",
         }
       },
      }
    },
    created() {
      this.getDictList("MS_E_LEVEL5_TYPE", "clssstList"); // 贷款形态list
      this.getDictList("MS_E_YESORNO", "yesOrNoList"); // 是否list
      this.getDictList("PL_E_ENTRUSTSTUS", "enStatusList"); //案件委案状态list
      this.getDictList("PL_E_SUITSTUS", "suStatusList"); //案件诉讼状态list
      this.getDictList("PL_E_SUITAPLYSTATUS","statusList"); //审批结果list
      this.getDictList("PL_E_PAY_STATUS","paystatusList"); //支付状态list
      this.getDictList("PL_E_FEE_TYPE","feeTypeList"); //费用类型list
      this.getDictList("Pl_E_PAY_CONFIRM_STATUS","payConfirmStatusList"); //缴费确认状态list
    },
    methods: {
        /**
         * 获取数据字典列表
         * @param dictType  数据字典 dictType
         * @param listKey 列表对象key名称
         */
        getDictList(dictType, listKey) {
          let params = {
            dictType: dictType,
            dictKey: [dictType]
          };
          MyAxios.invokeAPI("/SUMP/rest/dict", "post", params)
            .then(res => {
              if (res && res.code === "200") {
                this[listKey] = res.data;
              }
            })
            .catch(err => {
              console.error(err);
            });
        },
        /**
         * 法诉案件信息查询
         */
        infoGet(e) {
            this.$data.basicForm = this.$options.data().basicForm;
            this.list01Data = [];
            this.suStartTable = [];
            this.suEntrustTable = [];
            this.yysqTable = [];
            this.dzjfsqTable = [];
            this.dzjfqrTable = [];
            this.fyzfsqTable = [];
            this.laslTable = [];
            this.lasljgTable = [];
            this.zxsljlsqTable = [];
            this.zxjgjlsqTable = [];

            this.subackTable = [];
            this.sucloseTable = [];
            this.sufinishTable = [];

            this.basicForm.loan_no = e.target.value;
            if(this.basicForm.loan_no.length == 0){
                return false;
            }else{
                this.getSuitHisInfo();
            };
        },
        /**
         * 借据公共信息
         */
        getBaseInfo() {
          let params = {
            servicecode: "pl0601",
            loan_no: this.basicForm.loan_no,
          };
          MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
            .then(res => {
              if (res && res.code === "200" && res.data) {
                this.basicForm = res.data;
              }
            })
            .catch(err => {
              console.error(err);
              return false;
            })
        },
        /**
         * 历史申请单信息
         */
        getSuitHisInfo() {
          let params = {
            servicecode: "pl0603",
            loan_no: this.basicForm.loan_no,
          };
          MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
            .then(res => {
              if (res && res.code === "200" && res.data) {
                  this.suStartTable = res.data.sustart; //诉讼发起申请信息
                  this.suEntrustTable = res.data.suentrust; //诉讼委案申请信息
                  this.yysqTable = res.data.yysq; //诉讼资料用印申请信息
                  this.dzjfsqTable = res.data.dzjfsq; //借款缴费申请信息
                  this.dzjfqrTable = res.data.dzjfqr; //借款缴费确认申请信息
                  this.fyzfsqTable = res.data.fyzfsq; //费用支付申请信息
                  this.laslTable = res.data.lasl; //立案受理信息记录申请信息
                  this.lasljgTable = res.data.lasljg; //立案受理结果记录申请信息
                  this.zxsljlsqTable = res.data.zxsljlsq; //执行受理信息记录申请信息
                  this.zxjgjlsqTable = res.data.zxjgjlsq; //执行受理结果记录申请信息
                  this.subackTable = res.data.suback; //收案申请记录申请信息
                  this.sucloseTable = res.data.suclose; //诉讼关闭申请信息
                  this.sufinishTable = res.data.sufinish; //结案申请记录申请信息
                  this.getBaseInfo();
              }
            })
            .catch(err => {
              console.error(err);
              return false;
            })
        },
        /**
         * 日期格式化
         */
        dateFormat(row,column){
            var date = row[column.property];
            if(date == ""){
                return ""
            }else{
                var year = date.substring(0,4);
                var month = date.substring(4,6);
                var day = date.substring(6,8);
                var hour = date.substring(8,10);
                var minutes = date.substring(10,12);
                var seconds = date.substring(12,14);
                return (year + "-" + month + "-" + day + " " + hour + ":" + minutes + ":" + seconds);
            }
        },
        /**
         * 费用类型
         */
        formatFeeTypeData(row,column){
          let name = row[column.property];
          let data = row[column.property];
          this.feeTypeList.forEach(function(item,index){
            if(data == item.dictId){
              name = item.dictName;
            }
          })
          return name;
        },
        /**
         * 缴费确认状态
         */
        formatPayStautsData(row,column){
          let name = row[column.property];
          let data = row[column.property];
          this.payConfirmStatusList.forEach(function(item,index){
            if(data == item.dictId){
              name = item.dictName;
            }
          })
          return name;
        },
        /**
         * 中字转换
         */
        formatTypeData(value,list){
          let name = "";
          let data = value;
          list.forEach(function(item,index){
            if(data == item.dictId){
              name = item.dictName;
            }
          })
          return name;
        },
        /**
         * 审批结果
         */
        formatData(row,column){
          let name = row[column.property];
          let data = row[column.property];
          this.statusList.forEach(function(item,index){
            if(data == item.dictId){
              name = item.dictName;
            }
          })
          return name;
        },
        /**
         * 审批结果
         */
        formatDatap(row,column){
          let name = row[column.property];
          let data = row[column.property];
          this.paystatusList.forEach(function(item,index){
            if(data == item.dictId){
              name = item.dictName;
            }
          })
          return name;
        },
        /**
        * 获取借款缴费明细
        */
        searchTeller() {
            if(this.basicForm.loan_no.length == 0){
                this.$message({type: "warning", message: "借据号未录入!"});
                return false;
            };
            this.modelVisible = true;
            let reqMap = {
                loan_no: this.basicForm.loan_no,
                servicecode: "pl0548",
            };
            MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", reqMap).then(res => {
                if (res && res.code === "200" && res.data !== null) {

                    this.list01Data = res.data;
                    console.info(this.list01Data);
                    // res.data.forEach(item =>{
                    //     this.list01Data.push(item);
                    // });
                }
            }).catch(err => {
                console.error(err);
            });
        },
        /**
         * 查看详情
         */
        viewRow(row){
            this.resultShow = true;
            this.c_$params.appl_id = row.applid;
            this.c_$params.task_url1 = row.task_url1;
            this.c_$params.task_url2 = row.task_url2;
        }
    }
  }

</script>

<style lang="less" scoped>
.custom-common--form {
    padding: 0;
    .el-row .el-col {
        padding-right: 16px;
    }
}
/deep/ .el-dialog__body{
  height:70vh;
  overflow: auto;
}
</style>
