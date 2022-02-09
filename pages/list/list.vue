<template>
	<view class="list" v-if="!isLoading">
		<view  class="fixbg" :style="{'background': 'url('+playlist.coverImgUrl+')'}">
		</view>
		<!-- <view class="fixbg" :style="{'baclground':'url('+bgImg+')'}"></view> -->
		<musichead title="歌单" :icon="true" color="white"></musichead>
		<view class="container" v-show="!isLoading">
			<scroll-view scroll-y="true">
				<view class="list-head">
					<view class="list-head-img">
						<image :src="playlist.coverImgUrl" mode=""></image>
						<text class="iconfont">&#xe629;{{playlist.playCount | formatCount}}</text>
					</view>
					<view class="list-head-text">
						<view>{{playlist.name}}</view>
						<view v-if="playlist.creator">
							<image :src="playlist.creator.avatarUrl" mode=""></image>
							{{playlist.name}}
						</view>
						<view>
							{{playlist.description}}
						</view>
					</view>
				</view>
				<!-- #ifdef MP-WEIXIN -->
				<button open-type="share" class="list-share">
					<text class="iconfont">&#xe624;</text>分享给微信好友
					' </button>
				<!-- #endif -->
				<view class="list-music">
					<view class="list-music-head">
						<text class="iconfont">&#xe625;</text>
						<text>播放全部</text>
						<text>(共{{playlist.trackCount}}首)</text>
					</view>
					<view @tap="handleToDetail(item.id)" class="list-music-item" v-for="(item,index) in playlist.tracks" :key="index">
						<view class="list-music-top">
							{{index+1}}
						</view>
						<view class="list-music-song">
							<view>{{item.name}}</view>
							<view>
								<image v-if="privileges[index].flag > 60 &&privileges[index].flag < 70"
									src="../../static/dujia.png" mode=""></image>
								<image v-if="privileges[index].maxbr == 999000" src="../../static/sq.png" mode="">
								</image>
								{{item.ar[0].name}} - {{item.al.name}}
							</view>
						</view>
						<text class="iconfont">&#xe625;</text>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import musichead from "../../components/musichead/musichead.vue"
	import {
		list
	} from '../../common/api.js'
	export default {
		data() {
			return {
				playlist: {},
				privileges: [],
				isLoading:true,
				bgImg:""
			}
		},
		methods: {
			handleToDetail(songId){
				console.log("歌曲ID",songId);
				uni.navigateTo({
					url:'/pages/detail/detail?songId=' + songId
				})
			}
		},
		onLoad(options) {
			uni.showLoading({
				title:'加载中...'
			});
			console.log("传参值为", options.listId)
			list(options.listId).then((res) => {
				if (res[1].data.code == '200') {
					this.playlist = res[1].data.playlist
					this.privileges = res[1].data.privileges;
					this.bgImg=res[1].data.playlist.coverImgUrl;
					// console.log(this.$store.commit("INIT_TOPLISTIDS",res[1].data.playlist))
					this.$store.commit("INIT_TOPLISTIDS",res[1].data.playlist.trackIds);
					this.isLoading=false;
					uni.hideLoading();
				}
				// console.log(this.bgImg)
			});
		},
		components: {
			musichead
		}
	}
</script>

<style scoped>
	.list-head {
		display: flex;
		margin: 30rpx;
	}

	.list-head-img {
		width: 264rpx;
		min-width: 250rpx;
		height: 264rpx;
		border-radius: 30rpx;
		overflow: hidden;
		position: relative;
		margin-right: 42rpx;
	}

	.list-head-img image {
		width: 100%;
		height: 100%;
	}

	.list-head-img text {
		position: absolute;
		right: 8rpx;
		top: 8rpx;
		color: white;
		font-size: 26rpx;
	}

	.list-head-text {
		flex: 1;
		color: #f0f2f7;
	}

	.list-head-text view:nth-child(1) {
		color: white;
		font-size: 34rpx;
	}

	.list-head-text view:nth-child(2) {
		display: flex;
		margin: 20rpx 0;
		font-size: 24rpx;
		align-items: center;
	}

	.list-head-text view:nth-child(2) image {
		width: 54rpx;
		height: 54rpx;
		border-radius: 50%;
		margin-right: 14rpx;
	}

	.list-head-text view:nth-child(3) {
		line-height: 34rpx;
		font-size: 22rpx;
		word-break: break-all;
		max-width: 200px;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		/* 行数 */
		-webkit-box-orient: vertical;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.list-share {
		width: 330rpx;
		height: 74rpx;
		margin: 0 auto;
		background: rgba(0, 0, 0, .4);
		border-radius: 37rpx;
		color: white;
		text-align: center;
		line-height: 74rpx;
		font-size: 28rpx;
	}

	.lsit-share text {
		margin-right: 16rpx;
	}

	.list-music {
		background: white;
		border-radius: 50rpx;
		margin-top: 40rpx;
		overflow: hidden;
	}

	.list-music-head {
		height: 50rpx;
		margin: 30rpx 0 70rpx 22rpx;
	}

	.list-music-head text:nth-child(1) {
		height: 50rpx;
		font-size: 50rpx;
	}

	.list-music-head text:nth-child(2) {
		font-size: 30rpx;
		margin: 0 10rpx 0 26rpx;
	}

	.list-music-head text:nth-child(3) {
		font-size: 26rpx;
		color: #b2b2b2;
	}

	.list-music-item {
		display: flex;
		margin: 0 32rpx 66rpx 46rpx;
		align-items: center;
		color: #959595;
	}

	.list-music-top {
		width: 58rpx;
		font-size: 30rpx;
		line-height: 30rpx;
	}

	.list-music-song {
		flex: 1;
	}

	.list-music-song view:nth-child(1) {
		font-size: 28rpx;
		color: black;
		width: 70vw;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.list-music-song view:nth-child(2) {
		font-size: 20rpx;
		align-items: center;
		width: 70vw;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.list-music-song view:nth-child(2) image {
		width: 32rpx;
		height: 20rpx;
		margin-right: 10rpx;
	}

	.list-music-item text {
		font-size: 50rpx;
		color: #c7c7c7;
	}
</style>
