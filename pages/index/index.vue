<template>
	<view class="index">
		<musichead title="网易云音乐" :icon="false"></musichead>
		<view class="container">
			<scroll-view scroll-y="true">
				<view class="index-search" @tap="handleToSearch">
					<text class="iconfont">&#xe60c;</text>
					<input type="text" placeholder="搜索歌曲">
				</view>
				<view class="index-list">
					<view @tap="handleToList(item.id)" class="index-list-item" v-for="(item,index) in topList" :key="item.id">
						<view class="index-list-img">
							<image :src="item.coverImgUrl" mode=""></image>
							<text>{{item.updateFrequency}}</text>
						</view>
						<view class="index-list-textbox">
							<view class="index-list-text" v-for="(item,index) in item.tracks" :key="index">
									<view>{{index+1}}.{{item.first}} - {{item.second}}</view>
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	// import '@/common/iconfont.css'
	import musichead from "../../components/musichead/musichead.vue"
	import {topList} from '../../common/api.js'
	export default {
		data() {
			return {
			topList:[]
			}
		},
		onLoad() {
			// uni.showLoading({
			// 	title:'加载中...'
			// });
			topList().then((res)=>{
				console.log("首页音乐排行棒列表",res);
				if(res.length){
					this.topList=res
				}
				uni.hideLoading();
			});
		},
		components: {
			musichead
		},
		methods: {
			handleToList(listId){
				// console.log(listId)
				uni.navigateTo({
					url:'/pages/list/list?listId=' + listId
				})
			},
			handleToSearch(){
				uni.navigateTo({
					url:'/pages/search/search'
				})
			}
		}
	}
</script>

<style>
	.index-search {
		display: flex;
		align-items: center;
		height: 70rpx;
		margin: 30rpx 30rpx 30rpx 30rpx;
		background-color: #f7f7f7;
		border-radius: 50rpx;
	}

	.index-search text {
		font-size: 26rpx;
		margin-right: 26rpx;
		margin-left: 28rpx;
	}

	.index-search input {
		font-size: 28rpx;
		flex: 1;
	}

	.index-list {
		margin: 0 30rpx;
	}

	.index-list-item {
		display: flex;
		margin-bottom: 34rpx;
	}

	.index-list-img {
		width: 215rpx;	
		min-width:215rpx;
		height: 215rpx;
		position: relative;
		border-radius: 30rpx;
		overflow: hidden;
		margin-right: 22rpx;
		
	}

	.index-list-img image {
		width: 100%;
		height: 100%;
	}

	.index-list-img text {
		position: absolute;
		left: 12rpx;
		bottom: 16rpx;
		color: white;
		font-size: 20rpx;
	}
	.index-list-textbox{
		flex: 1;
	}
	.index-list-text {
		font-size: 24rpx;
		line-height: 66rpx;
		width: 100%;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
</style>
