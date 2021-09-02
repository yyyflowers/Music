<template>
  <div>
    <div class="detail-head">
      <img :src="coverImgUrl" alt="">
      <div>
        <div>{{name}}</div>
        <div>{{updateFrequency}}</div>
        <Button type="primary" @click="modal1 = true" ><Icon type="md-download" color="#fff"/>下载全部</Button>
        <div>
          标签:
          <span v-for="(item,index) in tags" :key="index">/{{item}}</span>
        </div>
        <div>简介:{{description}}</div>
        <div>
          <span><Icon type="ios-star-outline" />收藏{{subscribedCount}}</span>
          <span><Icon type="ios-share-outline" />分享{{shareCount}}</span>
        </div>
      </div>
    </div>
    <div class="detail-body">
      <Tabs value="name1" @on-click="tabClick">
        <TabPane label="歌曲列表" name="name1">
          <Table :columns="columns1" :data="data1" @on-row-click="rowClick">
          </Table>
        </TabPane>
        <TabPane label="评论" name="name2">
          <div class="body-comment">最新评论({{comments.length}})</div>
          <div class="body-comment-item" v-for="(item, index) in comments" :key="index">
          <div>
            <Avatar :src="item.user.avatarUrl" size="large" />
            <span>{{item.user.nickname}}</span>
          </div>
          <p>{{item.content}}</p>
          <p>{{item.time | showDate}}</p>
        </div>
        </TabPane>
        <TabPane label="收藏者" name="name3" class="body-sub">
          <div v-for="(item,index) in sub" :key="index">
            <Avatar size="80" :src="item.avatarUrl" />
            <p>{{item.nickname}}</p>
          </div>
        </TabPane>
      </Tabs>
    </div>
    <Spin size="large" fix v-if="spinShow"></Spin>
    <Affix :offset-bottom="20" :style="{position: 'absolute', bottom: '15px',left: 0, width: '98%'}">>
      <audio ref="audio"></audio>
    </Affix>
    <Modal
            v-model="modal1"
            title="登录">
      <Form ref="formInline" :model="formInline" :rules="ruleInline" :label-width="50" style="padding-right: 20px">
        <FormItem prop="user">
          <Input type="text" v-model="formInline.user" placeholder="请输入用户名">
            <Icon type="ios-person-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem prop="password">
          <Input type="password" v-model="formInline.password" placeholder="请输入密码">
            <Icon type="ios-lock-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="handleSubmit('formInline')">登录</Button>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script>
  import {getPlaylistDetail, getPlaylistSub, getPlaylistComment, getSongURL} from '@/network/toplist'
  export default {
    name: "Detail",
    data() {
      return {
        coverImgUrl: '',
        name: '',
        updateFrequency: '',
        tags: '',
        description: '',
        subscribedCount: '',
        shareCount: '',
        tracks: [],
        sub: {},
        comments: [],
        spinShow: true,
        data1: [],
        columns1: [
          {
            title: '歌曲名称',
            key: 'name'
          },
          {
            title: '歌手',
            key: 'ar'
          },
          {
            title: '专辑',
            key: 'al'
          },
          {
            title: '发行时间',
            key: 'publishTime'
          }
        ],
        src: '',
        editIndex: -1,
        modal1: false,
        formInline: {
          user: '',
          password: ''
        },
        ruleInline: {
          user: [
            { required: true, message: '请输入用户名', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { type: 'string', min: 6, message: '密码不能少于6位', trigger: 'blur' }
          ]
        }
      }
    },
    created() {
      // console.log(this.$route.query.id);
      getPlaylistDetail(this.$route.query.id).then(res => {
        if (res.data.code === 200) {
          // console.log(res.data.playlist);
          this.coverImgUrl = res.data.playlist.coverImgUrl
          this.name = res.data.playlist.name
          this.updateFrequency = res.data.playlist.updateFrequency
          this.tags = res.data.playlist.tags
          this.description = res.data.playlist.description
          this.subscribedCount = res.data.playlist.subscribedCount
          this.shareCount = res.data.playlist.shareCount
          this.tracks = res.data.playlist.tracks
          // console.log(this.tracks);
          for (var i=0; i< this.tracks.length; i++) {
            var date = new Date(this.tracks[i].publishTime)
            date = date.getFullYear() + '-' + ( date.getMonth() + 1 ) + '-' + date.getDay()
            this.data1.push({
              name: this.tracks[i].name,
              ar: this.tracks[i].ar[0].name,
              al: this.tracks[i].al.name,
              id: this.tracks[i].id,
              publishTime: date
            })
          }
        }
        this.spinShow = false
      })
    },
    methods:{
      tabClick(name) {
        if (name === 'name2') {
          getPlaylistComment(this.$route.query.id).then(res => {
            if(res.data.code === 200) {
              // console.log(res.data.comments);
              this.comments = res.data.comments
              // console.log(this.comments);
            }
          })
        } else if (name === 'name3') {
          getPlaylistSub(this.$route.query.id).then(res => {
            if(res.data.code === 200) {
              // console.log(res.data.subscribers);
              this.sub = res.data.subscribers
              // console.log(this.sub);
            }
          })
          this.comments = []
          this.tracks = []
        } else {
          this.comments = []
        }
      },
      // 单击歌曲列表某一行
      rowClick(e,index) {
        // console.log(index)
        getSongURL(e.id).then(res => {
          if (res.data.code === 200){
            // console.log(res.data.data[0].url);
            this.src = res.data.data[0].url
            this.$refs.audio.src = this.src
            this.$refs.audio.controls = true;
            if (this.editIndex === -1) {
              // 播放
              this.editIndex = index;
              this.$refs.audio.play()
            } else {
              // 暂停
              this.editIndex = -1
              this.$refs.audio.pause()
            }
          }
        })
        // this.$refs.audio.play()
      },
      handleSubmit(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$Message.success('登录成功');
          } else {
            this.$Message.error('登录失败');
          }
        })
      }
    },
    filters: {
      showDate(value) {
        var date = new Date(value)
        return date.getFullYear() + '-' + ( date.getMonth() + 1 ) + '-' + date.getDay()
      }
    }
  }
