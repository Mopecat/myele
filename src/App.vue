<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <div class="tab border-1px">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import header from './components/header/header.vue';
  import axios from 'axios';
  import qs from 'qs';
  export default {
    data() {
      return {
        seller: {}
      };
    },
    created() {
      this.fetchData();
    },
    components: {
      'v-header': header
    },
    methods: {
       fetchData: async function() {
        const seller = await this.get('/api/seller');
        this.seller = seller.data;
        console.log(this.seller);
       },
      post(url, data) {
        return axios({
          methods: 'post',
          baseURL: '', // 设置请求基础url
          url, // 相对url
          data: qs.stringify(data), // 用qs库序列化数据
          timeout: 5000, // 设置超时时间
          headers: { // 设置请求头部
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
          }
        }).then((response) => {
          if (response.errn === 0) {
            return response;
          }
        });
      },
      get (url, params) {
        return axios({
          methods: 'get',
          baseURL: '',
          url,
          params, // get请求时带的参数
          timeout: 5000,
          headers: {
            'X-Requested-With': 'XMLHttpRequest'
          }
        }).then((response) => {
          if (response.data.errn === 0) {
            return response.data;
          }
        });
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "./common/stylus/mixin.styl"

  #app
    .tab
      display flex
      width 100%
      height 40px
      line-height 40px
      border-1px(rgba(7,17,27,0.1))
      .tab-item
        flex 1
        text-align center
        & > a
          display: block
          font-size: 14px
          color: rgb(77,85,93)
          &.active
            color: rgb(240,20,20)
</style>
