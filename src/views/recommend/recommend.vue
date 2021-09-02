<template>
  <div>
    <div class="recommend-head">推荐歌单</div>
    <Tabs @on-click="tabClick" value="华语">
      <TabPane v-for="(item, index) in tags" :key="index" :label="item" :name="item">
        <Row>
          <Col span="6" v-for="(item, index) in playlists" :key="index">
            <Card style="width:200px; height: 250px" :to="'/detail?id=' + item.id" >
              <div slot="extra" style="width:70px;height: 20px; color: #ffffff; position: relative; top: 2px;left:-2px;font-size: 10px;text-align: right">
                <Icon type="ios-headset-outline" />{{item.playCount | showCount}}
              </div>
              <div style="text-align:center">
                <img :src="item.coverImgUrl" alt="" style="width: 160px">
                <div style="width:160px;height: 20px; position: relative; top: -25px;left:3px; color: #ffffff;text-align:left;font-size: 10px" >{{item.creator.nickname}}</div>
                <h5>{{item.name}}</h5>
              </div>
            </Card>
          </Col>
        </Row>
      </TabPane>
    </Tabs>
    <Spin size="large" fix v-if="spinShow"></Spin>
  </div>
</template>

<script>
  import {Hot, getPlaylist} from "@/network/toplist";

  export default {
    name: "recommend",
    data() {
      return {
        tags: [],
        playlists: [],
        spinShow: true
      }
    },
    filters: {
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
    },
    created() {
      Hot().then(res => {
        // console.log(res)
        if (res.data.code === 200) {
          // console.log(res.data.tags);
          // this.tags = res.data.tags
          for(let i=0; i<res.data.tags.length; i++) {
            this.tags.push(res.data.tags[i].name)
          }
          // console.log(this.tags)
        }
      })
      getPlaylist('华语').then(res => {
        this.playlists = res.data.playlists
        // console.log(this.playlists);
        this.spinShow = false
      })
    },
    methods:{
      tabClick(name){
        // console.log(name);
        this.spinShow = true
        getPlaylist(name).then(res => {
          // console.log(res.data.playlists);
          this.playlists = res.data.playlists
          // console.log(this.playlists);
          this.spinShow = false
        })
      }
    }
  }
</script>

<style scoped>
  .recommend-head{
    height: 30px;
    font-size: 18px;
    border-bottom: 2px solid #e1e1e2;
    margin-bottom: 20px;
  }
</style>