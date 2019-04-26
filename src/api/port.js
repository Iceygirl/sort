// 后台接口

import { ajax } from './axios'


export function getInfo(data) {

  let url = ''
 
  return ajax(url,data)
} 

