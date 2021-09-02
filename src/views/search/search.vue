<template>
  <div>
    <p>搜索<span style="color: #5292fe">"{{this.$route.query.name}}"</span>找到{{searchSongs.length}}首单曲</p>
    <Table :columns="columns1" :data="data1" @on-row-click="rowClick"></Table>
    <Affix :offset-bottom="20" :style="{position: 'absolute', bottom: '15px',left: 0, width: '98%'}">>
      <audio ref="audio"></audio>
    </Affix>
  </div>
</template>

<script>
  import {getSearch, getSongURL} from '@/network/toplist'
  export default {
    name: "search",
    data() {
      return {
        searchSongs: [],
        columns1: [
          {
            title: '音乐标题',
            key: 'name'
          },
          {
            title: '歌手',
            key: 'artists',
          },
          {
            title: '专辑',
            key: 'album'
          }
        ],
        data1: [],
        src: '',
        editIndex: -1
      }
    },
    created() {
      getSearch(this.$route.query.name).then(res => {
        if (res.data.code === 200) {
          // console.log(res.data.result.songs);
          this.searchSongs = res.data.result.songs
          // console.log(this.searchSongs);
          for (var i=0; i< this.searchSongs.length; i++) {
            this.data1.push({
              name: this.searchSongs[i].name,
              artists: this.searchSongs[i].artists[0].name,
              album: this.searchSongs[i].album.name,
              id:  this.searchSongs[i].id
            })
          }
        }
      })
    },
    methods: {
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
    }
  }
</script>

<style scoped>

</style>