<template>
  <div>
    <div class="dj-head">
      <Carousel autoplay v-model="value2" loop :autoplay-speed="4000">
        <CarouselItem v-for="(item,index) in pic" :key="index">
          <img :src="item.pic" alt="" class="demo-carousel" style="height: 200px;width: 100%;">
        </CarouselItem>
      </Carousel>
    </div>
    <div class="dj-body">
      <div class="body-head">推荐电台</div>
      <Row>
        <Col span="6" v-for="(item,index) in djRadios" :key="index">
          <Card style="width:200px; height: 300px" :to="'/djDetail?rid=' + item.id">
            <div style="text-align:center">
              <img :src="item.picUrl" style="width: 160px;margin-bottom: 10px">
              <List size="small">
                <ListItem>
                  <ListItemMeta :avatar="item.dj.avatarUrl" :title="item.dj.nickname" :description="item.rcmdtext" />
                </ListItem>
              </List>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  </div>
</template>

<script>
  import {getDjBanner, getDjRecommend, getDjDetail,} from '@/network/toplist'
  export default {
    name: "dj",
    data() {
      return {
        value2: 0,
        pic: [],
        djRadios: []
      }
    },
    created() {
      getDjBanner().then(res => {
        if (res.data.code === 200) {
          // console.log(res.data.data);
          this.pic = res.data.data
        }
      })
      getDjRecommend().then(res => {
        if (res.data.code === 200) {
          // console.log(res.data.djRadios);
          this.djRadios = res.data.djRadios
        }
      })
    }
  }
</script>

<style scoped>
  .dj-head {
    padding: 0 80px;
    margin-bottom: 20px;
  }
  .body-head{
    height: 30px;
    font-size: 18px;
    border-bottom: 2px solid #e1e1e2;
    margin-bottom: 20px;
  }

</style>