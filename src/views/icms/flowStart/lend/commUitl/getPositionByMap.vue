<template>
  <baidu-map
    class="bm-view"
    scroll-wheel-zoom
    :center="location"
    :zoom="zoom"
    ak="uov9RqP27fAsCiNBbQAE133yoOZTr3Tp"
    @ready="mapReady"
    style="width: 1000px; height:500px;"
  >
    <bm-view class="map" style="width: 100%; height:100%; flex: 1"></bm-view>

    <!-- 自定义控件 -->
    <bm-control>
      <el-row class="row">
        <el-col :span="2">
          <span class="label">经度：</span>
        </el-col>
        <el-col :span="9">
          <el-input v-model="location.lng" placeholder="经度"></el-input>
        </el-col>
        <el-col :span="2">
          <span class="label">纬度：</span>
        </el-col>
        <el-col :span="9">
          <el-input v-model="location.lat" placeholder="纬度"></el-input>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" @click="lockPosition" size="small" height="36px">锁定</el-button>
        </el-col>
      </el-row>
      <!-- 自动填充 -->
      <bm-auto-complete :sugStyle="{zIndex: 999999}">
        <el-input v-model="inputValue" placeholder="输入关键字进行模糊查询" @change="confirmAddress"></el-input>
      </bm-auto-complete>
      <bm-marker :position="{lng: location.lng, lat: location.lat}" :dragging="true" animation="BMAP_ANIMATION_BOUNCE">
        <bm-label content="当前地点" :labelStyle="{color: 'red', fontSize : '24px'}" :offset="{width: -35, height: 30}"/>
      </bm-marker>
    </bm-control>
    <!-- 手动放大缩小到省市街道 位置：右下方-->
    <bm-navigation anchor="BMAP_ANCHOR_BOTTOM_RIGHT"/>
  </baidu-map>
</template>
<script>
import BaiduMap from 'vue-baidu-map/components/map/Map.vue'; //百度地图接入
import BmView from 'vue-baidu-map/components/map/MapView.vue'
import BmLocalSearch from 'vue-baidu-map/components/search/LocalSearch.vue'
import BmNavigation from "vue-baidu-map/components/controls/Navigation";
import BmMarkerClusterer from "vue-baidu-map/components/extra/MarkerClusterer";
import BmMarker from "vue-baidu-map/components/overlays/Marker";
import BmInfoWindow from "vue-baidu-map/components/overlays/InfoWindow"; //标注弹窗
import BmAutoComplete from "vue-baidu-map/components/others/AutoComplete";
import BmControl from "vue-baidu-map/components/controls/Control";

let geocoder;
export default {
  props: {
    cParentParams: Object, // 父页面传的参数
  },
  components: {
    BaiduMap,
    BmView,
    BmLocalSearch,
    BmNavigation,
    BmMarkerClusterer,
    BmMarker,
    BmInfoWindow,
    BmAutoComplete,
    BmControl
  },
  data() {
    return {

      // 百度地图参数
      model: {},
      BMap: {},
      map: {},
      location: {
        lng: this.cParentParams.longitude || "113.949180",
        lat: this.cParentParams.latitude || "22.531276"
      },
      zoom: 14,
      inputValue: "",
      keyword: ''

    }
  },
  mounted() {
    let that = this;
    console.log("cParentParams", that.cParentParams);
  },
  methods: {
    // 搜索框的搜索事件
    confirmAddress(e) {
      // console.log("this.model.address:",this.model.address)
      if (this.inputValue != '') {
        // console.log("搜索字段为:" + this.inputValue)
        this.keyword = this.inputValue
      }

      //为啥使用延时？？
      //因为上面搜索框是change事件，变化的太快了看起来效果不好所以添加了延时
      setTimeout(() => {
        console.log(this.inputValue)
        //搜索时把需要标点的地址传入local.search中
        var local = new BMap.LocalSearch(this.map, {
          renderOptions: {map: this.map}
        });
        local.search(this.keyword);
      }, 600)
    },
    search() {
      if (this.inputValue != '') {
        console.log("搜索字段为:" + this.inputValue)
        this.keyword = this.inputValue
        var local = new BMap.LocalSearch(this.map, {
          renderOptions: {map: this.map}
        });
        local.search(this.keyword);
      }
    },
    // baidu-map组件的ready事件
    mapReady({BMap, map}) {
      this.BMap = BMap;
      this.map = map;

      geocoder = new BMap.Geocoder(); //创建地址解析器的实例
      if (this.model.hasOwnProperty('address')) {//如果当前model中包含address 则证明是修改弹框里面的地址数据（地址存在，打开弹框显示地址标点）
        this.keyword = this.model.address
        this.inputValue = this.model.address
      } else {//否则显示默认标点（这里的经纬度代表成都）
        //第二个参数  10 代表地图缩 放级别,最大为19,最小为0

        setTimeout(() => {
          this.map.centerAndZoom(new BMap.Point(this.location.lng, this.location.lat), 14);
        }, 1000);
        this.keyword = ''
        this.inputValue = ''
      }
      // 点击百度地图上的搜索出来的红色标记点
      map.addEventListener("click", ({point}) => {
        this.location.lng = point.lng;
        this.location.lat = point.lat;
        console.log(this.location.lng);
        console.log(this.location.lat)
        geocoder.getLocation(point, res => {
          this.inputValue = res.address;
          this.model.address = res.address;
          this.model.storeLongitude = point.lng
          this.model.storeLatitude = point.lat
          // this.$forceUpdate();
        });
      });
    },

    // 地区组件的markersset事件
    setAddressList(e) {
      console.log(e);
    },
    // 地区组件的markersset事件
    lockPosition(e) {
      this.$emit("callBack", this.location);
    },
  }
}
</script>
<style>
.row{
  display: flex;
  align-items: center;
}
.label {
  font-weight: bold;
  background: #FFF;
}

</style>
