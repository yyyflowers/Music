(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-55c83829"],{"8db7":function(t,e,n){},b3d7:function(t,e,n){"use strict";n.r(e);var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"layout"},[n("Layout",[n("Header",{staticStyle:{"background-color":"#5292fe"}},[n("Menu",{attrs:{mode:"horizontal","active-name":"1",theme:"primary"},on:{"on-select":t.HSelect}},[n("div",{staticClass:"layout-logo"},[t._v("网易云音乐")]),n("div",{staticClass:"layout-search"},[n("Input",{staticStyle:{width:"500px",position:"relative",top:"-15px"},attrs:{icon:"ios-search",placeholder:"请输入歌曲或作者"},on:{"on-enter":function(e){return t.onEnter(t.value4)}},model:{value:t.value4,callback:function(e){t.value4=e},expression:"value4"}})],1),n("div",{staticClass:"layout-nav"},[n("MenuItem",{attrs:{name:"2"}},[n("Icon",{attrs:{type:"ios-contact-outline"}}),t._v("登录 ")],1),n("MenuItem",{attrs:{name:"3"}},[n("Dropdown",{attrs:{trigger:"click"},on:{"on-click":t.menuItem}},[n("a",{staticStyle:{color:"#ffffff"},attrs:{href:"javascript:void(0)"}},[n("Icon",{attrs:{type:"md-menu"}}),t._v("菜单 "),n("Icon",{attrs:{type:"ios-arrow-down"}})],1),n("DropdownMenu",{attrs:{slot:"list"},slot:"list"},[n("DropdownItem",{attrs:{name:"/recommend"}},[t._v("个性推荐")]),n("DropdownItem",{attrs:{name:"/singer"}},[t._v("歌手")]),n("DropdownItem",{attrs:{name:"/dj"}},[t._v("主播电台")])],1)],1)],1),n("MenuItem",{attrs:{name:"4"}},[n("Icon",{attrs:{type:"md-close"}})],1)],1)])],1),n("Layout",{staticStyle:{height:"499px"}},[n("Sider",{style:{background:"#fff"},attrs:{"hide-trigger":""}},[n("Menu",{attrs:{"active-name":t.active,theme:"light",width:"auto","open-names":["1"]},on:{"on-select":t.onSelect}},[n("Submenu",{attrs:{name:"1"}},[n("template",{slot:"title"},[n("Icon",{attrs:{type:"ios-navigate"}}),t._v(" 推荐 ")],1),n("MenuItem",{attrs:{name:"/recommend",to:"/recommend"}},[t._v("个性推荐")]),n("MenuItem",{attrs:{name:"/singer"}},[t._v("歌手")]),n("MenuItem",{attrs:{name:"/dj"}},[t._v("主播电台")])],2),n("Submenu",{attrs:{name:"2"}},[n("template",{slot:"title"},[n("Icon",{attrs:{type:"ios-keypad"}}),t._v(" 排行榜 ")],1),n("MenuItem",{attrs:{name:"/official",to:"/official"}},[t._v("官方榜")]),n("MenuItem",{attrs:{name:"/singing",to:"/singing"}},[t._v("曲风榜")])],2),n("Submenu",{attrs:{name:"3"}},[n("template",{slot:"title"},[n("Icon",{attrs:{type:"ios-analytics"}}),t._v(" 我的 ")],1),n("MenuItem",{attrs:{name:"/my",to:"/my"}},[t._v("我的音乐")])],2)],1)],1),n("Layout",{style:{padding:"24px 24px 24px"}},[n("Content",{style:{padding:"24px",background:"#fff"}},[n("router-view",{key:t.$route.fullPath})],1)],1)],1)],1),n("Modal",{attrs:{title:"登录"},model:{value:t.modal1,callback:function(e){t.modal1=e},expression:"modal1"}},[n("Form",{ref:"formInline",staticStyle:{"padding-right":"20px"},attrs:{model:t.formInline,rules:t.ruleInline,"label-width":50}},[n("FormItem",{attrs:{prop:"user"}},[n("Input",{attrs:{type:"text",placeholder:"请输入用户名"},model:{value:t.formInline.user,callback:function(e){t.$set(t.formInline,"user",e)},expression:"formInline.user"}},[n("Icon",{attrs:{slot:"prepend",type:"ios-person-outline"},slot:"prepend"})],1)],1),n("FormItem",{attrs:{prop:"password"}},[n("Input",{attrs:{type:"password",placeholder:"请输入密码"},model:{value:t.formInline.password,callback:function(e){t.$set(t.formInline,"password",e)},expression:"formInline.password"}},[n("Icon",{attrs:{slot:"prepend",type:"ios-lock-outline"},slot:"prepend"})],1)],1),n("FormItem",[n("Button",{attrs:{type:"primary"},on:{click:function(e){return t.handleSubmit("formInline")}}},[t._v("登录")])],1)],1)],1)],1)},s=[],o={data:function(){return{value4:"",modal1:!1,formInline:{user:"",password:""},ruleInline:{user:[{required:!0,message:"请输入用户名",trigger:"blur"}],password:[{required:!0,message:"请输入密码",trigger:"blur"},{type:"string",min:6,message:"密码不能少于6位",trigger:"blur"}]},searchSongs:[],searchSuggest:[],active:"/recommend"}},mounted:function(){this.active=this.$route.path,"/detail"===this.$route.path?this.active="/recommend":"/profile"===this.$route.path||"/album"===this.$route.path||"/video"===this.$route.path?this.active="/singer":"/djDetail"===this.$route.path&&(this.active="/dj")},methods:{onSelect:function(t){"/recommend"===t?this.$router.push("/recommend"):"/singer"===t?this.$router.push("/singer"):"/dj"===t?this.$router.push("/dj"):"/official"===t?this.$router.push("/official"):"/singing"===t?this.$router.push("/singing"):"/my"===t&&this.$router.push("/my")},HSelect:function(t){"2"===t&&(this.modal1=!0)},handleSubmit:function(t){var e=this;this.$refs[t].validate((function(t){t?e.$Message.success("登录成功"):e.$Message.error("登录失败")}))},menuItem:function(t){"/recommend"===t?this.$router.push("/recommend"):"/singer"===t?this.$router.push("/singer"):"/dj"===t&&this.$router.push("/dj")},onEnter:function(t){t&&this.$router.push("/search?name="+t)}}},a=o,i=(n("bd72"),n("2877")),l=Object(i["a"])(a,r,s,!1,null,"7659921c",null);e["default"]=l.exports},bd72:function(t,e,n){"use strict";n("8db7")}}]);
//# sourceMappingURL=chunk-55c83829.5c05e608.js.map