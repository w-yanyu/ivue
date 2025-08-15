<template>
  <div>
    <el-form
      :inline="true"
      status-icon
      :rules="rules"
      ref="ruleForm"
      :model="ruleForm"
      class="search-form"
    >
      <el-row class="bottom-border">
        <el-col :span="18" :xs="24">
          <el-row>
            <el-col :span="12" :xs="24">
              <el-form-item label="自定义指令" prop="cmd2">
                <el-input v-model="ruleForm.cmd2" placeholder="谨慎使用"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="6" :xs="24">
          <el-row type="flex" class="row-bg" justify="center">
            <el-button type="primary" icon="el-icon-search" @click="search('ruleForm')">查询</el-button>
          </el-row>
        </el-col>
      </el-row>
    </el-form>
    <el-row>
      <el-table :data="tableData" border style="width: 98%" v-loading="loading">
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column prop="filename" label="当前目录下文件/文件夹"></el-table-column>
        <el-table-column label="当前路径">
          <template>{{this.local}}</template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="150">
          <template slot-scope="scope">
            <el-button @click="into(scope.row)" type="text" size="small">进入</el-button>
            <el-button @click="outto(scope.row)" type="text" size="small">{{$i18ns('返回')}}</el-button>
            <el-button @click="download(scope.row)" type="text" size="small">{{$i18ns('下载')}}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
  </div>
</template>
<script>
import MyAxios from "pte-ui/utils/MyAxios";
import * as _ from "lodash";
export default {
  props: {
    cMeta: Object, //本页面模板json数据Layout对象
    cParentMeta: Object, //父页面模板json数据Layout对象
    cParentParams: Object, //父页面自定义参数与内置参数
    cParentScope: Object //父页面每块区域业务数据
  },
  //自定义表单
  data() {
    var checktermrt = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("不能为空"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        sequno: "",
        cmd1: "/lttsdata/applog",
        cmd2: ""
      },
      cmd: "",
      local: "",
      ip: "ifconfig eth0 | grep 'inet' | awk '{ print $2}' |awk 'NR==1' &&",
      tableData: null,
      currentPage: null,
      total: 0,
      pagesize: 10,
      loading: false,
      test: ["/lttsdata", "/applog"],
      rules: {
        epcgcd: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        //自定义验证
        termrt: [{ validator: checktermrt, trigger: "blur" }]
      },
      dialogVisible: false
    };
  },
  methods: {
    //进入当前文件夹
    into(row) {
      this.test.push('/'+row.filename);
      var s = "ls ";
      this.local = this.test.toString().replace(/,/g, "");
      this.cmd = s.concat(this.local);
      this.submit("ruleForm");
    },
    //返回
    outto(row) {
      var s = "ls /";
      this.test.pop();
      this.local = this.test.toString().replace(/,/g, "");
      this.cmd = s.concat(this.local);
      this.submit("ruleForm");
    },
    //下载
    download(row) {
      this.path = this.local.concat("/", row.filename).replace("//", "/");
      if (this.ruleForm.path != null) {
        this.path = this.ruleForm.path;
      }
      let params = {
        czlx: "1",
        path: this.path
      };
      this.$message({ type: "success", message: "文件下载中" });
      MyAxios.invokeAPI("/SUMP/workflow/getlog", "post", params)
        .then(res => {
          this.loading = false;
          if (res.code === "200") {
            this.$message({
              type: "success",
              message: "下载成功"
            });
            var filename = row.filename;
            let URL = this.dataUrlToBlob(res.data.fileString, res.data.prefix);
            var a = document.createElement("a");
            a.download = filename;
            a.style.display = "none";
            a.href = window.URL.createObjectURL(URL);
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
          } else {
            this.$message({
              type: "error",
              message: "下载失败"
            });
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    dataUrlToBlob(data, prefix) {
      var bstr = window.atob(data);
      var n = bstr.length;
      var u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new Blob([u8arr], { type: prefix });
    },

    //页容量
    handleSizeChange(val) {
      this.pagesize = val;
      this.submit("ruleForm");
    },
    //页码位置
    handleCurrentChange(val) {
      this.currentPage = val;
      this.submit("ruleForm");
    },
    //搜索
    search(val) {
      this.currentPage = 1;
      this.local = this.test.toString().replace(/,/g, "");;
      this.cmd = "";
      if (this.ruleForm.cmd2 == "") {
        var s = "ls /";
        this.cmd = s.concat(this.local);
      } else {
        this.cmd = this.ruleForm.cmd2;
      }
      this.submit("ruleForm");
    },
    //通讯事件
    submit(formName) {
      let that = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.cmd == "") {
          }
          let params = {
            cmd2: this.cmd.replace("//", "/")
          };
          this.loading = true;
          console.log(params);
          MyAxios.invokeAPI("/SUMP/workflow/getlog", "post", params).then(
            res => {
              this.loading = false;
              if (res.code === "200") {
                this.tableData = res.data.list;
              } else {
                this.$message({
                  type: "error",
                  message: "操作失败"
                });
                that.resetForm(formName);
              }
            }
          );
        } else {
          this.$message({
            type: "warning",
            message: "校验不通过"
          });
        }
      });
    },

    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>