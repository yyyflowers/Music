(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7f38528a"],{1148:function(t,i,e){"use strict";var n=e("a691"),r=e("577e"),a=e("1d80");t.exports=function(t){var i=r(a(this)),e="",o=n(t);if(o<0||o==1/0)throw RangeError("Wrong number of repetitions");for(;o>0;(o>>>=1)&&(i+=i))1&o&&(e+=i);return e}},2424:function(t,i,e){"use strict";e("656f")},"408a":function(t,i,e){var n=e("c6b6");t.exports=function(t){if("number"!=typeof t&&"Number"!=n(t))throw TypeError("Incorrect invocation");return+t}},"656f":function(t,i,e){},"893c":function(t,i,e){"use strict";e.r(i);var n=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",[e("div",{staticClass:"profile-head"},[e("img",{attrs:{src:t.artist.cover,alt:""}}),e("div",[e("div",[t._v(t._s(t.artist.name))]),e("div",[e("Icon",{attrs:{type:"md-headset"}}),t._v("单曲数: "+t._s(t.artist.musicSize))],1),e("div",[e("Icon",{attrs:{type:"ios-film"}}),t._v("专辑数:"+t._s(t.artist.albumSize))],1),e("div",[e("Icon",{attrs:{type:"ios-videocam"}}),t._v("MV数:"+t._s(t.artist.mvSize))],1)])]),e("div",{staticClass:"profile-body"},[e("Tabs",{attrs:{value:"name1"},on:{"on-click":t.tabclick}},[e("TabPane",{attrs:{label:"专辑",name:"name1"}},[t._v(" 按发行时间排序: "),e("Table",{attrs:{stripe:"",columns:t.columns1,data:t.hotAlbums},on:{"on-row-click":t.rowClick}})],1),e("TabPane",{attrs:{label:"MV",name:"name2"}},[e("Row",t._l(t.MVs,(function(i,n){return e("Col",{key:n,attrs:{span:"6"}},[e("div",{staticClass:"ImgBox",staticStyle:{position:"relative"}},[e("Icon",{staticClass:"icon",attrs:{type:"logo-youtube",size:"30",color:"#5292fe"},on:{click:function(e){return t.iconClick(i)}}}),e("img",{staticClass:"MVimg",attrs:{src:i.imgurl,alt:""}})],1),e("p",{staticStyle:{width:"150px",overflow:"hidden","text-overflow":"ellipsis","white-space":"nowrap",color:"#000000"}},[t._v(t._s(i.name))]),e("div",{staticStyle:{"margin-bottom":"20px"}},[e("span",{staticStyle:{"margin-right":"20px"}},[e("Icon",{attrs:{type:"ios-videocam-outline"}}),t._v(t._s(t._f("showCount")(i.playCount)))],1),e("span",[t._v(t._s(i.publishTime))])])])})),1)],1),e("TabPane",{attrs:{label:"歌手详情",name:"name3"}},[e("div",{staticStyle:{"font-size":"20px",color:"#000000","margin-bottom":"10px"}},[t._v("歌手简介")]),e("p",{staticStyle:{color:"#333333","margin-bottom":"20px"}},[t._v(t._s(t.briefDesc))]),e("Timeline",t._l(t.introduction,(function(i,n){return e("TimelineItem",{key:n},[e("p",{staticClass:"time"},[t._v(t._s(i.ti))]),e("p",{staticClass:"content"},[t._v(t._s(i.txt))])])})),1)],1),e("TabPane",{attrs:{label:"相似歌手",name:"name4"}},[e("Row",[t._l(t.simiArtist,(function(i,n){return e("Col",{key:n,attrs:{span:"6"}},[e("Card",{attrs:{"dis-hover":"",to:"/profile?id="+i.id}},[e("img",{staticStyle:{width:"200px",height:"130px"},attrs:{src:i.picUrl,alt:""}}),e("p",{staticStyle:{"text-align":"center"}},[t._v(" "+t._s(i.name)+" "),e("Icon",{attrs:{type:"md-person"}})],1)])],1)})),t.spinShow?e("Spin",{attrs:{size:"large",fix:""}}):t._e()],2)],1)],1)],1)])},r=[],a=(e("b680"),e("db8d")),o={name:"profile",data:function(){return{artist:{},briefDesc:"",introduction:[],simiArtist:[],spinShow:!1,MVs:[],hotAlbums:[],columns1:[{title:"封面",key:"picUrl",render:function(t,i){return t("img",{attrs:{src:i.row.picUrl},style:{width:"100px",height:"100px"}})}},{title:"专辑名",key:"name"},{title:"发行时间",key:"publishTime",width:160,render:function(t,i){return t("div",new Date(i.row.publishTime).toLocaleDateString())}}]}},created:function(){var t=this;Object(a["f"])(this.$route.query.id).then((function(i){200===i.data.code&&(t.artist=i.data.data.artist,t.briefDesc=i.data.data.artist.briefDesc)})),Object(a["d"])(this.$route.query.id).then((function(i){200===i.data.code&&(t.hotAlbums=i.data.hotAlbums)}))},methods:{tabclick:function(t){var i=this;"name3"===t?Object(a["e"])(this.$route.query.id).then((function(t){200===t.data.code&&(i.introduction=t.data.introduction,i.hotAlbums=[],i.simiArtist=[],i.MVs=[])})):"name1"===t?Object(a["d"])(this.$route.query.id).then((function(t){200===t.data.code&&(i.hotAlbums=t.data.hotAlbums)})):"name4"===t?Object(a["t"])(this.$route.query.id).then((function(t){200===t.data.code&&(i.simiArtist=t.data.artists,i.hotAlbums=[],i.briefDesc="",i.introduction=[])})):"name2"===t&&Object(a["h"])(this.$route.query.id).then((function(t){200===t.data.code&&(i.MVs=t.data.mvs,i.hotAlbums=[],i.simiArtist=[],i.briefDesc="",i.introduction=[])}))},rowClick:function(t){this.$router.push("/album?id="+t.id)},iconClick:function(t){this.$router.push("/video?id="+t.id)}},filters:{showDate:function(t){var i=new Date(t);return i.getFullYear()+"-"+(i.getMonth()+1)+"-"+i.getDay()},showCount:function(t){return t>=1e4&&t<=1e8?(t/=1e4,t.toFixed(1)+"万"):t>1e8?(t/=1e8,t.toFixed(1)+"亿"):t}}},s=o,c=(e("2424"),e("2877")),l=Object(c["a"])(s,n,r,!1,null,"6611dcc9",null);i["default"]=l.exports},b680:function(t,i,e){"use strict";var n=e("23e7"),r=e("a691"),a=e("408a"),o=e("1148"),s=e("d039"),c=1..toFixed,l=Math.floor,u=function(t,i,e){return 0===i?e:i%2===1?u(t,i-1,e*t):u(t*t,i/2,e)},d=function(t){var i=0,e=t;while(e>=4096)i+=12,e/=4096;while(e>=2)i+=1,e/=2;return i},f=function(t,i,e){var n=-1,r=e;while(++n<6)r+=i*t[n],t[n]=r%1e7,r=l(r/1e7)},m=function(t,i){var e=6,n=0;while(--e>=0)n+=t[e],t[e]=l(n/i),n=n%i*1e7},h=function(t){var i=6,e="";while(--i>=0)if(""!==e||0===i||0!==t[i]){var n=String(t[i]);e=""===e?n:e+o.call("0",7-n.length)+n}return e},p=c&&("0.000"!==8e-5.toFixed(3)||"1"!==.9.toFixed(0)||"1.25"!==1.255.toFixed(2)||"1000000000000000128"!==(0xde0b6b3a7640080).toFixed(0))||!s((function(){c.call({})}));n({target:"Number",proto:!0,forced:p},{toFixed:function(t){var i,e,n,s,c=a(this),l=r(t),p=[0,0,0,0,0,0],b="",v="0";if(l<0||l>20)throw RangeError("Incorrect fraction digits");if(c!=c)return"NaN";if(c<=-1e21||c>=1e21)return String(c);if(c<0&&(b="-",c=-c),c>1e-21)if(i=d(c*u(2,69,1))-69,e=i<0?c*u(2,-i,1):c/u(2,i,1),e*=4503599627370496,i=52-i,i>0){f(p,0,e),n=l;while(n>=7)f(p,1e7,0),n-=7;f(p,u(10,n,1),0),n=i-1;while(n>=23)m(p,1<<23),n-=23;m(p,1<<n),f(p,1,1),m(p,2),v=h(p)}else f(p,0,e),f(p,1<<-i,0),v=h(p)+o.call("0",l);return l>0?(s=v.length,v=b+(s<=l?"0."+o.call("0",l-s)+v:v.slice(0,s-l)+"."+v.slice(s-l))):v=b+v,v}})}}]);
//# sourceMappingURL=chunk-7f38528a.b870f4f1.js.map