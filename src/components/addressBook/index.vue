<template>
  <div class="address-book">
    <my-headers></my-headers>
    <div class="address-book-manager">
        <div class="manager-left">
            <div class="left-top">
                <img src="/static/images/organizationName.png" alt="">
                <span>教育</span>
            </div>
            <el-tabs v-model="activeName"  class="manager-tabs" @tab-click="tabClick">
                <el-tab-pane label="班级管理" name="AddressBook">
                    <el-tree :data="classData" :props="defaultProps" @node-click="classClick" class="manager-tree"></el-tree>
                </el-tab-pane>
                <el-tab-pane label="部门管理" name="Department">
                    啊是大V
                </el-tab-pane>
            </el-tabs>
        </div>
        <div class="manager-right">
            <keep-alive>
                <router-view v-if="$route.meta.keepAlive"></router-view>
            </keep-alive>
            <router-view v-if="!$route.meta.keepAlive"></router-view>
        </div>
  </div>

</div>
</template>
<script>
    import postAxios from '@/utils/http';
    export default {
        data() {
            return {
                activeName: 'AddressBook',
                classData:[],
                defaultProps: {
                  children: 'list_subclass',
                  label: 'title'
                }
            }
        },
        mounted(){
            eventBus.$emit("header", { index: 0, headerActive: "active" });
             // 获取班级成员列表
            postAxios({url:'/singcampus/getAllOrganizationForSchool',data:{
                schoolID:1,
            }})
            .then((res) => {
                this.classData = res.list_class;
                this.department = res.list_department;
                this.$router.push({name:'Classa'})
            })
        },
        methods: {
            tabClick(tab, event){
                if(tab.name == 'AddressBook'){
                    // window.location.reload();
                    this.$router.push({name:tab.name})
                }else{
                    this.$router.push({name:tab.name})
                }
                this.$store.state.addressBook.title = '教育-'+tab.label;
            },
            classClick(data) {
                this.$store.state.addressBook.uid = data.id;
                this.$store.state.addressBook.title = data.title;
                console.log(data)
                // if(data === 1){
                    this.$router.push({name:'Classa'})
                // }else{
                //     this.$router.push({name:Department})
                // }
            }
        }
  }
</script>
<style>
    #app{
        background: #f5f5f5;
    }
</style>

