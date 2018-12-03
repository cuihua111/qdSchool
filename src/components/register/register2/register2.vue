<template>
  <div class="register1 register2">
   <el-form
        :model="numberValidateForm"
        :rules="rules"
        ref="numberValidateForm"
        label-width="100px"
        class="demo-ruleForm">
        <el-form-item
            label="学校全称"
            prop="name">
        <el-input type="text" v-model.number="numberValidateForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="办学规模">
            <el-input v-model="numberValidateForm.sizeValue" placeholder="请选择活动区域" @click.native="scale = true">
            </el-input>
        </el-form-item>
        <el-form-item label="所在地区"  prop="address">
            <el-cascader
                :options="options2"
                v-model="numberValidateForm.address"
                @change="handleChange">
            </el-cascader>
        </el-form-item>
        <el-form-item label="详细地址">
            <el-input v-model="numberValidateForm.addressInfo"  placeholder="请输入详细地址">
            </el-input>
        </el-form-item>
        <el-form-item label="我的职务">
             <el-input v-model="numberValidateForm.jobValue" placeholder="请选择我的职务" @click.native="myJob = true">
            </el-input>
        </el-form-item>
        <el-form-item
            label="添加管理员"
            prop="admin"
            v-show="numberValidateForm.job != 1" class="add-admin-required">
            <div class="add-admin" v-for="(item,index) in numberValidateForm.admin" v-show="numberValidateForm.admin != ''" :key="index">
                <img src="/static/images/delAdmin.png" alt="" @click="delAddmin">
                <img src="/static/images/adminBg.png" alt="">
                <label>{{item.name}}</label>
            </div>
            <el-input v-model="numberValidateForm.admin.id" type="hidden" style="width:0">
            </el-input>
            <img src="/static/images/addAdmin.png" alt="" @click="addAdmin2" class="add-admin2">
        </el-form-item>
        <el-form-item
            label="企业认证"
            >
            <el-checkbox v-model="checked">马上认证</el-checkbox>
        </el-form-item>
        <div class="enterprise-audit-box" v-show="checked == true">
            <h4>工商营业执照</h4>
            <el-upload
              class="avatar-uploader"
              action="https://up-z2.qiniup.com"
              accept="image/gif,image/jpeg,image/jpg,image/png,image/svg"
              :data="qiniuToken"
              :show-file-list="false"
              :on-success="handleAvatarSuccess">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <h4>统一信用代码</h4>
            <el-input type="text" v-model="numberValidateForm.code" placeholder="请输入18位统一信用代码"></el-input>
            <h4>法定代表人</h4>
            <el-input type="text" v-model="numberValidateForm.people" placeholder="请输入真实姓名"></el-input>
        </div>
        <el-form-item>
            <el-button type="primary" @click="submitForm('numberValidateForm')">注册</el-button>
        </el-form-item>
    </el-form>
    <!--办学规模dialog  start-->
      <el-dialog
          title="请选择办学规模"
          :visible.sync="scale"
          width="516px"
          center>
          <div class="scale-dialog">
            <ul>
                <li
                    v-for="(item,index) in addAdminData"
                    :key="index"
                    :class="{active:active == index}"
                    @click="sell(index,item.id)">{{item.value}}</li>
            </ul>
            <div>
                <el-button type="primary" @click="sizeSubmit">确定</el-button>
                <el-button type="primary" class="cancel" @click="scale = false">取消</el-button>
            </div>
          </div>
       </el-dialog>
      <!--办学规模dialog  end-->
      <!--添加管理员dialog  start-->
      <el-dialog
          title="添加管理员"
          :visible.sync="addAdmin"
          width="516px"
          :show-close='false'
          center>
          <el-form
            :rules="rulesAdmin"
            :model="numberValidateForm.admin"
            ref="numberValidateForm.admin">
                <div class="addAdmin-dialog">
                    <div>姓名</div>
                    <el-form-item prop="name">
                        <el-input type="text" v-model="numberValidateForm.admin.name" placeholder="请输入姓名(必填)"></el-input>
                    </el-form-item>
                    <div>手机号</div>
                    <el-form-item prop="mobile">
                    <el-input type="text" v-model="numberValidateForm.admin.mobile"  placeholder="请输入手机号(必填)"></el-input>
                    </el-form-item>
                <div class="admin-footer">
                    <el-button type="primary" @click="adminSubmit('numberValidateForm.admin')">确定</el-button>
                    <el-button type="primary" class="cancel" @click="addAdmin = false">取消</el-button>
                </div>
              </div>
          </el-form>
       </el-dialog>
      <!--添加管理员dialog  end-->
      <!--我的职责dialog  start-->
      <el-dialog
          title="我的职务"
          :visible.sync="myJob"
          width="426px"
          center>
          <div class="myJob-dialog">
            <ul>
                <li
                    v-for="(item,index) in myJobData"
                    :key="index"
                    :class="{active:active2 == index}"
                    @click="sell(index,item,'is2')">{{item.value}}</li>
            </ul>
            <div class="admin-footer">
                <el-button type="primary" @click="jobSubmit">确定</el-button>
                <el-button type="primary" class="cancel" @click="myJob = false">取消</el-button>
            </div>
          </div>
       </el-dialog>
      <!--我的职责dialog  end-->
