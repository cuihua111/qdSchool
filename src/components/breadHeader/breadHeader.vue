<template>
	<div class="title">
			<div class="back" @click="backToUp">
				<img src="/static/images/back.png" alt>
				<span>返回</span>
			</div>{{titleInfo.centerTitle}}
			<div class="status" v-if="titleInfo.rightTitle">
				<span>{{titleInfo.rightTitle.isRelease?'已发布':'未发布'}}</span>
				<!-- <img :src="statusImgUrl" alt> -->
			</div>
		</div>
</template>
<script>
export default {
	props: {
		titleInfo: {
			type: Object,
		}
	},
	data(){
		return {

		}
	},
	methods:{
		backToUp(){
			this.$router.go(-1)
		}
	},
	mounted(){},
	created(){}
}
</script>
<style lang="scss" scoped>
	.title {
    height: 60px;
    font-size: 20px;
    line-height: 60px;
    border-bottom: 1px solid #e5e5e5;
    color: #333;
    text-align: center;
    position: relative;
    .back,
    .status {
      position: absolute;
      color: #4dc2fd;
      font-size: 14px;
      top: 50%;
      transform: translateY(-50%);
      cursor: pointer;
      img {
        width: 10px;
        height: 18px;
        margin-right: 10px;
        vertical-align: sub;
      }
    }
    .back {
      left: 30px;
    }
    .status {
      color: #333;
      right: 30px;
      img {
        width: 20px;
        height: 20px;
        margin-left: 10px;
      }
    }
  }
</style>


