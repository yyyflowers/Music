import {request} from './request'

export function Hot(){
    return request({
        url:"/playlist/hot",
    })
}
// 分类歌单推荐
export function getPlaylist(cat){
    return request({
        url:"/top/playlist",
        params: {
            cat
        }
    })
}
//  歌单详情
export function getPlaylistDetail(id){
    return request({
        url:"/playlist/detail",
        params: {
            id
        }
    })
}
export function getSongDetail(ids){
    return request({
        url:"song/detail",
        params: {
            ids
        }
    })
}
// 歌单收藏者
export function getPlaylistSub(id){
    return request({
        url:"/playlist/subscribers",
        params: {
            id
        }
    })
}
// 歌单评论
export function getPlaylistComment(id){
    return request({
        url:"/comment/playlist",
        params: {
            id
        }
    })
}
// 获得歌曲URL
export function getSongURL(id){
    return request({
        url:"/song/url",
        params: {
            id
        }
    })
}
// 歌手分类列表
export function getArtistList(area,type,initial){
    return request({
        url:"/artist/list",
        params: {
            area,
            type,
            initial
        }
    })
}
// 获取歌手详情
export function getArtistDetail(id){
    return request({
        url:"/artist/detail",
        params: {
            id
        }
    })
}
// 获取歌手专辑
export function getArtistAlbum(id){
    return request({
        url:"/artist/album",
        params: {
            id
        }
    })
}
// 获取歌手详情
export function getArtistDesc(id){
    return request({
        url:"/artist/desc",
        params: {
            id
        }
    })
}
// 获取相似歌手
export function getSimiArtist(id){
    return request({
        url:"/simi/artist",
        params: {
            id
        }
    })
}
// 获取相似歌手
export function getArtistMV(id){
    return request({
        url:"/artist/mv",
        params: {
            id
        }
    })
}
// 获取专辑内容
export function getAlbum(id){
    return request({
        url:"/album",
        params: {
            id
        }
    })
}
// 获取电台banner
export function getDjBanner(id){
    return request({
        url:"/dj/banner",
    })
}
// 获取电台个性推荐
export function getDjRecommend(id){
    return request({
        url:"/dj/recommend",
    })
}
// 电台 - 详情
export function getDjDetail(rid) {
    return request({
        url: "/dj/detail",
        params:{
            rid,
        }
    })
}
// 电台 - 节目
export function getDjProgram(rid) {
    return request({
        url: "/dj/program",
        params:{
            rid,
        }
    })
}
// 电台 - 节目详情
export function getProgramDetail(id) {
    return request({
        url: "/dj/program/detail",
        params:{
            id,
        }
    })
}
// 所有榜单
export function Toplist() {
    return request({
        url: "/toplist",
    })
}
// 点击回车展示搜索结果
export function getSearch(word) {
    return request({
        url: "/search",
        params: {
            keywords: word
        }
    })
}
// 搜索提示
export function getSearchSuggest(word) {
    return request ({
        url: "/search/suggest",
        params: {
            keywords: word
        }
    })
}
// mv 地址
export function getMvUrl(id) {
    return request({
        url: "/mv/url",
        params:{
            id,
        }
    })
}
