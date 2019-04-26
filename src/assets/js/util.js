// 公用方法

// 深拷贝一个Object
export function cloneObj(obj) {
  if (null == obj || "object" != typeof obj) return obj

  if (obj instanceof Date) {

    var copy = new Date()
    copy.setTime(obj.getTime())
    return copy
  }

  if (obj instanceof Array) {

    var copy = []
    for (var i = 0, len = obj.length; i < len; ++i) {
      copy[i] = cloneObj(obj[i])
    }
    return copy
  }

  if (obj instanceof Object) {

    var copy = {}
    for (var attr in obj) {
      if (obj.hasOwnProperty(attr)) copy[attr] = cloneObj(obj[attr])
    }
    return copy
  }

  throw new Error("Unable to copy obj! Its type isn't supported.")
}


// 清空对象数据
export function clearObjdata(obj) {
  let objdata = cloneObj(obj)
  for (var key in objdata) {
    objdata[key] = ""
  }
  return objdata
}


// 判断一个对象是否是空对象{}
export function isEmptyObject(obj) {
  for (var key in obj) {
    return false
  }
  return true
}



// 判断对象中任意一个属性有值，任意一个没有值
export function judgeObj(obj) {
  let flagEmpty = false, flagNoEmpty = false
  for(var key in obj) {
    if(obj[key] === '') {
      flagEmpty = true
    }
    if(obj[key] !== '') {
      flagNoEmpty = true
    }
  }  

  return flagEmpty && flagNoEmpty
}

// 各种时间转换为 YY/MM/DD 或 YY/MM/DD hh:mm
export function formatDate(date,isShowTime) {
  let dateformat = date !== undefined ? new Date(date) : new Date()
  var currentdate = ''
  var seperator1 = "-"
  var year = dateformat.getFullYear()
  var month = dateformat.getMonth() + 1
  var strDate = dateformat.getDate()
  var hour = dateformat.getHours()
  var minute = dateformat.getMinutes()
  var second = dateformat.getSeconds()
  
  if(isShowTime) {
    currentdate = year + seperator1 + toTwo(month) + seperator1 + toTwo(strDate) + ' ' + toTwo(hour) + ':' + toTwo(minute) + ':' + toTwo(second)
  } else {
    currentdate = year + seperator1 + toTwo(month) + seperator1 + toTwo(strDate)
  }

  return currentdate
}

// 数值在0~9之间的话，在前面加0
function toTwo(val) {
  return val >= 0 && val < 10 ? ('0' + val) : val
}


// 证件号显示（只显示前3位，后4位，中间用*代替）
export function formatIdCard(val) {
  let certificateNo = ''
  let star = '' 
  for(let i=0;i<val.length-7;i++) {
    star += '*'
  }
  certificateNo = val.substring(0,3) + star + val.substring(val.length-4,val.length)
  return certificateNo
}


// 获取比当前时间多出20分钟 
export function getLastTime() {
  var now = new Date()
  now.setMinutes(now.getMinutes() + 20)
  return now
}


// 获取url上的参数值
export function getUrlParam(url,flag) { 
  var paramObj = new Object()
  var index1,index2,str,strs

  index1 = url.indexOf('?')
  if (index1 != -1) { 
      
      // flag表示路径里是否带着#号,true表示有
      if(flag) {
        index2 = url.indexOf('#')
        str = url.substring(index1+1,index2)
      } else {
        str = url.substring(index1+1,url.length)
      }

      strs = str.split("&")

      strs.map(item=>{
        paramObj[item.split('=')[0]] = item.split('=')[1]
      })
  } 
  return paramObj
}


// 登录信息过期或者没有传递token
export function backToLogin(code,message) {
  // 显示错误信息

  // 返回登录页
  if( (code === '1002' && message.indexOf('请传递token') !== -1) || code === '1003' || code === '1004') {
    // removeLocalStorage('')
    setTimeout(() => {
      window.location.href = location.pathname
    }, 500) 
  }
}


// 图片旋转
export function rotateImg (img, direction,canvas) {
  //最小与最大旋转方向，图片旋转4次后回到原方向
  const min_step = 0
  const max_step = 3
  if (img == null) return;
  //img的高度和宽度不能在img元素隐藏后获取，否则会出错
  let height = img.height
  let width = img.width
  let step = 2
  if (step == null) {
      step = min_step
  }
  if (direction == 'right') {
      step++
      //旋转到原位置，即超过最大值
      step > max_step && (step = min_step)
  } else {
      step--
      step < min_step && (step = max_step)
  }
  //旋转角度以弧度值为参数
  let degree = step * 90 * Math.PI / 180
  let ctx = canvas.getContext('2d')
  switch (step) {
    case 0:
        canvas.width = width
        canvas.height = height
        ctx.drawImage(img, 0, 0)
        break;
    case 1:
        canvas.width = height
        canvas.height = width
        ctx.rotate(degree)
        ctx.drawImage(img, 0, -height)
        break;
    case 2:
        canvas.width = width
        canvas.height = height
        ctx.rotate(degree)
        ctx.drawImage(img, -width, -height)
        break;
    case 3:
        canvas.width = height
        canvas.height = width
        ctx.rotate(degree)
        ctx.drawImage(img, -width, 0)
        break;
  }
}

// 图片压缩
export function compress(img,Orientation) {
  let canvas = document.createElement("canvas")
  let ctx = canvas.getContext('2d')
  //瓦片canvas
  let tCanvas = document.createElement("canvas")
  let tctx = tCanvas.getContext("2d")
  let initSize = img.src.length
  let width = img.width
  let height = img.height
  //如果图片大于四百万像素，计算压缩比并将大小压至400万以下
  let ratio;
  if ((ratio = width * height / 4000000) > 1) {
    console.log("大于400万像素")
    ratio = Math.sqrt(ratio)
    width /= ratio 
    height /= ratio
  } else {
    ratio = 1
  }
  canvas.width = width
  canvas.height = height
  //铺底色
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  //如果图片像素大于100万则使用瓦片绘制
  let count;
  if ((count = width * height / 1000000) > 1) {
    console.log("超过100W像素")
    count = ~~(Math.sqrt(count) + 1) //计算要分成多少块瓦片
    //计算每块瓦片的宽和高 
    let nw = ~~(width / count)
    let nh = ~~(height / count)
    tCanvas.width = nw
    tCanvas.height = nh
    for (let i = 0; i < count; i++) {
      for (let j = 0; j < count; j++) {
        tctx.drawImage(img, i * nw * ratio, j * nh * ratio, nw * ratio, nh * ratio, 0, 0, nw, nh);
        ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh)
      }
    }
  } else {
    ctx.drawImage(img, 0, 0, width, height)
  } 
  // if (navigator.userAgent.match(/iphone/i)) {
    //修复ios上传图片的时候 被旋转的问题
    if(Orientation != "" && Orientation != 1){
      switch(Orientation){
        case 6://需要顺时针（向左）90度旋转 
            this.rotateImg(img,'left',canvas)
            break;
        case 8://需要逆时针（向右）90度旋转
            this.rotateImg(img,'right',canvas)
            break;
        case 3://需要180度旋转
            this.rotateImg(img,'right',canvas)//转两次
            this.rotateImg(img,'right',canvas)
            break;
      }
    // }
  }

  //进行最小压缩
  let ndata = canvas.toDataURL('image/jpeg', 0.1)
  console.log('压缩前：' + initSize)
  console.log('压缩后：' + ndata.length)
  console.log('压缩率：' + ~~(100 * (initSize - ndata.length) / initSize) + "%")
  tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0
  return ndata
}