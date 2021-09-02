<template>
 <div>
   <p class="my">登录后即可查看,<span style="color: #5292fe; cursor: pointer" @click="modal1 = true">点击登录</span></p>
   <Modal
           v-model="modal1"
           title="登录"
           @on-ok="ok"
           @on-cancel="cancel">
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
    name: "my",
    data() {
      return {
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
    methods: {
      ok () {
        // this.$Message.info('Clicked ok');
      },
      cancel () {
        // this.$Message.info('Clicked cancel');
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
  .my {
    /*background-color: pink;*/
    width: 180px;
    height: 20px;
    margin: 200px auto;
  }
</style>