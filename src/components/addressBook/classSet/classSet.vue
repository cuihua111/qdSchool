<template>
  <div class="add-box">
    <my-addressHeader title="班级设置"></my-addressHeader>
    <div class="people-info">班级信息</div>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="box-form" >
        <el-form-item label="班级名称:" prop="className">
            <el-input v-model="ruleForm.schoolName_input" placeholder="请输入班级名称"></el-input>
        </el-form-item>
         <el-form-item label="上级组织:" prop="class">
            <el-input v-model="ruleForm.class.title" @click.native="addClass = true" placeholder="请选择上级组织"></el-input>
        </el-form-item>
         <el-form-item label="设置班主任:">
            <el-input v-model="ruleForm.name" @click.native="addPeople = true" placeholder="请选择班主任"></el-input>
        </el-form-item>
    </el-form>
    <div class="people-footer">
        <el-button type="danger" @click="submitForm('ruleForm')">删除</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
    </div>
    <!--添加成员dialog  start-->
    <el-dialog
          title="选择成员"
          :visible.sync="addPeople"
          width="920px"
          :show-close='false'
          center>
            <div class="addPeople-dialog">
                <div class="add-body">
                    <ul>
                        <span>选择:</span>
                        <li v-for="(item,index) in people"
                            :key="index"
                            :class="{active:active === index}"
                            @click="sell(index,item.uid)">
                            <label>{{item.nickname}}</label>
                            {{item.nickname}}
                        </li>
                    </ul>
                    <ul class="remove">
                        <span>已选:</span>
                        <li v-show="active!==''">
                            <label>{{active===''?'':people[active].nickname}}</label>{{active===''?'':people[active].nickname}}
                            <img src="/static/images/addressBookClose.png" alt="" @click="active=''">
                        </li>
                    </ul>
                </div>
                <div class="add-footer">
                     <el-button type="primary" @click="submitName">确定</el-button>
                </div>
            </div>
    </el-dialog>
    <!--添加成员dialog  end-->
    <!--选择班级dialog  start-->
    <el-dialog
          title="选择班级"
          :visible.sync="addClass"
          width="920px"
          :show-close='false'
          center>
            <div class="addPeople-dialog add-class-dialog">
                <div class="add-body add-body2">
                    <ul>
                        <span>选择:</span>
                        <el-tree :data="classData" :props="defaultProps"  class="manager-tree" ref="tree"  node-key="id" check-on-click-node="true" @node-click='getCheckedNodes'></el-tree>
                    </ul>
                    <ul class="remove">
                        <span>已选:</span>
                        <div class="el-tree-node__content" style="padding-left: 0px;"v-show="classSum!=''">
                            <span class="el-tree-node__expand-icon el-icon-caret-right is-leaf"></span><span class="el-tree-node__label">{{classSum==''?'':classSum.title}}</span>
                             <img src="/static/images/addressBookClose.png" alt="" @click="delClass" class="class-del">
                        </div>
                    </ul>
                </div>
                <div class="add-footer">
                     <el-button type="primary" @click="submitClass">确定</el-button>
                </div>
            </div>
    </el-dialog>
    <!--添加成员dialog  end-->
  </div>
</template>
<script>
  import postAxios from '@/utils/http';
  export default {
    data() {
      return {
        ruleForm: {
          name: '',
          class: '',
          time_joinschool: '',
          schoolName_input: '',
          desc_remarks:'',
        },
        rules: {
          className: [
            { required: true, message: '请输入班级名称', trigger: 'change' }
          ],
          class: [
            { required: true, message: '请选择上级组织', trigger: 'change' }
          ],
        },
        addPeople:false,
        addClass:false,
        active:'',
        active2:'',
        people:[],
        classSum:[],
        classData:[],
        defaultProps: {
          children: 'list_subclass',
          label: 'title'
        },
      }
    },
    created(){
        // 成员
        postAxios({url:'/singcampus/getAllMembersInClass',data:{
            classId:27,
            pageSize:1000,
            pageNo:1
        }})
        .then((res) => {
            this.people = res.records
        })
        // 班级
        postAxios({url:'/singcampus/getAllOrganizationForSchool',data:{
            schoolId:1,
        }})
        .then((res) => {
            this.classData = res.list_class;
        })
    },
    methods: {
         sell(index, item,is2) {
            this.active = index;
            is2?this.active2 = index:this.active = index;
        },
        getCheckedNodes(data,node,me) {
            this.classSum  = data;
        },
        delClass(){
            this.classSum='';
            document.querySelector(".add-class-dialog  .is-current").classList.remove("is-current")
        },
        submitName(){
            if(this.active !== '') {
                this.ruleForm.name = this.people[this.active].nickname;
            }else{
                this.ruleForm.name = '';
            }
            this.addPeople = false;

        },
        submitClass(){
            if(this.classSum !== '') {
                this.ruleForm.class = this.classSum;
            }else{
                this.ruleForm.class = {};
            }
            this.addClass = false;

        },
        submitForm(formName) {
            let that = this;
            let formData = this.ruleForm;
            formData.classID = this.ruleForm.class.id
            this.$refs[formName].validate((valid) => {
              if (valid) {
                postAxios({url:'/singcampus/createClass',data:formData})
                .then((res) => {
                    setTimeout(()=>{
                        this.$message({
                          message: '添加成功',
                          type: 'success'
                        });
                         window.history.go(-1);
                    }, 1500)
                })
              } else {
                console.log('error submit!!');
                return false;
              }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        }
    }
  }
</script>

