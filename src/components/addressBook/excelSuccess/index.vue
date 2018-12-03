<template>
    <div class="address-book">
      <my-headers></my-headers>
      <div class="import-export">
            <my-addressHeader title="批量导入导出"></my-addressHeader>
            <el-tabs v-model="activeName2" type="card" @tab-click="handleClick" class="tabs">
                <el-tab-pane label="导入学生通讯录" name="importStudent">
                    <section>
                        <div class="left">
                            <ul>
                                <li>1</li>
                                <li></li>
                                <li></li>
                                <li></li>
                                <li>2</li>
                            </ul>
                        </div>
                        <div class="right">
                            <h1>下载学生/教职工通讯录模版，批量填写员工信息</h1>
                            <div class="file-down">
                                <span>学生通讯录模版</span>
                                <a href="">下载</a>
                            </div>
                            <div class="file-content">
                                <i :class="active==true?'active':''"></i>
                                <span>{{uploadTips}}</span>
                                <el-upload
                                  class="upload-demo"
                                  ref="upload"
                                  action="https://up-z2.qiniup.com"
                                  accept=".csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                                  :on-success='uploadSuccess'
                                  :data="qiniuToken"
                                  :auto-upload="true"
                                  :show-file-list="false"
                                  :multiple='false'
                                  :limit='1'
                                  :clearFiles='clearFiles'>
                                    <div class="file-export">{{imageUrl}}</div>
                                </el-upload>
                            </div>
                            <div class="file-footer">
                                将文件通讯录成员到入至:
                                <span>
                                    <i></i>
                                    奇点美术教育
                                </span>
                            </div>
                             <el-button class="file-import" size="small">导入</el-button>
                        </div>

                    </section>
                </el-tab-pane>
                <el-tab-pane label="导入老师通讯录" name="importTeacher">
                    <section>
                        <div class="left">
                            <ul>
                                <li>1</li>
                                <li></li>
                                <li></li>
                                <li></li>
                                <li>2</li>
                            </ul>
                        </div>
                        <div class="right">
                            <h1>下载学生/教职工通讯录模版，批量填写员工信息</h1>
                            <div class="file-down">
                                <span>老师通讯录模版</span>
                                <a href="">下载</a>
                            </div>
                            <div class="file-content">
                                <i :class="active==true?'active':''"></i>
                                <span>{{uploadTips}}</span>
                                <el-upload
                                  class="upload-demo"
                                  ref="upload"
                                  action="https://up-z2.qiniup.com"
                                  accept=".csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                                  :on-success='uploadSuccess'
                                  :data="qiniuToken"
                                  :auto-upload="true"
                                  :show-file-list="false"
                                  :multiple='false'
                                  :limit='1'
                                  :clearFiles='clearFiles'>
                                    <div class="file-export">{{imageUrl}}</div>
                                </el-upload>
                            </div>
                            <div class="file-footer">
                                将文件通讯录成员到入至:
                                <span>
                                    <i></i>
                                    奇点美术教育
                                </span>
                            </div>
                             <el-button class="file-import" size="small">导入</el-button>
                        </div>
                    </section>
                </el-tab-pane>
                <el-tab-pane label="导出通讯录" name="exportAddress">
                    <section>
                        <div class="left">
                            <ul>
                                <li>1</li>
                                <li></li>
                                <li></li>
                                <li></li>
                                <li>2</li>
                            </ul>
                        </div>
                        <div class="right">
                            <h1>导出学校成员信息，可进行批量修改完成在导入</h1>
                            <div style="display:flex">
                                <div class="file-down">
                                    <span>学生通讯录信息</span>
                                    <a href="javascript:void(0)" @click="exportExcel('student')">导出</a>
                                </div>
                                <div class="file-down">
                                    <span>教职工通讯录信息</span>
                                    <a href="javascript:void(0)" @click="exportExcel('teacher')">导出</a>
                                </div>
                            </div>
                            <div class="file-content">
                                <i :class="active==true?'active':''"></i>
                                <span>{{uploadTips}}</span>
                                <el-upload
                                  class="upload-demo"
                                  ref="upload"
                                  action="https://up-z2.qiniup.com"
                                  accept=".csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                                  :on-success='uploadSuccess'
                                  :data="qiniuToken"
                                  :auto-upload="true"
                                  :show-file-list="false"
                                  :multiple='false'
                                  :limit='1'
                                  :clearFiles='clearFiles'>
                                    <div class="file-export">{{imageUrl}}</div>
                                </el-upload>
                            </div>
                            <div class="file-footer">
                                将文件通讯录成员到入至:
                                <span>
                                    <i></i>
                                    奇点美术教育
                                </span>
                            </div>
                             <el-button class="file-import" size="small">导入</el-button>
                        </div>
                    </section>
                </el-tab-pane>
            </el-tabs>
      </div>

    </div>
</template>
<script>
 import postAxios from '@/utils/http';
import Qs from 'qs'
  export default {
    data() {
      return {
            imageUrl:"上传文件",
            uploadTips:"请将填写好的学校成员通讯录信息上传",
            active:'',
            activeName2: 'importStudent',
            domain:'',
            url_excelUpload:"",
            qiniuToken: {
                token: ''
            },
      }
    },
    mounted(){
        eventBus.$emit("header", { index: 0, headerActive: "active", });
        postAxios({url:'/singcampus/getUploadToken'})
        .then((res) => {
            this.qiniuToken.token = res.token
            this.domain = res.bucketUrl;

        })
    },
    methods: {
        clearFiles(){
           this.$refs.upload.clearFiles()
        },
        uploadSuccess(res,file){
            this.uploadTips = file.name;
            this.active = true;
            console.log(this.active)
            this.imageUrl = '重新上传';
            this.url_excelUpload = this.domain+'/'+res.key;
        },
        upload(){
             postAxios({url:'/singcampus/importContactList',data:{
                schoolID:this.$router.query.uid,
                url_excelUpload:this.url_excelUpload
             }})
            .then((res) => {
                // this.qiniuToken.token = res.token
                // this.domain = res.bucketUrl;
            })
        },
        exportExcel(down){
            let url='';
            down=='student'?url='/singcampus/exportAllStudents':url='/singcampus/exportAllTeachers';
            postAxios({url:url,data:{
                schoolID:this.$router.query.uid,
                url_excelUpload:this.url_excelUpload
             }})
            .then((res) => {
                // this.qiniuToken.token = res.token
                // this.domain = res.bucketUrl;
            })
        },
        handleClick(tab, event) {
            console.log(tab, event);
        }
    }
  }
</script>
