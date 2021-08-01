interface Iprops{
  cb:()=>void}

const UseHistorySubscribe = (props:Iprops) =>{

  const {cb} =props;
    const getParameterByName =(name, url?) => {
    if (!url) {
        url = window.location.href;
    }
   
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}


function wrapState(action) {
  // 获取原始定义
  let raw = history[action];
  return function () {

      // 经过包装的pushState或replaceState
      let wrapper = raw.apply(this, arguments);

      // 定义名为action的事件
      let e = new Event(action);

      // 将调用pushState或replaceState时的参数作为stateInfo属性放到事件参数event上
      e.stateInfo = {...arguments};
      // 调用pushState或replaceState时触发该事件
      window.dispatchEvent(e);
      return wrapper;
  }
}
history.replaceState = wrapState("replaceState");
window.addEventListener("replaceState", function (e) {
  console.info("replaceState",e.stateInfo);
  cb && cb()
})

return {getParameterByName}
}

export default UseHistorySubscribe
