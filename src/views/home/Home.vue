<template>
  <div class="layout">
    <Layout>
      <Header style="background-color: #5292fe;">
          <Menu mode="horizontal" active-name="1" theme="primary" @on-select='HSelect'>
            <div class="layout-logo">网易云音乐</div>
            <div class="layout-search">
              <Input v-model="value4" icon="ios-search" placeholder="请输入歌曲或作者" style="width: 500px; position: relative; top: -15px;"  @on-enter="onEnter(value4)"/>
            </div>
            <div class="layout-nav">
              <MenuItem name="2">
                <Icon type="ios-contact-outline" />登录
              </MenuItem>
              <MenuItem name="3">
                <Dropdown trigger="click" @on-click="menuItem">
                  <a href="javascript:void(0)"  style="color: #ffffff">
                    <Icon type="md-menu" />菜单
                    <Icon type="ios-arrow-down"></Icon>
                  </a>
                  <DropdownMenu slot="list">
                    <DropdownItem name="/recommend">个性推荐</DropdownItem>
                    <DropdownItem name="/singer">歌手</DropdownItem>
                    <DropdownItem name="/dj">主播电台</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </MenuItem>
              <MenuItem name="4">
                <Icon type="md-close" />
              </MenuItem>
            </div>
          </Menu>
      </Header>
      <Layout style="height: 499px">
        <Sider hide-trigger :style="{background: '#fff'}">
          <Menu :active-name="active" theme="light" width="auto" :open-names="['1']"  @on-select="onSelect">
            <Submenu name="1">
              <template slot="title">
                <Icon type="ios-navigate"></Icon>
                推荐
              </template>
              <MenuItem name="/recommend" to="/recommend">个性推荐</MenuItem>
              <MenuItem name="/singer">歌手</MenuItem>
              <MenuItem name="/dj">主播电台</MenuItem>
            </Submenu>
            <Submenu name="2">
              <template slot="title">
                <Icon type="ios-keypad"></Icon>
                排行榜
              </template>
              <MenuItem name="/official" to="/official">官方榜</MenuItem>
              <MenuItem name="/singing" to="/singing">曲风榜</MenuItem>
            </Submenu>
            <Submenu name="3">
              <template slot="title">
                <Icon type="ios-analytics"></Icon>
                我的
              </template>
              <MenuItem name="/my" to="/my">我的音乐</MenuItem>
            </Submenu>
          </Menu>
        </Sider>
        <Layout :style="{padding: '24px 24px 24px'}">
          <Content :style="{padding: '24px', background: '#fff'}">
              <router-view :key="$route.fullPath"/>
          </Content>
        </Layout>
      </Layout>
    </Layout>
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
  export default {
    data () {
      return {
        value4: '',
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
        },
        // 搜索结果
        searchSongs: [],
        //搜索匹配，建议，提示
        searchSuggest: [],
        active: '/recommend'
      }
    },
    mounted() {
      // 解决手动刷新二级导航不匹配问题
      this.active = this.$route.path
      if( this.$route.path === '/detail') {
        this.active = '/recommend'
      } else if (this.$route.path === '/profile'){
        this.active = '/singer'
      }else if (this.$route.path === '/album'){
        this.active = '/singer'
      }else if (this.$route.path === '/video'){
        this.active = '/singer'
      }else if (this.$route.path === '/djDetail'){
        this.active = '/dj'
      }
    },
    methods: {
      onSelect(name) {
        if (name === '/recommend') {
          this.$router.push('/recommend')
        } else if(name === '/singer'){
          this.$router.push('/singer')
        }else if(name === '/dj'){
          this.$router.push('/dj')
        }else if(name === '/official'){
          this.$router.push('/official')
        }else if(name === '/singing'){
          this.$router.push('/singing')
        }else if(name === '/my'){
          this.$router.push('/my')
        }
      },
      HSelect(name) {
        if (name === '2'){
          this.modal1 = true
        }
      },
      handleSubmit(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$Message.success('登录成功');
          } else {
            this.$Message.error('登录失败');
          }
        })
      },
      menuItem(name) {
        if (name === '/recommend') {
          this.$router.push('/recommend')
        } else if(name === '/singer'){
          this.$router.push('/singer')
        }else if(name === '/dj'){
          this.$router.push('/dj')
        }
      },
      // 监听输入事件
      // handleToSuggest(e) {
      //   let value = e
      //   // console.log(value);
      //   getSearchSuggest(value).then(res => {
      //     // console.log(res)
      //     if(res.data.code === 200) {
      //       this.searchSuggest = res.data.result.songs
      //       // console.log(this.searchSuggest)
      //     }
      //   })
      // },
      // 按下回车键进行搜索
      onEnter(val) {
        // console.log(val);
        if (!val) {
          return
        }
        this.$router.push('/search?name=' + val)
      }
    }
  }
</script>
<style scoped>
  .layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
  }
  .layout-logo{
    width: 100px;
    height: 30px;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 0px;
    left: 20px;
    color: #ffffff;
  }
  .layout-nav{
    /*margin: 0 auto;*/
    /*margin-right: 0px;*/
    float: right;
    position: relative;
    top: 0px;
    right: 0px;
    color: #ffffff;
  }
  .layout-search{
    width: 500px;
    height: 30px;
    background-color: yellow;
    float: left;
    position: relative;
    top: 15px;
    left: 150px;
  }
</style>
