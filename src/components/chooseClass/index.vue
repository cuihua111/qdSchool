<template>
  <el-dialog
    class="chooseDialog"
    title="选择班级"
    :visible.sync="dialogVisible"
    width="30%"
    :before-close="handleClose"
  >
    <div class="chooseDialogContainer">
      <div class="classlist left">
        <div class="classlist">选择：</div>
        <el-tree
          ref="tree"
          show-checkbox
          node-key="id"
          :data="classList"
          :props="defaultProps"
          :default-checked-keys="defaultCheckedKeys"
          @check-change="handleCheckChange"
          class="manager-tree"
        ></el-tree>
      </div>
      <div class="classlist right">
        <div class="classlist">已选：</div>
        <div>
          <div
            class="choosenItem"
            v-for="(choosenItem,choosenIndex) in choosenClass"
            :key="choosenIndex"
          >
            {{choosenItem.title}}
            <span
              class="choseChooseItme"
              @click="closeChoosenItme(choosenItem)"
            ></span>
          </div>
        </div>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="confirmBtnClick">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  props: {
    classList: {
      type: Array
    },
    dialogVisible:{
      type:Boolean,
      default:false
    },
    choosenClassArr: {
      type: Array,
    }
  },
  watch:{
    choosenClassArr: {
      handler(newVal, oldVal){
        this.choosenClass = newVal
        this.choosenClass.map((item)=>{
          this.defaultCheckedKeys.push(item.id)
        })
      },
      deep: true
    },
    choosenClass:{
      handler(oldV,newV){
        this.$emit('choosenClassChange',newV)
      },
      deep:true
    }
  },
  computed:{
    getCheckedNodes(){
      return this.$refs.tree.getCheckedNodes()
    },
  },
  data() {
    return {
      choosenClass: [], //已选择的班级
      defaultProps: {
        children: "list_subclass",
        label: "title"
      },
      defaultCheckedKeys: []
    };
  },
  mounted(){
    this.choosenClass = this.choosenClassArr
    this.choosenClass.map((item)=>{
      this.defaultCheckedKeys.push(item.id)
    })
  },
  methods: {
    currChange(data, node){
      console.log(data, node)
    },
    //弹框关闭前
    handleClose() {
      this.$emit('chageDialogVisible')
    },
    //点击确定按钮
    confirmBtnClick(){
      this.$emit('confirmClassList', this.choosenClass)
    },
    handleNodeClick(data) {
    },
    closeChoosenItme(item) {
      this.choosenClass.splice(this.choosenClass.indexOf(item), 1);
      this.$refs.tree.setCheckedNodes(this.choosenClass);
    },
    findItem(data){
      return this.choosenClass.filter((item) => {
        return item.id == data.id
      })
    },
    handleCheckChange(data, checked, childChecked) {
      // this.choosenClass = []
      console.log(this.getCheckedNodes,data, checked, childChecked, 'ssssss')
      this.getCheckedNodes.map((item) => {
        if(!item.list_subclass || item.list_subclass.length == 0){
          if(this.findItem(item).length == 0){
            this.choosenClass.push(item)
          }
        }
      })
    },
    checkFunc(data, checked) {
      this.handleCheckChange(data, checked)
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/chooseDialog.scss";
</style>