</div>
</template>
<script>
  import postAxios from '@/utils/http';
  import {province} from '@/utils/province';
  export default {
    data() {
        var adminVd = (rule, value, callback) => {
            if (value =='') {
              return callback(new Error('请添加管理员'));
            }
             callback();
        }
    return {
        numberValidateForm: {
            name:'',
            size:0,
            sizeValue:'1-50',
            address:'',
            provinceId :'',
            provinceName :'',
            cityId :'',
            cityName:'',
            addressInfo:'',
            job:'',
            jobValue:"",
            admin:[{
                    id:0,name:'校长'
                }],
            imgUrl:'',
            code:'',
            people:'',
        },
        options2: this.addressData(),
        active:0,
        active2:0,
        scale:false,
        addAdmin:false,
        myJob:false,
        checked:false,
        addAdminData:[
                {
                    id:0,value:'1-50'
                },{
                    id:1,value:'51-100'
                },{
                    id:2,value:'101-200'
                },{
                    id:3,value:'201-500'
                },{
                    id:4,value:'501-1000'
                },{
                    id:5,value:'1001-2000'
                },{
                    id:6,value:'2000以上'
                }
        ],
        myJobData:[
                {
                    id:0,value:'校长'
                },{
                    id:1,value:'管理员'
                },{
                    id:2,value:'教学老师'
                }
        ],
        imageUrl: '',
        domain:'',
        qiniuToken: {
            token: ''
        },
        rules:{
            name:[
              { required: true, message: '学校全称不能为空'},
            ],
            address:[
              { required: true, message: '请选择所在地区', trigger: 'change' }
            ],
            admin:[
              { validator:adminVd, trigger: 'blur'}
            ],
        },
        rulesAdmin:{
            mobile:[
              { required: true, message: '手机号码不能为空'}
            ],
            name:[
              { required: true, message: '姓名不能为空'}
            ]
        }
      }
    },
    created(){
        this.$store.state.register.setStyle = 'z-index: 1;right:-100%;';
        this.$store.state.register.setClass = '';
        this.$store.state.register.setClass2 = 'steps-gray';
        postAxios({url:'/singcampus/getUploadToken'})
        .then((res) => {
            this.qiniuToken.token = res.token
            this.domain = res.bucketUrl;

        })
    },
    methods: {
        addressData(){
          let   shopListData = province;
            var level1 = [],
                level2 = [];
          // 拆解总数据并进行分类
              for(let i = 0;i<shopListData.length;i++){
                  if(shopListData[i].fatherID == undefined){
                      level1.push({value:shopListData[i].provinceID,fatherID:shopListData[i].fatherID,label:shopListData[i].province,children:[]})
                  }else{
                      level2.push({value:shopListData[i].provinceID,fatherID:shopListData[i].fatherID,label:shopListData[i].province})
                  }
              }
          // 循环一级得到二级数据然后进行组装
              for(let j = 0;j<level1.length;j++){
              if(level2[j] != undefined) {
                      for(let j2 = 0;j2<level2.length;j2++){
                          if(level2[j2].fatherID == level1[j].value){
                              level1[j].children.push(level2[j2])
                          }}
                      }
              }
              console.log(level1)
              return level1;
        },
        handleAvatarSuccess(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw);
            this.numberValidateForm.imgUrl = this.domain+'/'+res.key;
            console.log(this.numberValidateForm.imgUrl)
        },
         sell(index, item,is2) {
            is2?this.active2 = index:this.active = index;
        },
        sizeSubmit(){
            this.numberValidateForm.size = this.addAdminData[this.active].id;
            this.numberValidateForm.sizeValue = this.addAdminData[this.active].value
            this.scale = false;
        },
        jobSubmit(){
            this.numberValidateForm.job = this.myJobData[this.active2].id;
            this.numberValidateForm.jobValue = this.myJobData[this.active2].value;
            if(this.myJobData[this.active2].id == 1){
                this.numberValidateForm.admin =[{
                    id:this.myJobData[this.active2].id
                }]
            }
            this.myJob = false;
        },
        delAddmin(){
            this.numberValidateForm.admin = [];
        },
        addAdmin2(){
            if(this.numberValidateForm.admin != ''){
                 this.$message.error('只能添加一位管理员');
                 return false;
            }
            this.addAdmin = true;
        },
        adminSubmit(formName){
            this.$refs[formName].validate((valid) => {
              if (valid) {
                postAxios({url:'/singcampus/regSms',data:{phonenum:this.numberValidateForm.admin.mobile,nickname:this.numberValidateForm.admin.name}})
                .then((res) => {
                    this.numberValidateForm.admin.push({id:res.id,name:this.numberValidateForm.admin.name})
                    this.addAdmin = false;
                })
              } else {
                console.log('error submit!!');
                return false;
              }
            });
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === ('image/jpeg'||'image/png');
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
              this.$message.error('上传头像图片只能是JPG和PNG格式!');
            }
            if (!isLt2M) {
              this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        },
        handleChange(value) {
            let   data = province;
            for(var i = 0; i<data.length;i++){
                if(value[0] == data[i].provinceID){
                    this.numberValidateForm.provinceName = data[i].province
                    this.numberValidateForm.provinceId = value[0]
                }
                if(value[1]== data[i].provinceID){
                    this.numberValidateForm.cityName = data[i].province;
                    this.numberValidateForm.cityId = value[1]
                }
            }
        },
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
            if(this.checked == true){

                if(this.numberValidateForm.imgUrl == ''){
                  this.$message.error('请上传营业执照');
                    return false;
                }
                if(this.numberValidateForm.code == ''){
                  this.$message.error('请输入18位统一信用代码');
                    return false;
                }
                if(this.numberValidateForm.code == ''){
                  this.$message.error('请输入真实姓名');
                    return false;
                }
                return false;
            }
            let that = this;
            // that.$router.push({name:'Register3'})
            this.$refs[formName].validate((valid) => {
              if (valid) {
                postAxios({url:'/singcampus//submitRegisterSchool',data:{
                    name:this.numberValidateForm.name,
                    scale_edu:this.numberValidateForm.size,
                    provinceId:this.numberValidateForm.provinceId,
                    provinceName:this.numberValidateForm.provinceName,
                    cityId:parseInt(this.numberValidateForm.cityId),
                    cityName:this.numberValidateForm.cityName,
                    address:this.numberValidateForm.addressInfo,
                    position:this.numberValidateForm.job,
                    uid_mainAdmin:this.numberValidateForm.admin[0].id,
                    is_authenApply_submit:this.checked==true?1:0,
                    url_license:this.numberValidateForm.imgUrl,
                    businesscode:this.numberValidateForm.code,
                    principal:this.numberValidateForm.people,
                }})
                .then((res) => {
                    that.$route.push({name:'Register3'})
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
<style>
    .register{
       min-height: 915px;
    }
</style>
