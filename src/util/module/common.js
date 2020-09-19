/*
 * @Desc: 
 * @Date: 2020-02-07 21:45:18
 * @LastEditors: Nice
 * @LastEditTime: 2020-07-29 21:39:25
 */
export function getAutoParams(opts) {
  let res = {};
  let { keys, obj, cb } = opts;
  keys.forEach(x => {
    if (x) {
      res[`${obj}.${x}`] = cb;
    }
  });
  return res;
}

// 复制
export function handleCopy(name,text) {
  var oInput = document.createElement("input");
  oInput.value = name;
  document.body.appendChild(oInput);
  oInput.select(); // 选择对象
  document.execCommand("Copy"); // 执行浏览器复制命令
  oInput.className = "oInput";
  oInput.style.display = "none";
  if (oInput.value) {
    this.$message.info(`复制${text}：${name} 成功！`);
    oInput.parentNode.removeChild(oInput);
  }
}

// 检测中英文长度字符
export function getStrLength(str){
  var len = 0;
  for (var i=0; i<str.length; i++) {
   var c = str.charCodeAt(i);
  //单字节加1
   if ((c >= 0x0001 && c <= 0x007e) || (0xff60<=c && c<=0xff9f)) {
     len++;
   }
   else {
    len+=2;
   }
  }
  return len;
}