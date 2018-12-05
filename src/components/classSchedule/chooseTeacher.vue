<template>
	<el-dialog
    class="chooseDialog"
    title="选择班级"
    :visible.sync="dialogVisible"
    width="30%"
    :before-close="handleClose"
  >
    <div class="chooseDialogContainer chooseTeacherWrap">
      <div class="classlist left">
        <div class="classlist">选择：</div>
        <ul class="tearchList">
					<li class="listItem" :class="{select: item.isSelect}" @click="toggleSelect(item)" v-for="(item ,index) in pageTearcherList" :key="index">
							<div class="circle">{{splitName(item.nickname)}}</div>
							<div class="tearcherName">{{item.nickname}}</div>	
							<i v-if="item.isSelect" class="el-icon-check"></i>
					</li>
				</ul>
      </div>
      <div class="classlist right">
        <div class="classlist">已选：</div>
				<ul class="tearchList">
					<li class="listItem" :class="{select: item1.isSelect}"  v-for="(item1 ,index1) in choosenTearcher" :key="index1" @click="remove(item1)">
							<div class="circle">{{splitName(item1.nickname)}}</div>
							<div class="tearcherName">{{item1.nickname}}</div>	
							<i v-if="item1.isSelect" class="el-icon-close"></i>
					</li>
				</ul>
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
    tearchList: {
      type: Array
		},
		chooseArr: {
			type: Array
		},
    dialogVisible:{
      type:Boolean,
      default:false
    }
	},
	computed: {
		pageTearcherList(){
			return this.tearchList.map((item)=>{
				if(this.isSame(item).length == 0){
					item.isSelect = false
				}else{
					item.isSelect = true
				}
				return item
			})
		}
	},
	data(){
		return {
			choosenTearcher: [], //已选择的班级
      defaultProps: {
        children: "list_subclass",
        label: "title"
      }
		}
	},
	methods: {
		//弹框关闭前
    handleClose() {
      this.$emit('chageDialogVisible')
    },
    //点击确定按钮
    confirmBtnClick(){
      this.$emit('confirmClassList', this.choosenTearcher)
    },
		isSame(data){
			return this.chooseArr.filter((item)=>{
				return item == data.uid
			})
		},
		splitName(name){
			if(!name){
				return ''
			}
			return name.substr(0, 2)
		},
		toggleSelect(data){
			let isRight = false
				isRight = !data.isSelect
			if(data.isSelect){
				this.choosenTearcher.splice(this.choosenTearcher.indexOf(data), 1)
			}else{
				this.choosenTearcher.push(data)
			}
			this.pageTearcherList.forEach((item)=>{
				if(data.uid == item.uid){
					item.isSelect = isRight
				}
			})
		},
		remove(data){
			this.choosenTearcher.splice(this.choosenTearcher.indexOf(data), 1)
			this.pageTearcherList.forEach((item)=>{
				if(data.uid == item.uid){
					item.isSelect = false
				}
			})
		}
	},
	mounted(){},
	created(){
		// this.choosenTearcher = this.chooseArr
		this.pageTearcherList.map((item)=>{
			if(this.isSame(item).length > 0){
				this.choosenTearcher.push(item)
			}
		})
	}
}
</script>
<style lang="scss">
@import "@/assets/chooseDialog.scss";
	.chooseTeacherWrap{
		.el-dialog__body{
			border-bottom: 1px solid #999;
			padding-bottom: 0;
		}
		.classlist{
			&.left{
				border-right: 1px solid #999;
			}
			&.right{
				padding-left: 5px;
			}
		}
		.tearchList{
			height: 300px;
			overflow-y: auto;
			padding-right: 20px;
			li{
				display: flex;
				height: 40px;
				line-height: 40px;
				padding: 5px 0 5px 10px;
				border-radius: 3px;
				cursor: pointer;
				&:hover{
					background-color: #ebeef5;
				}
				&.select{
					position: relative;
					i{
						position: absolute;
						right: 10px;
						top: 50%;
						transform: translateY(-50%)
					}
				}
				.circle{
					width: 40px;
					height: 40px;
					line-height: 40px;
					border-radius: 50%;
					background-color: #10a9e9;
					color: #fff;
					text-align: center;
					margin-right: 10px;
				}
				.tearcherName{
					overflow:hidden;
					text-overflow:ellipsis;
					white-space:nowrap;
				}
			}
		}
	}
	
</style>

