<template>
    <div class="department-box">
        <h1>{{listensTitle}} {{tableData3.total}}人</h1>
        <div class="go-seting">
            <router-link :to="{name:'ClassSet'}">设置</router-link>
            <router-link :to="{name:'ClassAdd'}">创建班级</router-link>
        </div>
        <div class="button-seting">
            <router-link :to="{name:'PeopleAdd'}">
                <el-button size="mini">添加成员</el-button>
            </router-link>
            <router-link :to="{name:'ImportAndExport',query:{uid:$store.state.addressBook.uid}}">
                <el-button size="mini">批量导入/导出</el-button>
            </router-link>
            <el-button size="mini" type="danger" plain style="background:white" @click="del">批量删除</el-button>
        </div>
        <el-table
                ref="multipleTable"
                :data="tableData3.records"
                tooltip-effect="dark"
                :filtered-value="tableSelectValue"
                @selection-change="tableChange"
                @row-click="toPeopleSet"
                style="width: 100%">
            <el-table-column
                type="selection"
                width="40">
            </el-table-column>
            <el-table-column
                prop="nickname"
                label="姓名"
                width="120">
            </el-table-column>
            <el-table-column
                label="班级"
                prop="title"
                width="140">
            </el-table-column>
            <el-table-column
                label="电话"
                prop="PhoneNum"
                width="150">
            </el-table-column>
            <el-table-column
                prop="title"
                label="身份"
                show-overflow-tooltip>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
  import postAxios from '@/utils/http';
  export default {
    data() {
      return {
        tableData3:[],
        title:this.$store.state.addressBook.title,
        sumPeople:this.$store.state.addressBook.sumPeople,
        tableSelectValue:[],
        uid:[],
        classId:this.$store.state.addressBook.uid,
      }
    },
    created(){
        // 获取班级成员列表
        // postAxios({url:'/singcampus/getAllMembersInClass',data:{
        //     classId:27,
        //     pageSize:15,
        //     pageNo:1
        // }})
        // .then((res) => {
        //     this.tableData3 = res.records
        // })
        this.getClass(this.classId);
    },
    methods: {
        del(){
            // uid integer
            // 必须
            // 用户id
            // ClassID integer
            // 必须
            // 学生关联的班级群id
            // id
            this.$confirm('是否删除选中的成员, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            })
            .then(() => {
                postAxios({url:'/singcampus/batchDelMemFromClass',data:{
                    classId:27,
                    uid:this.uid,
                    id:1
                }})
                .then((res) => {
                    for(let j=0;j<this.uid.length;j++){
                        this.tableData3[j].uid ==this.uid[j]
                        this.tableData3.splice(j,1)
                    };
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                })
            })

        },
        tableChange(selection){
            if(selection!=''){
                for(let i =0;i<selection.length;i++){
                    this.uid.push(selection[i].uid)
                }
            }else{
                this.uid = [];
            }
        },
        toPeopleSet(row, event, column){
            this.$router.push({name:'PeopleSet',query:{uid:row.uid}})
        },
        getClass(currid,oladId){
            postAxios({url:'/singcampus/getAllMembersInClass',data:{
                classId:currid,
                pageSize:15,
                pageNo:1
            }})
            .then((res) => {
                this.tableData3 = res
            })
        }
    },
      computed: {
      listensClass() {
        return this.$store.state.addressBook.uid;
      },
      listensTitle(){
        return this.$store.state.addressBook.title;
      }
    },
    watch:{
        listensClass:'getClass'
    }
  }
</script>

