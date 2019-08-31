<template>
  <div id="app" class="mainBody">
    <div class="headerBox"></div>
    <div class="mainBox">
      <div class="titleLine">
        <div class="titleRow">
          <i></i>
          <span>新建粉团队</span>
        </div>
      </div>

      <a-form :form="form" @submit="handleSubmit">
        <a-form-item v-bind="formItemLayout" label="添加背景图：">
          <div class="updataBoxA">
            <a-upload
              class="boxWH"
              name="avatar"
              action="https://zxcity-app.oss-cn-hangzhou.aliyuncs.com"
              @change="handleChange"
              v-decorator="[
                                        'logoImgA'
                                      ]"
            >
              <img v-if="imageUrl" :src="imageUrl" class="imgWh">
              <img v-else :src="p+'nrhLogo.png'" class="imgWh">
            </a-upload>
          </div>
          <div class="updataInfo">上传图片可为任意格式，尺寸：750*350像素</div>
        </a-form-item>
        <a-form-item v-bind="formItemLayout" label="粉团队名称：">
          <a-input
            class="inputWidA"
            placeholder="请输入"
            v-decorator="[
                                'fansName',
                                {rules: [{ required: true, message: '请输入粉团队名称!' }]}
                              ]"
          />
        </a-form-item>
        <a-form-item v-bind="formItemLayout" label="上传LOGO：">
          <div class="updataBoxB">
            <a-upload
              class="boxWH"
              name="avatar"
              action="https://zxcity-app.oss-cn-hangzhou.aliyuncs.com"
              @change="handleChange"
              v-decorator="[
                                        'logoImgB'
                                      ]"
            >
              <img v-if="imageUrl" :src="imageUrl" class="imgWh">
              <img v-else :src="p+'nrhLogo.png'" class="imgWh">
            </a-upload>
          </div>
          <div class="updataInfo">修改LOGO,尺寸：160*160像素</div>
        </a-form-item>

        <a-form-item v-bind="formItemLayout" label="粉团队口号：">
          <a-textarea
            class="inputWidB"
            placeholder="请输入粉团队口号"
            :rows="4"
            v-decorator="[
                                'kouhao',
                                {rules: [{ required: true, message: '请输入粉团队口号!' }]}
                              ]"
          />
        </a-form-item>

        <a-form-item v-bind="formItemLayout" label="旗帜或其他标识：">
          <div class="formBox">
            <div class="updataBoxB">
              <img :src="p+'xc_sccc.png'" class="updataDelIcon" @click="imgDel()">
              <a-upload
                class="boxWH"
                name="avatar"
                action="https://zxcity-app.oss-cn-hangzhou.aliyuncs.com"
                @change="handleChange"
                v-decorator="[
                                        'logoImgB'
                                      ]"
              >
                <img v-if="imageUrl" :src="imageUrl" class="imgWh">
                <img v-else :src="p+'nrhLogo.png'" class="imgWh">
              </a-upload>
            </div>
            <div class="updataBoxB">
              <a-upload
                class="boxWH"
                name="avatar"
                action="https://zxcity-app.oss-cn-hangzhou.aliyuncs.com"
                @change="handleChange"
                v-decorator="[
                                            'logoImgB'
                                          ]"
              >
                <img v-if="imageUrl" :src="imageUrl" class="imgWh">
                <img v-else :src="p+'defaultImg.png'" class="imgWh">
              </a-upload>
            </div>
          </div>

          <div class="updataInfo">图片最多添加9张</div>
        </a-form-item>

        <a-form-item v-bind="formItemLayout" label="粉团队文化：">
          <a-textarea
            class="inputWidB"
            placeholder="请输入粉团队口号"
            :rows="4"
            v-decorator="[
                                '文化'
                              ]"
          />
        </a-form-item>

        <div class="rowFoot">
          <a-button @click="resetForm">取消</a-button>
          <a-button type="primary" html-type="submit">保存</a-button>
        </div>
      </a-form>
    </div>
  </div>
</template>
    <script>
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}
export default {
  data() {
    return {
      p: "./img/",
      loading: false,
      imageUrl: "",
      form: null,
      formItemLayout: {
        labelCol: {
          span: 4
        },
        wrapperCol: {
          span: 20
        }
      },
      formData: {}
    };
  },
  created() {
    this.form = this.$form.createForm(this);
  },
  methods: {
    handleSubmit(e) {
      //提交表单
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          //成功
          console.log("Received values of form: ", values);
        } else {
          console.log(err);
        }
      });
    },
    resetForm() {
      //重置表单
      this.form.resetFields();
    },
    handleSelectChange(value) {
      console.log(value);
      this.form.setFieldsValue({
        note: `Hi, ${value === "male" ? "man" : "lady"}!`
      });
    },
    handleChange(info) {
      if (info.file.status === "uploading") {
        this.loading = true;
        return;
      }
      if (info.file.status === "done") {
        getBase64(info.file.originFileObj, imageUrl => {
          this.imageUrl = imageUrl;
          this.loading = false;
        });
      }
    },
    imgDel(e) {
      console.log(e);
    }
  }
};
</script>
<style>
* {
  padding: 0;
  margin: 0;
}

.imgWh {
  width: 100%;
  height: 100%;
}

.boxWH {
  display: block;
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
}

.boxWH .ant-upload {
  display: block;
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
}

.mainBody,
.mainBox,
.headerBox {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  width: 100%;
  background-color: white;
  position: relative;
}

.mainBody {
  padding: 10px;
  min-height: 100%;
}

.mainBox {
  border: 1px solid #e8e8e8;
  border-radius: 5px;
}

.headerBox {
}

.rowWh {
  width: 100%;
  position: relative;
  background-color: white;
}

.titleLine,
.titleRow,
.formRow {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  width: 100%;
  position: relative;
}

.titleLine {
  background-color: white;
  padding: 20px;
}

.titleRow {
  height: 40px;
  line-height: 40px;
  font-size: 16px;
  color: #333333;
  background-color: #f8f8f8;
  padding-left: 42px;
}

.titleRow > i {
  display: block;
  position: absolute;
  width: 2px;
  height: 18px;
  top: 50%;
  transform: translateY(-50%);
  left: 30px;
  background-color: #2d8cf0;
}

.rowFoot {
  width: 100%;
  height: 60px;
  line-height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.rowFoot > button {
  margin-left: 10px;
  margin-right: 10px;
}

.formRow {
  padding-left: 140px;
  padding-bottom: 20px;
}

.inputWidA {
  width: 360px;
}

.inputWidB {
  width: 676px;
}

.updataInfo {
  font-size: 12px;
  color: #999999;
}

.formBox {
  display: flex;
  flex-wrap: wrap;
}

.updataBoxA,
.updataBoxB {
  margin-right: 10px;
  position: relative;
  overflow: hidden;
}

.updataBoxA {
  width: 230px;
  height: 108px;
}

.updataBoxB {
  margin-bottom: 10px;
  width: 116px;
  height: 116px;
}

.updataDelIcon {
  cursor: pointer;
  display: block;
  width: 50px;
  position: absolute;
  right: 0;
  top: 0;
  z-index: 3;
}
</style>
