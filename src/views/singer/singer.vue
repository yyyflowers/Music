<template>
 <div>
   <div class="singer-head">
     <div>
       <span>语种:</span>
       <RadioGroup v-model="area" size="small" @on-change="changeArea" type="button">
         <Radio label="-1">全部</Radio>
         <Radio label="7">华语</Radio>
         <Radio label="96">欧美</Radio>
         <Radio label="8">日本</Radio>
         <Radio label="16">韩国</Radio>
         <Radio label="0">其他</Radio>
       </RadioGroup>
     </div>
     <div>
       <span>分类:</span>
       <RadioGroup v-model="type" size="small" @on-change="changeType" type="button">
         <Radio label="-1">全部</Radio>
         <Radio label="1">男歌手</Radio>
         <Radio label="2">女歌手</Radio>
         <Radio label="3">乐队组合</Radio>
       </RadioGroup>
     </div>
     <div>
       <span>筛选:</span>
       <RadioGroup v-model="initial" size="small"  @on-change="changeInitial" type="button">
         <Radio label="-1">热门</Radio>
         <Radio label="a">A</Radio>
         <Radio label="b">B</Radio>
         <Radio label="c">C</Radio>
         <Radio label="d">D</Radio>
         <Radio label="e">E</Radio>
         <Radio label="f">F</Radio>
         <Radio label="g">G</Radio>
         <Radio label="h">H</Radio>
         <Radio label="i">I</Radio>
         <Radio label="j">J</Radio>
         <Radio label="k">K</Radio>
         <Radio label="l">L</Radio>
         <Radio label="m">M</Radio>
         <Radio label="n">N</Radio>
         <Radio label="o">O</Radio>
         <Radio label="p">P</Radio>
         <Radio label="q">Q</Radio>
         <Radio label="r">R</Radio>
         <Radio label="s">S</Radio>
         <Radio label="t">T</Radio>
         <Radio label="u">U</Radio>
         <Radio label="v">V</Radio>
         <Radio label="w">W</Radio>
         <Radio label="x">X</Radio>
         <Radio label="y">Y</Radio>
         <Radio label="z">Z</Radio>
         <Radio label="0">#</Radio>
       </RadioGroup>
     </div>
   </div>
    <div class="singer-body">
      <Row>
        <Col span="6" v-for="(item, index) in artists" :key="index">
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
    </div>
 </div>
</template>

<script>
  import {getArtistList} from '@/network/toplist'
  export default {
    name: "singer",
    data() {
      return {
        area: '7',
        type: '1',
        initial: '-1',
        artists: [],
        spinShow: false
      }
    },
    created() {
      this.spinShow = true
      getArtistList(this.area,this.type,this.initial).then(res => {
        if(res.data.code === 200) {
          // console.log(res.data.artists);
          this.artists = res.data.artists
          this.spinShow = false
        }
      })
    },
    methods: {
      changeArea() {
        this.spinShow = true
        // console.log(this.area);
        getArtistList(this.area,this.type,this.initial).then(res => {
          if(res.data.code === 200) {
            console.log(res.data.artists);
            this.artists = res.data.artists
            this.spinShow = false
          }
        })
      },
      changeType() {
        this.spinShow = true
        getArtistList(this.area,this.type,this.initial).then(res => {
          if(res.data.code === 200) {
            console.log(res.data.artists);
            this.artists = res.data.artists
            this.spinShow = false
          }
        })
      },
      changeInitial() {
        this.spinShow = true
        getArtistList(this.area,this.type,this.initial).then(res => {
          if(res.data.code === 200) {
            // console.log(res.data.artists);
            this.artists = res.data.artists
            this.spinShow = false
          }
        })
      }
    }
  }
</script>

<style scoped>
  .singer-head {
    color: #333333;
    padding-bottom: 40px;
    font-size: 10px;
  }
  .singer-head div {
    margin-bottom: 10px;
    margin-top: 10px;
  }
  .singer-head div span{
    margin-right: 20px;
  }
</style>