import CustConnectAppl from "@/views/us/custConnect/CustConnectAppl.vue"; //客户交接申请
import CustHandoverManage from "@/views/us/custConnect/CustHandoverManage.vue"; //客户交接管理
import creditGroupView from "@/views/us/creditGroup/creditGroupView.vue"; //授信群体展示页面
import creditGroupTree from "@/views/us/creditGroup/letterUser/lookup/lookUpTree.vue"; //授信群体树选择
import keyPeopleTransfer from "@/views/us/creditGroup/keyPeople/keyPeopleTransfer.vue"; //授信群体树选择
import assetsRepor from "@/views/us/creditGroup/repor/assetsRepor.vue"; //报表对比
import incomeAndExRepor from "@/views/us/creditGroup/repor/incomeAndExRepor.vue"; //报表对比
import customerFinancialStatements from "@/views/us/creditGroup/repor/customerFinancialStatements.vue"; //报表对比
import lookImg  from "@/views/us/entManager/custDocManager/lookImg.vue";//查图片
import baseContainer  from "@/views/us/viewManage/page/container.vue";//测试
import viewConfig from "@/views/us/viewManage/viewConfig/index.vue";
import viewDetail from "@/views/us/viewManage/viewConfig/detail.vue";
import groupCustTree from "@/views/us/groupManager/groupCustTree.vue";//集团授信状况
import socialfundInfo  from "@/views/us/viewManage/page/private/socialfund/socialfund_info.vue";// 个人社保公积金信息查询
import assetsInfo  from "@/views/us/viewManage/page/private/assetsInfo/assets_info.vue";// 家庭资产
import entBaseInfoThumbnail  from "@/views/us/viewManage/page/ent/entBaseInfo/ent_base_info_thumbnail.vue";//对公个人基本简易信息页面
import entFinancialAnalysisThumbnail  from "@/views/us/viewManage/page/ent/entFinancialAnalysis/ent_financial_analysis_thumbnail.vue";//对公财报分析简易信息页面
import financialEchartsView  from "@/views/us/viewManage/page/ent/entFinancialAnalysis/financial_echarts_view.vue";//对公财报分析图表信息页面
import entLegalPersonThumbnail  from "@/views/us/viewManage/page/ent/entLegalPerson/ent_legal_person_thumbnail.vue";//对公法人简易信息页面
import usbCorpHandlerThumbnail  from "@/views/us/viewManage/page/ent/usbCorpHandler/usb_corp_handler_thumbnail.vue";//对公高管与董事会简易信息页面
import entRevenueDataEchartsView  from "@/views/us/viewManage/page/ent/entRevenueData/ent_revenue_data_echarts_view.vue";//主营分析图表页面
import cardLayout  from "@/views/us/viewManage/page/ent/entRevenueData/card_layout.vue";//主营分析图表布局页面
import entDebtInfoThumbnail  from "@/views/us/viewManage/page/comm/debtInfo/debt_info_thumbnail.vue";//负债情况简易展示页面
import entCreditRatingThumbnail  from "@/views/us/viewManage/page/ent/entCreditRating/ent_credit_rating_thumbnail.vue";//信评信息展示页面
import entRevenueDataThumbnail  from "@/views/us/viewManage/page/ent/entRevenueData/ent_revenue_data_thumbnail.vue";//主营分析简易展示页面
import entCreditInfoThumbnail  from "@/views/us/viewManage/page/ent/entCreditInfo/ent_credit_info_thumbnail.vue";//授信信息简易展示页面
import custBusiFileLayout  from "@/views/us/privateManage/baseInfo/custBusiFile/custBusiFileLayout.vue";//客户业务资料页面

export default {
    CustConnectAppl,
    CustHandoverManage,
    creditGroupView,
    creditGroupTree,
    keyPeopleTransfer,
    assetsRepor,
    incomeAndExRepor,
    customerFinancialStatements,
    lookImg,
    baseContainer,
    viewConfig,
    socialfundInfo,
    assetsInfo,
    viewDetail,
    entBaseInfoThumbnail,
    entFinancialAnalysisThumbnail,
    financialEchartsView,
    entLegalPersonThumbnail,
    usbCorpHandlerThumbnail,
    entRevenueDataEchartsView,
    cardLayout,
    entDebtInfoThumbnail,
    entCreditRatingThumbnail,
    entRevenueDataThumbnail,
    entCreditInfoThumbnail,
    groupCustTree,
    custBusiFileLayout
}
