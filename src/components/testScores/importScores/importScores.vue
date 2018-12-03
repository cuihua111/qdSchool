<template>
    <!-- 导入成绩页 -->
    <div class="importScores-wrap">
        <!-- 下载模板 -->
        <div class="downloadTemplate">
            <span>请下载成绩模板，按格式填写后导入</span>
            <el-button size="mini" class="download-btn">下载模板</el-button>
        </div>
        <!-- 上传文件区域 -->
        <div class="upload-file">
            <div class="file-img">
                <span :class="{ 'img-default': true, 'img-success': uploadStatus }"></span>
                <Progress :percentage="percentage" class="import-progress" v-if="importStatus"></Progress>
            </div>
            <p class="file-name">
                <span v-if="!uploadStatus">请将填好的考试成绩信息上传</span>
                <span v-if="uploadStatus">{{fileName}}</span>
            </p>
            <div class="file-btn">
                <!-- <el-button size="mini" class="upload-btn">上传文件</el-button> -->
                <el-upload
                    ref="upload"
                    action="http://123.207.88.200:9000/singcampus/getUploadToken"
                    :on-success='uploadSuccess'
                    :auto-upload="true"
                    :show-file-list="false"
                    :multiple="false">
                    <el-button size="mini" class="upload-btn">
                        <span v-if="!uploadStatus">上传文件</span>
                        <span v-if="uploadStatus">重新上传</span>
                    </el-button>
                </el-upload>
            </div>
        </div>
        <!-- 导入按钮 -->
        <div class="import">
            <el-button class="import-btn"
                type="primary"
                v-if="uploadStatus"
                @click="handleClickImport">
                导入
            </el-button>
        </div>
    </div>
</template>

<script>
import { mapMutations, mapActions } from "vuex"
import Progress from '../components/Progress'

export default {
  name: 'importScores',
  components: { Progress },
  props: [],
  data () {
    return {
      query: JSON.parse(this.$route.query.data),
      uploadStatus: false, // 上传文件是否成功
      fileName: '', // 上传的文件名
      fileUrl: '', // 上传的文件地址
      importStatus: false, // 导入状态
      percentage: 0
    }
  },
  created () {
    this.SET_HEADER_TITLE('导入成绩')
  },
  methods: {
    ...mapMutations('testScores', ['SET_HEADER_TITLE']),
    ...mapActions('testScores', ['ImportSocre']),
    /**
     * 文件上传成功的回调
     */
    uploadSuccess (response, file) {
      this.uploadStatus = file.status === 'success'
      this.fileName = file.name
      this.fileUrl = `${response.data.bucketUrl}/${file.name}`
      console.log(response, file)
    },

    /**
     * 点击导入按钮
     */
    handleClickImport () {
      this.importStatus = true
      let timer = setInterval(() => {
        this.percentage++
      }, 500)
      this.ImportSocre({
        testID: this.query.id,
        importSocre_url: this.fileUrl
      })
      .then(res => {
        console.log(res)
      })
      .catch(e => {
        console.log(e)
        clearInterval(timer)
        this.percentage = 100
        this.$router.push({
          path: '/home/testScores/importResult',
          query: {
            data: JSON.stringify(e)
          }
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.importScores-wrap {
    .downloadTemplate {
        width: 500px;
        height: 60px;
        box-sizing: border-box;
        line-height: 60px;
        border: 1px solid #facd8a;
        border-radius: 4px;
        background-color: #fffada;
        margin: 30px auto 0;
        font-size: 16px;
        padding: 0 20px;
        position: relative;
        color: #666;
        .download-btn {
            position: absolute;
            right: 20px;
            top: 16px;
        }
    }
    .upload-file {
        width: 500px;
        height: 260px;
        box-sizing: border-box;
        border: 1px solid #c7c7c7;
        border-radius: 4px;
        background-color: #fff;
        margin: 20px auto 0;
        .file-img {
            text-align: center;
            margin-top: 80px;
            position: relative;
            .img-default {
                display: inline-block;
                width: 52px;
                height: 60px;
                background-image: url('../../../../static/images/grayUpload.png');
            }
            .img-success {
                background-image: url('../../../../static/images/greenUpload.png');
            }
            .import-progress {
                position: absolute;
                top: -40px;
                left: 50%;
                transform: translateX(-50%);
            }
        }
        .file-name {
            text-align: center;
        }
        .file-btn {
            text-align: center;
        }
    }
    .import {
        text-align: center;
        margin-top: 50px;
        .import-btn {
            width: 180px;
            height: 36px;
        }
    }
}
</style>
