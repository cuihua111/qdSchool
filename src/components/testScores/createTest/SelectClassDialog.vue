<template>
    <!-- 班级选择弹窗组件 -->
    <el-dialog class="selectClassDialog-wrap"
        :visible.sync="visible"
        width="750px"
        height="600px"
        top="20vh"
        title="选择班级">
        <div class="main">
            <!-- 左-班级树形列表区 -->
            <div class="tree-wrap">
                <p class="title">选择：</p>
                <el-tree
                    class="tree-List"
                    :data="classTreeList"
                    show-checkbox
                    @node-click="handleClickTreeNode"
                    node-key="id"
                    :props="treeProps"
                    ref="classTreeRef"
                    check-on-click-node
                    default-expand-all
                    :expand-on-click-node="false">
                    <span class="custom-tree-node" slot-scope="{ node, data }">
                        <span>
                            <span :class="{ 'icon-file-notcheck': true, 'icon-file-checked': node.checked }"></span>
                            <span>{{ node.label }}</span>
                            <span class="isSelect" v-if="node.checked"></span>
                        </span>
                    </span>
                </el-tree>
            </div>
            <!-- 右-已选班级区 -->
            <div class="selected-wrap">
                <p class="title">已选：</p>
                <div class="selected-list">
                    <div class="item" v-for="(item, index) in selectedSmallClass" :key="index">
                        <span class="icon-file-notcheck"></span>
                        <span>{{item.title}}</span>
                        <span class="remove-item" @click="removeSelected(item)"></span>
                    </div>
                </div>
            </div>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="btnOk" class="btnOk">确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'SelectClassDialog',
  components: {},
  props: ['checked'],
  data () {
    return {
      visible: false,
      treeProps: {
        label: 'title',
        children: 'list_subclass'
      },
      selectedBigClass: [], // 已选一级班级
      selectedSmallClass: [] // 已选二级班级
    }
  },
  created () {
    this.GetClassList({ schoolID: 1 })
  },
  computed: {
    ...mapGetters('testScores', ['classTreeList'])
  },
  methods: {
    ...mapActions('testScores', ['GetClassList']),
    /**
     * 点击树节点时触发
     */
    handleClickTreeNode (data, node, self) {
      let checkedList = this.$refs.classTreeRef.getCheckedNodes()
      this.selectedSmallClass = checkedList.filter(v => !v.list_subclass || v.list_subclass.length === 0)
    },

    /**
     * 点击移除所选班级X图标时触发
     */
    removeSelected (item) {
      let index = this.selectedSmallClass.findIndex(v => v.id === item.id)
      this.selectedSmallClass.splice(index, 1)
      let checkedKeys = this.selectedSmallClass.map(v => v.id)
      this.$refs.classTreeRef.setCheckedKeys(checkedKeys)
    },

    /**
     * 打开弹窗
     */
    open () {
      this.visible = true
      if (this.checked.length < 1) return
      this.selectedSmallClass = [ ...this.checked ]
      let checkedKeys = this.checked.map(v => v.id)
      this.$refs.classTreeRef.setCheckedKeys(checkedKeys)
    },

    /**
     * 点击确认按钮
     */
    btnOk () {
      this.visible = false
      if (!this.selectedSmallClass.length === 0) return
      let selectBigClasses = this.selectedSmallClass.map(v => v.parentId).filter(v => v)
      this.$emit('select', {
        selectedBigClass: [...new Set(selectBigClasses)],
        selectedSmallClass: this.selectedSmallClass
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.selectClassDialog-wrap {
    .tree-wrap {
        width: 345px;
        box-sizing: border-box;
        border-right: 1px solid #e5e5e5;
        float: left;
        font-size: 16px;
        height: 360px;
        overflow-y: auto;
        .tree-List {
            margin-top: 20px;
        }
        .isSelect {
            display: inline-block;
            width: 18px;
            height: 14px;
            background-image: url("../../../../static/images/isSelect.png");
            margin-left: 20px;
        }
    }
    .selected-wrap {
        width: 345px;
        float: left;
        box-sizing: border-box;
        font-size: 16px;
        .title {
            padding: 0 20px;
        }
        .selected-list {
            margin-top: 15px;
            .item {
                padding: 0 0 0 20px;
                margin-bottom: 4px;
                position: relative;
                .remove-item {
                    display: inline-block;
                    width: 14px;
                    height: 14px;
                    position: absolute;
                    right: 0;
                    top: 10px;
                    background-image: url("../../../../static/images/addressBookClose.png");
                    cursor: pointer;
                }
            }
        }
    }
    .btnOk {
        width: 100px;
    }
    .title {
        margin: 0;
        padding: 0 10px;
    }
    .icon-file-notcheck {
        display: inline-block;
        width: 20px;
        height: 17px;
        background-image: url("../../../../static/images/file.png");
        background-size: cover;
        margin-right: 5px;
        vertical-align: -2px;
    }
    .icon-file-checked {
        background-image: url("../../../../static/images/file.png");
    }
}
</style>
<style lang="scss">
.selectClassDialog-wrap {
    // 弹窗样式修改
    .el-dialog {
        border-radius: 10px;
        .el-dialog__header {
            padding: 15px 30px;
            background-color: #40b9e6;
            border-radius: 10px 10px 0 0;
            .el-dialog__title {
                color: #fff;
            }
            .el-dialog__close {
                color: #fff;
                font-size: 26px;
            }
        }
        .el-dialog__body {
            padding: 20px 30px;
            overflow: hidden;
        }
        .el-dialog__footer {
            padding: 20px 30px;
            border-top: 1px solid #e5e5e5;
        }
    }
    // 树形样式修改
    .tree-wrap {
        .el-tree {
            .el-tree-node {
                margin: 10px 0;
            }
        }
    }
    .el-checkbox {
        display: none;
    }
    .el-tree-node__expand-icon {
        font-size: 24px;
    }
}
</style>