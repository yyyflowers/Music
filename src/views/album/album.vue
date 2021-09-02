<template>
  <div>
    <div class="album-head">
      <img :src="album.blurPicUrl" alt="">
      <div>
        <div style="font-size: 22px;color: #000000;margin-bottom: 10px">{{album.name}}</div>
        <div style="font-size: 10px; margin-bottom: 10px" >歌手:{{artist}}</div>
        <p>{{album.description}}</p>
      </div>
    </div>
    <div class="album-body">
      <Table :columns="columns1" :data="songs" @on-row-click="rowClick">
        <template slot-scope="{ row, index }" slot="action">
          <div v-if="editIndex === index">
            <Icon type="ios-pause"/>
          </div>
          <Icon type="md-play" v-else/>
        </template>
      </Table>
    </div>
    <Affix :offset-bottom="20" :style="{position: 'absolute', bottom: '15px',left: 0, width: '98%'}">>
      <audio ref="audio"  @pause="pauseClick" @play="playClick"></audio>
    </Affix>
  </div>
</template>

<script>
  import {getAlbum, getSongURL} from '@/network/toplist'
  export default {
    name: "album",
    data() {
      return {
        album: {},
        artist: '',
        editIndex: -1,
        songs: [],
        columns1: [
          {
            type: 'index',
            width: 60,
            align: 'center'
          },
          {
            title: '歌曲名称',
            key: 'name'
          },
          {
            title: '播放',
            slot: 'action',
            width: 150,
            align: 'center'
          }
        ]
      }
    },
    created() {
      getAlbum(this.$route.query.id).then(res => {
        if (res.data.code === 200) {
          // console.log(res.data.album);
          this.album = res.data.album
          this.artist = res.data.album.artist.name
          this.songs = res.data.songs
        }
      })
    },
    methods: {
      // 播放
      // handlePlay(row,index) {
      //   this.editIndex = index;
      // },
      // 暂停
      // handlePause(row,index) {
      //   this.editIndex = -1
      // },
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
      }
    }
  }
</script>

<style scoped>
  .album-head {
    display: flex;
    margin-bottom: 30px;
  }
  .album-head img {
    width: 200px;
    height: 200px;
    margin-right: 30px;
  }
  .album-head div {
    flex: 1;
    color: #333333;
  }
  .album-head div p {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 6;
  }
</style>