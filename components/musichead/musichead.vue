<template>
	<view class="music-head" :style="{color:color}">
		<view v-if="icon" class="music-head-icon" :class="{'music-head-iconblack' : iconblack}">
			<text class="iconfont" @tap="handleToBack">&#xe660;</text> | <text class="iconfont" @tap="handleToHome">&#xe62e;</text>
		</view>
		{{title}}
	</view>
</template>

<script>
	export default {
		name:"musichead",
		data() {
			return {
				
			};
		},
		props:["title",'icon','color','iconblack'],
		methods:{
			handleToBack(){
				uni.navigateBack();
			},
			handleToHome(){
				uni.navigateTo({
					url:"/pages/index/index"
				})
			}
		}
	}
</script>

<style scoped>
	.music-head{
		width: 100%;
		height: 75px;
		font-size: 16px;
		line-height: 75px;
		text-align: center;
		color: block;
		position: relative;
	}
	.music-head-icon{
		position: absolute;
		left: 8px;
		top: 23px;
		width: 90px;
		height: 30px;
		background: rgba(0,0,0,.4);
		color: white;
		line-height: 30px;
		border-radius: 15px;
		display: flex;
		justify-content: space-evenly;
	}
	.music-head-iconblack{
		color: #000000;
		border: 1px #EAEAEA solid;
		font-weight: 1000;
	}
</style>
