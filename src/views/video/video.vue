<template>
 <div>
   <video ref="video" controls height="380" width="100%" :src="src" autoplay></video>
 </div>
</template>

<script>
  import {getMvUrl,}  from '@/network/toplist'
  export default {
    name: "video",
    data() {
      return {
        src: ''
      }
    },
    created() {
      getMvUrl(this.$route.query.id).then(res => {
        if (res.data.code === 200) {
          console.log(res.data.data.url);
          this.src = res.data.data.url
          // this.$refs.video.src = res.data.data.url
        }
      })
    }
  }
</script>

<style scoped>

</style>