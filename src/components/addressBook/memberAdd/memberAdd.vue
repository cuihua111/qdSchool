<template>
  <div class="register1">
   <el-form
        :model="numberValidateForm"
        :rules="rules"
        ref="numberValidateForm"
        label-width="100px"
        class="demo-ruleForm">
        <el-form-item
            label="手机号码"
            prop="mobile">
        <el-input type="mobile" v-model.number="numberValidateForm.mobile" autocomplete="off" placeholder="请输入手机号码"></el-input>
        </el-form-item>
          <el-form-item
            label="短信验证码"
            prop="code">
          <el-input type="code" v-model.number="numberValidateForm.code" autocomplete="off" placeholder="请输入验证码"></el-input>
          <el-button type="primary" :disabled="isyzm" @click="yzm">{{yzmMsg}}</el-button>
        </el-form-item>
        <el-checkbox v-model="checked" class="register-agreement">同意<a href="www.baidu.com">协议</a></el-checkbox>
        <el-form-item>
            <el-button type="primary" @click="submitForm('numberValidateForm')">下一步</el-button>
        </el-form-item>
    </el-form>
</div>
</template>
<script>
  import postAxios from '@/utils/http';
  export default {
    data() {
      return {
        numberValidateForm: {
          mobile: '',
          code:''
        },
        checked: false,
        isyzm:false,
        yzmMsg:'发送验证码',
        count: '',
        timer: null,
        rules:{
            mobile:[
              { required: true, message: '手机号码不能为空'},
              { type: 'number', message: '手机号码必须为数字'}
            ],
            code:[
              { required: true, message: '验证码不能为空'},
              { type: 'number', message: '验证码必须为数字'}
            ]
        }
      }
    },
    created(){
        console.log(1)
        this.$store.state.register.setStyle = 'z-index: 1;right:0%';
        this.$store.state.register.setClass = 'steps-gray';
    },
    methods: {
        getCode(){
             const TIME_COUNT = 60;
             if (!this.timer) {
               this.count = TIME_COUNT;
               this.timer = setInterval(() => {
               if (this.count > 0 && this.count <= TIME_COUNT) {
                 this.count--;
                 this.yzmMsg = '重新发送('+this.count+'s)';
                } else {
                 this.isyzm = false;
                 this.yzmMsg = '重新发送';
                 clearInterval(this.timer);
                 this.timer = null;
                }
               }, 1000)
        }},
        yzm(){
            this.$refs.numberValidateForm.validateField('mobile',(msg)=>{
                 if (msg=='') {
                    // this.yzmMsg = '发送中';
                    this.isyzm = true;
                    postAxios({url:'/singcampus/regSms',data:{phonenum:this.numberValidateForm.mobile}})
                    .then((res) => {
                        this.getCode();
                    })
                    .catch((error)=>{
                         this.getCode();
                    })
                  } else {
                    console.log('error submit!!');
                    return false;
                  }
            });
        },
        submitForm(formName) {
            if(this.checked == false){
              this.$message.error('请先同意协议');
                return false;
            }
            this.$refs[formName].validate((valid) => {
              if (valid) {
                postAxios({url:'/singcampus/regSms',data:{phonenum:this.numberValidateForm.mobile}})
                .then((res) => {
                    this.$route.push({name:'register2'})
                })
              } else {
                console.log('error submit!!');
                return false;
              }
            });
        },
    }
  }
</script>

