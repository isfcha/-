import { baseUrl } from "./config.js"
//获取榜单 http://localhost:3000/toplist/detail
export function topList(){
	// let listIds=['19723756','3779629','2884035','3778678'];
	return new Promise(function(reslove,reject){
		uni.request({
			url:`${baseUrl}/toplist/detail`,
			method:'GET',
			data:{},
			success: res => {
				let result =res.data.list
				result.length=4;
				// for(var i=0;i<listIds.length;i++){
				// 	result[i].listId=listIds[i]
				// }
				reslove(result)
				console.log("成功",result);
			},
			fail: fil => {
				console.log("失败",fil);
			},
			complete: () => {}
		});
	});
}
//获取榜单详情歌曲  http://localhost:3000/playlist/detail?id=
export function list(listId){
	return uni.request({
		url:`${baseUrl}/playlist/detail?id=${listId}`,
		method:"GET"
	})
}
//获取歌曲详情   http://localhost:3000/song/detail?ids=1914696104
export function songDetail(songId){
	return uni.request({
		url:`${baseUrl}/song/detail?ids=${songId}`,
		method:"GET"
	})
}
//获取相似歌单 http://localhost:3000/simi/song?id=1914696104
export function songSimi(songId){
	return uni.request({
		url:`${baseUrl}/simi/song?id=${songId}`,
		method:"GET"
	})
}
//获取歌单评论  http://localhost:3000/comment/music?id=1914696104
export function songComment(songId){
	return uni.request({
		url:`${baseUrl}/comment/music?id=${songId}`,
		method:"GET"
	})
}
//获取歌词  http://localhost:3000/lyric?id=1914696104
export function songLyric(songId){
	return uni.request({
		url:`${baseUrl}/lyric?id=${songId}`,
		method:"GET"
	})
}
//获取歌曲url  http://localhost:3000/song/url?id=1914696104
export function songUrl(songId){
	return uni.request({
		url:`${baseUrl}/song/url?id=${songId}`,
		method:"GET"
	})
}

//获取热搜列表  http://localhost:3000/search/hot
export function searchHot(){
	return uni.request({
		url:`${baseUrl}/search/hot/detail`,
		method:"GET"
	})
}

//搜索  http://localhost:3000/cloudsearch?keywords=海阔天空
export function searchWord(word){
	return uni.request({
		url:`${baseUrl}/cloudsearch?keywords=${word}`,
		method:"GET"
	})
}

//搜索  http://localhost:3000/search/suggest?keywords=海阔天空&type=mobile
export function searchSuggest(word){
	return uni.request({
		url:`${baseUrl}/search/suggest?keywords=${word}&type=mobile`,
		method:"GET"
	})
}