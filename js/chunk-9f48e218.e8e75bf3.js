(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-9f48e218"],{"398b":function(t,a,i){},"65ac":function(t,a,i){"use strict";i.r(a);var n=function(){var t=this,a=t.$createElement,i=t._self._c||a;return i("div",[i("div",{staticClass:"album-head"},[i("img",{attrs:{src:t.album.blurPicUrl,alt:""}}),i("div",[i("div",{staticStyle:{"font-size":"22px",color:"#000000","margin-bottom":"10px"}},[t._v(t._s(t.album.name))]),i("div",{staticStyle:{"font-size":"10px","margin-bottom":"10px"}},[t._v("歌手:"+t._s(t.artist))]),i("p",[t._v(t._s(t.album.description))])])]),i("div",{staticClass:"album-body"},[i("Table",{attrs:{columns:t.columns1,data:t.songs},on:{"on-row-click":t.rowClick},scopedSlots:t._u([{key:"action",fn:function(a){a.row;var n=a.index;return[t.editIndex===n?i("div",[i("Icon",{attrs:{type:"ios-pause"}})],1):i("Icon",{attrs:{type:"md-play"}})]}}])})],1),i("Affix",{style:{position:"absolute",bottom:"15px",left:0,width:"98%"},attrs:{"offset-bottom":20}},[t._v("> "),i("audio",{ref:"audio",on:{pause:t.pauseClick,play:t.playClick}})])],1)},e=[],o=(i("b0c0"),i("db8d")),s={name:"album",data:function(){return{album:{},artist:"",editIndex:-1,songs:[],columns1:[{type:"index",width:60,align:"center"},{title:"歌曲名称",key:"name"},{title:"播放",slot:"action",width:150,align:"center"}]}},created:function(){var t=this;Object(o["c"])(this.$route.query.id).then((function(a){200===a.data.code&&(t.album=a.data.album,t.artist=a.data.album.artist.name,t.songs=a.data.songs)}))},methods:{rowClick:function(t,a){var i=this;Object(o["v"])(t.id).then((function(t){200===t.data.code&&(i.src=t.data.data[0].url,i.$refs.audio.src=i.src,i.$refs.audio.controls=!0,-1===i.editIndex?(i.editIndex=a,i.$refs.audio.play()):(i.editIndex=-1,i.$refs.audio.pause()))}))},pauseClick:function(){this.editIndex=-1},playClick:function(){this.editIndex=0}}},c=s,r=(i("8e12"),i("2877")),u=Object(r["a"])(c,n,e,!1,null,"37abfd89",null);a["default"]=u.exports},"8e12":function(t,a,i){"use strict";i("398b")},b0c0:function(t,a,i){var n=i("83ab"),e=i("9bf2").f,o=Function.prototype,s=o.toString,c=/^\s*function ([^ (]*)/,r="name";n&&!(r in o)&&e(o,r,{configurable:!0,get:function(){try{return s.call(this).match(c)[1]}catch(t){return""}}})}}]);
//# sourceMappingURL=chunk-9f48e218.e8e75bf3.js.map