</script>

<style scoped>
  .detail-head {
    display: flex;
    margin-bottom: 20px;
  }
 .detail-head img {
  width: 250px;
  height: 250px;
   margin-right: 30px;
  }
  .detail-head div {
    flex: 1;
  }
  .detail-head div div {
    margin: 10px 0;
    color: #333333;
  }
  .detail-head div div:nth-of-type(1) {
    font-size: 20px;
  }
  .detail-head div div:nth-of-type(3) span {
    color: #5292fe;
  }
  .detail-head div div:nth-of-type(4) {
    /*height: 100px;*/
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 5;
    overflow: hidden;
    /*text-overflow: ellipsis;*/
  }
  .detail-head div div:nth-of-type(5) span{
    width: 20px;
    height: 15px;
    margin-right: 20px;
    font-size: 12px;
  }
  .body-sub {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    height: 380px;
  }
  .body-sub div {
    width: 100px;
    height: 100px;
    margin-right: 20px;
  }
  .body-comment {
    height: 30px;
    font-size: 15px;
    border-bottom: 2px solid #e1e1e2;
    margin-bottom: 20px;
  }
  .body-comment-item {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    border-bottom: 1px solid #e1e1e2;
  }
  .body-comment-item div {
    width: 150px;
    color: #1b6d85;
    /*background-color: pink;*/
  }
  .body-comment-item p {
    padding-right: 10px;
  }
  .body-comment-item p:nth-of-type(1) {
    flex: 1;
    text-align: left;
    /*background-color: lightblue;*/
  }
  .body-comment-item p:nth-of-type(2) {
    /*background-color: lightgreen;*/
  }
</style>