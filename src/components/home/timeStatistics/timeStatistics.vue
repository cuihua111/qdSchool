<template>
    <div class="time-statistics">
        <my-addressHeader title="考勤"></my-addressHeader>
        <el-tabs v-model="activeName2" type="card" @tab-click="handleClick" class="tabs">
            <el-tab-pane label="考勤管理" name="time-manager">
                <el-table
                  :data="tableData"
                  style="width: 100%">
                    <el-table-column
                        prop="name"
                        label="考勤名称"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="manager"
                        label="负责人"
                        width="150">
                    </el-table-column>
                    <el-table-column
                        prop="join"
                        label="参与人数"
                        width="150">
                    </el-table-column>
                    <el-table-column
                        prop="timeDate"
                        label="打卡日期"
                        width="280">
                    </el-table-column>
                    <el-table-column
                        prop="time"
                        label="打卡时间"
                         width="250">
                        <template slot-scope="scope">
                            <ul>
                                <li>上午:08:30 - 11:30</li>
                                <li>上午:08:30 - 11:30</li>
                                <li>上午:08:30 - 11:30</li>
                            </ul>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="操作">
                        <template slot-scope="scope">
                            <el-button @click="handleClick(scope.row)" type="text" size="small" class="set">编辑</el-button>
                            <el-button type="text" size="small" class="del">删除</el-button>
                          </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="每日统计" name="day">
                <div class="tab-header">
                    <span>时间：</span>
                    <el-date-picker
                      class="header-select1"
                      v-model="date"
                      type="date"
                      placeholder="选择日期">
                    </el-date-picker>
                    <el-select v-model="value" placeholder="请选择" class="header-select2">
                        <el-option
                          v-for="item in options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                    </el-select>
                    <span>班级/部门：</span>
                    <el-select v-model="value" placeholder="请选择" class="header-select3">
                        <el-option
                          v-for="item in options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                    </el-select>
                     <span>考勤组：</span>
                    <el-select v-model="value" placeholder="请选择"
                    class="header-select4">
                        <el-option
                          v-for="item in options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <el-table
                    :data="tableData2"
                    :span-method="objectSpanMethod"
                    sum-text
                    border
                    style="width: 100%">
                    <el-table-column
                      prop="name"
                      label="姓名"
                      width="90">
                    </el-table-column>
                    <el-table-column
                      prop="department"
                      label="班级-部门"
                      width="140">
                    </el-table-column>
                    <el-table-column
                      prop="time"
                      label="考勤组"
                      width="180">
                    </el-table-column>
                    <el-table-column
                      prop="record"
                      label="打卡时间"
                      width="180">
                    </el-table-column>
                    <el-table-column
                      prop="morning"
                      label="上午"
                      width="180">
                      <template slot-scope="scope">
                            <span>迟到</span>
                            <span>迟到</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                      prop="afternoon"
                      label="下午"
                      width="180">
                      <template slot-scope="scope">
                            <span>迟到</span>
                            <span>迟到</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                      prop="night"
                      label="晚上"
                      width="180">
                        <template slot-scope="scope">
                            <span>迟到</span>
                            <span>迟到</span>
                        </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="每月统计" name="month">角色管理</el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
 import postAxios from '@/utils/http';
import Qs from 'qs'
  export default {
    data() {
      return {
            activeName2: 'day',
            tableData: [{
                name:'学生上课打卡',
                manager:'张三',
                join: '300人',
                timeDate:'周一，二，三，四，五，六',
                time: '王小虎',
              }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1517 弄'
              }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄'
              }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
            }],
            date:'',
            options:[
                {
                    value:1,
                    label:'全天',
                },{
                    value:1,
                    label:'半天'
                }
            ],
            tableData2:[{
                name:'姓名1',
                department:'重点班1',
                time:'考勤组1',
                record:'asd',
                morning:'asd',
                afternoon:'sadb',
                night:'rqw'
            },{
                name:'姓名2',
                department:'重点班2',
                time:'考勤组2',
                record:'asd',
                morning:'asd',
                afternoon:'sadb',
                night:'rqw'
            }]
      }
    },
    mounted(){
         // postAxios({url:'/singcampus/getUploadToken'})
         //    .then((res) => {
         //        this.bucketUrl =    res.bucketUrl;
         //        this.upload_token  = res.token
         //    })
    },
    methods: {
        objectSpanMethod({ row, column, rowIndex, columnIndex }) {
            if (columnIndex === 0 || columnIndex === 1 || columnIndex === 2) {
              if (rowIndex % 2 === 0) {
                return {
                  rowspan: 2,
                  colspan: 1
                };
              } else {
                return {
                  rowspan: 0,
                  colspan: 0
                };
              }
            }
        },
        handleClick(tab, event) {
            console.log(tab, event);
        }
    }
  }
</script>
