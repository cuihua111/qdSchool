<template>
    <div class="department-box">
        <h1>{{title}} {{sumPeople}}人</h1>
        <div class="go-seting">
            <router-link :to="{name:'ClassSet'}">设置</router-link>
            <router-link :to="{name:'ClassAdd'}">创建部门</router-link>
        </div>
        <div class="button-seting">
            <el-button size="mini">添加成员</el-button>
            <el-button size="mini">批量导入/导出</el-button>
            <el-button size="mini" type="danger" plain style="background:white">批量删除</el-button>
        </div>
        <el-table
                ref="multipleTable"
                :data="tableData3"
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="handleSelectionChange">
            <el-table-column
                type="selection"
                width="40">
            </el-table-column>
            <el-table-column
                prop="name"
                label="姓名"
                width="100">
            </el-table-column>
            <el-table-column
                label="班级"
                prop="name"
                width="130">
            </el-table-column>
            <el-table-column
                label="电话"
                prop="date"
                width="130">
            </el-table-column>
            <el-table-column
                prop="address"
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
        tableData3: [{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-08',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-06',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }],
      }
    },
    created(){


    },
    methods: {

    }
  }
</script>

