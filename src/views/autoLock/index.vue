<template>
  <!-- 样式来自pte-ui内部的手动锁屏 -->
  <div class="global-web-lock">
    <el-dialog
      title=""
      :visible="true"
      :fullscreen="true"
      :show-close="false"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      center>
      <el-image :src="url" class="lock-background">
        <div slot="error" class="default-lock-background"></div>
      </el-image>
      <div class="lock-main">
        <el-form :form="form" @submit.native.prevent>
          <div class="form-name">{{userName}}</div>
          <div class="form-password">
            <pte-password
              v-model="userPassword"
			        :type="isTextType ? 'text' : 'password'"
              :encryptionType="SHA"
              :placeholder="$i18ns('password')"
              autocomplete="on">
            </pte-password>
            <i slot="suffix"
              :class="['el-input__icon', showEye ? 'el-icon-view' : '']"
              @click="isTextType = !isTextType"
            ></i>
            <span class="enter-system" @click="submit">
              <i class="el-icon-right"></i>
            </span>
          </div>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapMutations } from "vuex";

export default {
  name: "tokenLock",
  data() {
    return {
      isTextType: false,
      userPassword: ""
    }
  },
  computed: {
    url() {
      return this.$store.state.user.lockBackgroundUrl
    },
    userName() {
      return this.$store.state.user.name
    }
  },
  watch: {
    userPassword(val) {
      if (val) {
        this.showEye = true;
        this.isTextType = false;
      } else {
        this.isTextType = true;
        this.showEye = false;
      }
    }
  },
  mounted() {
    document.onkeyup = e => {
      let event = e || window.event;
      let key = event.which || window.charcode || event.keyCode;
      if (key === 13) {
        this.submit();
      }
    }
  },
  destroyed() {
    document.onkeyup = null;
  },
  methods: {
    ...mapMutations(["SET_EXPIRED_STATUS", "SET_LOGIN_INFO"]),
    submit() {
      let _this = this;
      this.$http.invokeAPI("/SUMP/rest/auth/relogin", "post", { password: _this.userPassword }).then(response => {
        if (response && response.code === "200") {
          _this.SET_LOGIN_INFO(response);
          _this.SET_EXPIRED_STATUS(false);
        }
      })
    }
  }
};
</script>
