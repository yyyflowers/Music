<template>
  <div>
    <div class="djDetail-head">
      <img :src="data.picUrl" alt="">
      <div>
        <div>{{data.name}}</div>
        <p>描述:{{data.desc}}</p>
        <p>创建时间:{{data.createTime | showDate}}</p>
        标签:<span>{{data.category}},{{data.secondCategory}}</span>
        <div  style="margin-top: 15px;"><Button type="primary" @click="modal1 = true" ><Icon type="md-download" color="#fff"/>下载全部</Button></div>
      </div>
    </div>
    <div class="djDetail-body">
      <div class="body-head">播放列表</div>
      <Table :columns="columns1" :data="programs" @on-row-click="rowClick">
        <template slot-scope="{ row, index }" slot="action">
          <div v-if="editIndex === index">
            <Icon type="ios-pause" />
          </div>
          <Icon type="md-play" v-else />
        </template>
      </Table>
    </div>
    <Affix :offset-bottom="20" :style="{position: 'absolute', bottom: '15px',left: 0, width: '98%'}">>
      <audio ref="audio" @pause="pauseClick" @play="playClick"></audio>
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
  import {getDjDetail, getDjProgram, getProgramDetail, getSongURL} from '@/network/toplist'
  export default {
    name: "djDetail",
    data() {
      return {
        data: {},
        editIndex: -1,
        programs: [],
        columns1: [
          {
            type: 'index',
            width: 60,
            align: 'center'
          },
          {
            title: '封面',
            key: 'coverUrl',
            render:(h,params) => {
              return h('img', {
                attrs: {
                  src: params.row.coverUrl
                },
                style: {
                  width: '100px',
                  height: '100px'
                }
              })
            }
          },
          {
            title: '标题',
            key: 'name'
          },
          {
            title: '创建时间',
            key: 'createTime',
            width: 160,
            render: (h,params) => {
              return h('div',
                  new Date(params.row.createTime).toLocaleDateString()
              )
            }
          },
          {
            title: '播放',
            slot: 'action',
            width: 150,
            align: 'center'
          }
        ],
        src: '',
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
      getDjDetail(this.$route.query.rid).then(res => {
        if (res.data.code === 200) {
          // console.log(res.data.data);
          this.data = res.data.data
        }
      })
      getDjProgram(this.$route.query.rid).then(res => {
        if (res.data.code === 200) {
          // console.log(res.data.programs);
          this.programs = res.data.programs
        }
      })
    },
    filters: {
      showDate(value) {
        var date = new Date(value)
        return date.getFullYear() + '-' + ( date.getMonth() + 1 ) + '-' + date.getDay()
      }
    },
    methods: {
      // 播放
      // handlePlay(row,index) {
      //   this.editIndex = index;
      // },
      // 暂停
      // handlePause(row,index) {
      //   this.editIndex = -1
      // }
      // 单击歌曲列表某一行
      rowClick(e,index) {
        // console.log(e)
        getProgramDetail(e.id).then(res => {
          if (res.data.code === 200){
            // console.log(res.data.program.mainTrackId);
            getSongURL(res.data.program.mainTrackId).then(res => {
              if(res.data.code === 200) {
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
          }
        })
      },
      // 在控制栏上点击暂停
      pauseClick() {
        // console.log(-1);
        this.editIndex = -1
        // if (this.$refs.audio.paused) {
        //   this.editIndex = -1
        // } else {
        //   this.editIndex = index;
        // }
      },
      // 在控制栏上点击播放
      playClick() {
        // this.editIndex = index;
        // console.log(0);
        this.editIndex = 0;
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
    }
  }
</script>

<style scoped>
  .djDetail-head {
    display: flex;
    margin-bottom: 30px;
  }
  .djDetail-head img {
    width: 250px;
    height: 250px;
    margin-right: 30px;
  }
  .djDetail-head div {
    flex: 1;
    color: #333333;
  }
  .djDetail-head div div {
    font-size: 22px;
    color: #000000;
    margin-bottom: 10px;
  }
  .djDetail-head div p {
    /*font-size: 12px;*/
    padding-bottom: 15px;
  }
  .djDetail-head div span {
    color: #5292fe;
  }
  .body-head{
    height: 30px;
    font-size: 18px;
    border-bottom: 2px solid #e1e1e2;
    margin-bottom: 20px;
  }
</style>