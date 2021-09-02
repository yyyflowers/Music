<template>
  <div>
    <div class="profile-head">
      <img :src="artist.cover" alt="">
      <div>
        <div>{{artist.name}}</div>
        <div><Icon type="md-headset" />单曲数: {{artist.musicSize}}</div>
        <div><Icon type="ios-film" />专辑数:{{artist.albumSize}}</div>
        <div><Icon type="ios-videocam" />MV数:{{artist.mvSize}}</div>
      </div>
    </div>
    <div class="profile-body">
      <Tabs value="name1" @on-click="tabclick">
        <TabPane label="专辑" name="name1">
          按发行时间排序:
          <Table stripe :columns="columns1" :data="hotAlbums" @on-row-click="rowClick"></Table>
        </TabPane>
        <TabPane label="MV" name="name2">
          <Row>
            <Col span="6" v-for="(item,index) in MVs" :key="index">
              <div style="position: relative" class="ImgBox">
                <Icon type="logo-youtube" size="30" color="#5292fe" class="icon" @click="iconClick(item)"/>
                <img :src="item.imgurl" alt="" class="MVimg">
              </div>
              <p style="width:150px;overflow: hidden;text-overflow: ellipsis; white-space: nowrap;color: #000000">{{item.name}}</p>
              <div style="margin-bottom: 20px">
                <span style="margin-right: 20px"><Icon type="ios-videocam-outline" />{{item.playCount | showCount}}</span>
                <span>{{item.publishTime}}</span>
              </div>
            </Col>
          </Row>
        </TabPane>
        <TabPane label="歌手详情" name="name3">
          <div style="font-size: 20px; color: #000000; margin-bottom: 10px">歌手简介</div>
          <p style="color: #333333; margin-bottom: 20px">{{briefDesc}}</p>
          <Timeline>
            <TimelineItem v-for="(item, index) in introduction" :key="index">
              <p class="time">{{item.ti}}</p>
              <p class="content">{{item.txt}}</p>
            </TimelineItem>
          </Timeline>
        </TabPane>
        <TabPane label="相似歌手" name="name4">
          <Row>
            <Col span="6" v-for="(item, index) in simiArtist" :key="index">
              <Card dis-hover :to="'/profile?id='+item.id">
                <img :src="item.picUrl" alt="" style="width: 200px;height: 130px;">
                <p style="text-align: center">
                  {{item.name}}
                  <Icon type="md-person" />
                </p>
              </Card>
            </Col>
            <Spin size="large" fix v-if="spinShow"></Spin>
          </Row>
        </TabPane>
      </Tabs>
    </div>
  </div>
</template>

<script>
  import {getArtistDetail, getArtistAlbum, getArtistDesc, getSimiArtist, getArtistMV,} from '@/network/toplist'
  export default {
    name: "profile",
    data() {
      return {
        artist: {},
        briefDesc: '',
        introduction: [],
        simiArtist: [],
        spinShow: false,
        MVs: [],
        hotAlbums: [],
        columns1: [
          {
            title: '封面',
            key: 'picUrl',
            render:(h,params) => {
              return h('img', {
               attrs: {
                 src: params.row.picUrl
               },
               style: {
                 width: '100px',
                 height: '100px'
               }
              })
            }
          },
          {
            title: '专辑名',
            key: 'name'
          },
          {
            title: '发行时间',
            key: 'publishTime',
            width: 160,
            render: (h,params) => {
              return h('div',
              new Date(params.row.publishTime).toLocaleDateString()
              )
            }
          }
        ],
      }
    },
    created() {
      getArtistDetail(this.$route.query.id).then(res => {
        if (res.data.code === 200) {
          // console.log(res.data.data);
          this.artist = res.data.data.artist
          this.briefDesc = res.data.data.artist.briefDesc
        }
      })
      getArtistAlbum(this.$route.query.id).then(res => {
        if (res.data.code === 200) {
          // console.log(res.data.hotAlbums);
          this.hotAlbums = res.data.hotAlbums
          // this.artist = res.data.data.artist
        }
      })
    },
    methods: {
      // 点击导航菜单
      tabclick(name) {
        if (name === 'name3') {
          getArtistDesc(this.$route.query.id).then(res => {
            if (res.data.code === 200) {
              // console.log(res.data.introduction);
              this.introduction = res.data.introduction
              this.hotAlbums = []
              this.simiArtist = []
              this.MVs = []
            }
          })
        }else if (name === 'name1') {
          getArtistAlbum(this.$route.query.id).then(res => {
            if (res.data.code === 200) {
              // console.log(res.data.hotAlbums);
              this.hotAlbums = res.data.hotAlbums
              // this.artist = res.data.data.artist
            }
          })
        }else if (name === 'name4') {
          getSimiArtist(this.$route.query.id).then(res => {
            if (res.data.code === 200) {
              // console.log(res.data.artists);
              this.simiArtist = res.data.artists
              this.hotAlbums = []
              this.briefDesc = ''
              this.introduction = []
            }
          })
        }else if (name === 'name2') {
          getArtistMV(this.$route.query.id).then(res => {
            if (res.data.code === 200) {
              // console.log(res.data.mvs);
              this.MVs = res.data.mvs
              this.hotAlbums = []
              this.simiArtist = []
              this.briefDesc = ''
              this.introduction = []
            }
                })
        }
            },
      // 点击table中的某一行
      rowClick(e) {
        // console.log(e.id);
        this.$router.push('/album?id=' + e.id)
        // getAlbum(e.id).then(res => {
        //   console.log(res);
        // })
      },
      // 点击播放MV
      iconClick(e) {
        // console.log(e);
        this.$router.push('/video?id=' + e.id)
      }
    },
    filters: {
      showDate(value) {
        var date = new Date(value)
        return date.getFullYear() + '-' + ( date.getMonth() + 1 ) + '-' + date.getDay()
      },
      showCount(value) {
        if(value >= 10000 && value <= 100000000) {
          value /= 10000
          return value.toFixed(1) + '万';
        } else if (value > 100000000) {
          value /=100000000
          return value.toFixed(1) + '亿';
        } else{
          return value;
        }
      }
    }
  }
</script>

<style scoped>
  .profile-head {
    display: flex;
    margin-bottom: 20px;
  }
  .profile-head img {
    width: 250px;
    height: 200px;
    margin-right: 20px;
  }
  .profile-head div {
    flex: 1;
  }
  .profile-head div div {
    font-size: 16px;
    margin-bottom: 10px;
  }
  .profile-head div div:nth-of-type(1) {
    font-size: 22px;
    color: #000000;
    margin-bottom: 20px;
  }
  .MVimg {
    width: 150px;
    height: 100px;
  }
  .icon {
    position: absolute;
    top: 35px;
    left: 55px;
    display: none
  }
  .ImgBox:hover .icon{
    display: block;
  }

  .time{
    font-size: 14px;
    font-weight: bold;
    color: #000000;
  }
  .content{
    padding-left: 5px;
    color: #333333;
  }
</style>