'use strict';
import axios from 'axios';
import qs from 'qs';

export default {

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
      if (response.errno === 0) {
        return response;
      }
    });
  },
  get(url, params) {
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
      if (response.data.errno === 0) {
        return response.data;
      }
    });
  }
};
