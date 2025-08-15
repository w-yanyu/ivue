
import PledgeEntry from "@/views/co/colsProductManager/coltRelaManager/PledgeEntry.vue";//抵质押品对应表新增
import PledgeUpdate from "@/views/co/colsProductManager/coltRelaManager/PledgeUpdate.vue";//抵质押品对应表新增

import CollateralEntry from "@/views/co/colsEntryManage/CollateralEntry.vue"; // 押品录入
import comparativeAnalysisCollateral from "@/views/co/colsAnalysis/comparativeAnalysisCollateral.vue"
import AppraisementInEntry from "@/views/co/colsAppraisement/AppraisementInEntry.vue";//内部评估申请启动
import AppraisementOutEntry from "@/views/co/colsAppraisement/AppraisementOutEntry.vue";//外部评估申请启动
import evaluateResult from "@/views/co/colsAppraisement/evaluateResult.vue";
import InOutWareResult from "@/views/co/colsWarehous/InOutWareResult.vue";
import logoUploadButton from "@/views/co/carManager/logoUploadButton.vue";// logo上传按钮
import carDetailView from "@/views/co/carManager/carDetailView.vue";// 查看车型详情页面
import info_image from "@/views/co/colsEntryManage/cobAsset/new/info_image.vue";//影像上传页面
import commPersonInfo from "@/views/co/colsEntryManage/cobAsset/new/info_comm_person.vue";// 共有人列表

export default {
  PledgeEntry,
  CollateralEntry,
  comparativeAnalysisCollateral,
  AppraisementInEntry,
  AppraisementOutEntry,
  evaluateResult,
  InOutWareResult,
  PledgeUpdate,
  logoUploadButton,
  carDetailView,
  info_image,
  commPersonInfo
}
