
console.log(Math.floor(1.2))  // 取整数部分

console.log(Math.round(4.3))  // 四舍五入

console.log(Math.ceil(5.1))   // 对于或等于的最小整数 



// 获取78-99之间的随机数
function getRandomNum(min,max) {
    let differ,RandomNum;
    differ = max - min
    RandomNum = Math.random()
    return (min + Math.round(RandomNum * differ))
}

console.log(getRandomNum(0,9))

