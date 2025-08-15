<template>
    <div>
        <el-row class="pd10">
            <el-col :span="12">
                <el-radio v-model="radio" :label="0">{{$i18ns('无水印')}}</el-radio>
            </el-col>
            <el-col :span="12">
                <el-radio v-model="radio" :label="1">{{$i18ns('添加水印')}}</el-radio>
            </el-col>
        </el-row>
        <el-form v-if="radio === 1" :model="form" label-width="80px">
            <el-form-item ::label="$i18ns('水印文字')">
                <el-select
                    v-model="form.watermark_txt"
                    filterable
                    allow-create
                    default-first-option
                    :placeholder="$i18ns('请输入水印文字')"
                >
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="`${item.label}（${item.value}）`"
                        :value="item.value"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-row :gutter="20">
                <el-col :span="12">
                    <el-form-item :label="$i18ns('字号大小')">
                        <el-input-number v-model="form.watermark_fontsize" :min="14" :max="100"></el-input-number>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item :label="$i18ns('字体颜色')">
                        <el-color-picker v-model="form.watermark_color"></el-color-picker>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="12">
                    <el-form-item :label="$i18ns('多行水印')">
                        <el-radio-group v-model="form.watermark_type">
                            <el-radio label="1">{{$i18ns('多行')}}</el-radio>
                            <el-radio label="2">{{$i18ns('单行')}}</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item :label="$i18ns('旋转水印')">
                        <el-radio-group v-model="form.watermark_angle">
                            <el-radio :label="25">{{$i18ns('倾斜')}}</el-radio>
                            <el-radio :label="0">{{$i18ns('水平')}}</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-form-item :label="$i18ns('不透明度')">
                <el-slider v-model="form.watermark_alpha" show-input></el-slider>
            </el-form-item>
        </el-form>
        <div class="footer-btn">
            <el-button type="primary" @click="onSubmit">{{$i18ns('确认')}}</el-button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            radio: 0,
            form: {
                watermark_txt: "",
                watermark_fontsize: 20,
                watermark_color: "#000",
                watermark_alpha: 10,
                watermark_type: "1",
                watermark_angle: 25,
            },
            options: [
                {
                    value: JSON.parse(localStorage.getItem("user_info"))
                        .userName,
                    label: this.$i18ns('当前用户'),
                },
                {
                    value: this.$moment().format("YYYY-MM-DD"),
                    label: this.$i18ns('当前日期'),
                },
            ],
        };
    },
    created() {
        this.form.watermark_txt = this.options[0].value;
    },
    methods: {
        onSubmit() {
            if (document.getElementById("frame")) {
                document.getElementById("frame").remove();
            }
            let maskElement = document.getElementById("print");
            if (this.radio) {
                let defaultSettings = {
                    ...this.form,
                    watermark_x: 50,
                    watermark_y: 50,
                    watermark_rows: 5,
                    watermark_cols: 1,
                    watermark_x_space: 20,
                    watermark_y_space: 50,
                    watermark_alpha: this.form.watermark_alpha / 100,
                    watermark_width: 270,
                    watermark_height: 120,
                };
                let oTemp = document.createDocumentFragment();
                let page_width = Math.min(
                    maskElement.scrollWidth,
                    maskElement.clientWidth
                );
                let page_height = Math.min(
                    maskElement.scrollHeight,
                    maskElement.clientHeight
                );
                if (defaultSettings.watermark_type === "2") {
                    defaultSettings.watermark_x = Math.ceil(page_width / 2);
                } else {
                    defaultSettings.watermark_cols = 4;
                }
                //水印数量适应元素区域尺寸
                defaultSettings.watermark_rows = Math.ceil(
                    page_height /
                        (defaultSettings.watermark_y_space +
                            defaultSettings.watermark_height)
                );
                let x;
                let y;
                let frame = document.createElement("div");
                frame.setAttribute("id", "frame");
                oTemp.appendChild(frame);
                for (var i = 0; i < defaultSettings.watermark_rows; i++) {
                    y =
                        defaultSettings.watermark_y +
                        (defaultSettings.watermark_y_space +
                            defaultSettings.watermark_height) *
                            i;
                    for (var j = 0; j < defaultSettings.watermark_cols; j++) {
                        x =
                            defaultSettings.watermark_x +
                            defaultSettings.watermark_x_space +
                            defaultSettings.watermark_width * j;
                        let mask_div = document.createElement("div");
                        mask_div.id = "mask_div" + i + j;
                        mask_div.className = "mask_div";
                        mask_div.innerHTML = defaultSettings.watermark_txt;
                        mask_div.style.transform = `rotate(-${defaultSettings.watermark_angle}deg)`;
                        mask_div.style.visibility = "";
                        mask_div.style.position = "absolute";
                        if (defaultSettings.watermark_type === "2") {
                            mask_div.style.transform = `translateX(-50%) rotate(-${defaultSettings.watermark_angle}deg)`;
                            mask_div.style.left = "50%";
                            mask_div.style.width = "100%";
                        } else {
                            mask_div.style.left = x + "px";
                        }
                        mask_div.style.top = y + "px";
                        mask_div.style.overflow = "hidden";
                        mask_div.style.zIndex = "9999";
                        mask_div.style.pointerEvents = "none";
                        mask_div.style.opacity =
                            defaultSettings.watermark_alpha;
                        mask_div.style.fontSize =
                            defaultSettings.watermark_fontsize + "px";
                        mask_div.style.color = defaultSettings.watermark_color;
                        mask_div.style.textAlign = "center";
                        mask_div.style.display = "block";
                        frame.appendChild(mask_div);
                    }
                }
                maskElement.appendChild(oTemp);
            }
            this.$print(maskElement, {
                noPrint: ".noPrint",
                onPrintDialogClose: () => {
                    if (document.getElementById("frame")) {
                        document.getElementById("frame").remove();
                    }
                    this.$dataBus.doCallBack(this);
                },
            });
        },
    },
};
</script>

<style lang="less" scoped>
.pd10 {
    padding: 0 10px;
}
/deep/ .el-form {
    .el-select,
    .el-color-picker,
    .el-color-picker .el-color-picker__trigger {
        width: 100%;
    }
    .el-color-picker__icon {
        text-align: right;
        padding-right: 16px;
        box-sizing: border-box;
    }
}
.footer-btn {
    margin: 10px;
    text-align: center;
}
</style>
<style>
.el-color-picker__panel {
    z-index: 9999 !important;
}
</style>