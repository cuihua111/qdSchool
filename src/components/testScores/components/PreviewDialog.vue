<template>
    <!-- 成绩预览二维码弹窗 -->
    <el-dialog class="PreviewDialog-wrap"
        :visible.sync="visible"
        width="1000px"
        title="xxx">
        <div class="main">
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="btnCancel">取 消</el-button>
            <el-button type="primary" @click="btnOk">确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>
export default {
  name: '',
  components: {},
  props: [],
  data () {
    return {
      visible: false
    }
  },
  methods: {
    /**
     * 打开弹窗
     */
    open () {
      this.visible = true
    },

    /**
     * 点击取消按钮
     */
    btnCancel () {
    },

    /**
     * 点击取消按钮
     */
    btnOk () {
    }
  }
}
</script>

<style lang="scss" scoped>
.PreviewDialog-wrap {}
</style>
