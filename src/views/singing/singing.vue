<template>
  <div>
    <Row>
      <Col span="8" v-for="(item,index) in singing" :key="index">
        <Card>
          <img slot="title" :src="item.coverImgUrl" alt="" style="width: 274px;height: 120px; text-align: center">
          <span slot="extra" style="position: relative;top: 100px;left: -10px">
            <Icon type="md-play" color="white" size="20"/>
<!--            <Icon type="md-pause" color="white" size="20" />-->
          </span>
          <p v-for="(x,y) in songs[index]" :key="y" class="songsP" @click="pClick(x,index)">
            <span style="font-size: 18px; color: red; margin-right: 10px">{{y+1}}</span>
            {{x.name}}</p>
          <!--          <Table :columns="columns1" :data="songs[index]" :show-header="false" size="small"></Table>-->
        </Card>
      </Col>
    </Row>
    <Affix :offset-bottom="20" :style="{position: 'absolute', bottom: '15px',left: 0, width: '98%'}">>
      <audio ref="audio"></audio>
    </Affix>
  </div>
</template>

<script>
  import {Toplist, getPlaylistDetail, getSongDetail, getSongURL,} from '@/network/toplist'
  export default {
    name: "singing",
    data() {
      return {
        // 属性名没改，值修改了
        soarings: 1978921795,
        newsongs: 71385702,
        original: 5059633707,
        hotsong: 10520166,
        vip:6886768100,
        rap:5059661515,
        singing: [],
        songMs: [],
        songs: [],
        columns1: [
          {
            title: 'Name',
            key: 'name',
          }
        ],
        editIndex: -1,
        src: '',
      }
    },
    created() {
      Toplist().then(res => {
        if (res.data.code === 200) {
          // console.log(res.data.list);
          setTimeout(()=>{
            this.singing.push(res.data.list[7],res.data.list[8],res.data.list[24],res.data.list[10],res.data.list[32],res.data.list[27])
            // console.log(this.singing);
          },2000)
        }
      })
      this._getPlaylistDetail(this.soarings)
      this._getPlaylistDetail(this.newsongs),
      this._getPlaylistDetail(this.original),
      this._getPlaylistDetail(this.hotsong),
      this._getPlaylistDetail(this.vip),
      this._getPlaylistDetail(this.rap)
    },
    methods: {
      _getPlaylistDetail(id) {
        var songId = []
        var songs = []
        getPlaylistDetail(id).then(res => {
          if (res.data.code === 200) {
            // console.log(res.data.privileges);
            this.songMs = res.data.privileges.splice(0, 8);
            // console.log(this.songMs);
            this.songMs.map((item) => {
              songId.push(item.id);
              // console.log(songId)
            })
            // console.log(songId)
            songId.map((item) => {
              getSongDetail(item).then((res) => {
                songs.push(res.data.songs[0]);
                if(songs.length === 8) {
                  // console.log(songs)
                  this.songs.push(songs)
                  // console.log(this.songs)
                }
              });
            });
            // console.log(this.songs);
          }
        })
      },
      // 点击列表播放音乐
      pClick(e,index) {
        // console.log(index);
        // this.index === index
        getSongURL(e.id).then(res => {
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
    }
  }
</script>

<style scoped>
  .songsP {
    overflow: hidden; text-overflow: ellipsis; white-space: nowrap; cursor: pointer;
  }
  .songsP:hover {
    background-color: lightblue;
    /*opacity: .1;*/
  }
</style>