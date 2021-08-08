# [react-better-scroll](https://github.com/zoyopo/react-better-scroll)

> A react Component based on [better-scroll](https://github.com/ustbhuangyi/better-scroll) and inspired by [vue-better-scroll](https://github.com/huangjincq/vue-better-scroll)

> 最近我司很多前端小伙伴被移动端的滚动所困扰，原生滚动 bug 颇多，于是对 better-scroll 进行 react 化实现，希望能有所帮助。

# 为什么选择 better-scroll

1. css 动画滚动代替原生滚动，有效避免原生滚动的坑
2. fancy 的滚动效果，更好的用户体验
3. 丰富的事件/钩子体系，满足更多场景和需求
4. 维护时间较久，版本较为稳定

# 为什么使用 react 再次实现

1. better-scroll 本身是个纯 js 库，技术栈无关
2. 原本的命令式调用组件化，降低使用复杂
3. 更友好的 react 使用路径
4. 在组件中内聚一些符合场景需要的交互（比如上拉加载，下拉刷新），亦可复写

# 下一步计划

1. 更多场景扩展（增加易用性）
2. 更友好的接口

# Example

[demo page](https://zoyopo.github.io/react-better-scroll-demo-page/)

# 滚动原理

由于 better-scroll 的滚动原理为：在滚动方向上，第一个子元素的长度超过了容器的长度。

那么对于 Scroll 组件，其实就是内容元素 .list-content 在滚动方向上的长度必须大于容器元素 .wrapper。

任何时候如果出现无法滚动的情况，都应该首先查看内容元素 .list-content 的元素高度/宽度是否大于容器元素 .wrapper 的高度/宽度。这是内容能够滚动的前提条件。如果内容存在图片的情况，可能会出现 DOM 元素渲染时图片还未下载，因此内容元素的高度小于预期，出现滚动不正常的情况。此时你应该在图片加载完成后，比如 onload 事件回调中，手动调用 vue-better-scroll 组件的 refresh() 方法，它会重新计算滚动距离。

# Use Setup

### Install react-better-scroll

```javascript
yarn add react-with-better-scroll
// or
npm install react-with-better-scroll -s
```

### Use in SPA

#### 使用注意

因为内部滚动容器高度为 100%，继承`父容器高度`，使用时要给予 该组件 `父级容器` 你`期望的高度`，否则会导致无法滚动，因为我这里 html body 等父级容器都是 100%，故直接设置`.container{height:100%}`

1. 简单滚动

   ![async](/example/image/simple.gif)

```tsx
import { BetterScrollList } from '../../../dist';
import React = require('react');
import './index.css';

const BetterScrollPage = () => {
  return (
    <div className="container">
      <div className="navbar">导航栏</div>
      <BetterScrollList>
        <ul>
          {new Array(20).fill(1).map((item, index) => (
            <li className="item">{index}</li>
          ))}
        </ul>
      </BetterScrollList>
    </div>
  );
};

export default BetterScrollPage;
```

index.css

```css
ul {
  margin: 0;
  padding: 0;
}
body,
html,
#root {
  height: 100%;
}
body {
  margin: 0;
}
.item {
  height: 140px;
  text-align: center;
  background-color: rgba(216, 145, 117, 0.678);
  border: 1px solid rgb(15, 235, 125);
  line-height: 140px;
  color: #eee;
}
.item:not(:last-child) {
  border-bottom: none;
}

.container {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.navbar {
  padding: 20px;
  text-align: center;
  font-size: 24px;
  background-color: rgba(204, 238, 228, 0.541);
}
```

2. 异步数据滚动

![async](/example/image/async.gif)

```tsx
import { BetterScrollList } from '../../../dist';
import { useEffect, useRef, useState } from 'react';
import React = require('react');
import './index.css';

const BetterScrollPage = () => {
  const bsListInstance = useRef<any>();
  const pageNo = useRef(1);
  const pageSize = useRef(10);
  const [items, setItems] = useState([]);

  useEffect(() => {
    onPullingDown();
    return () => {};
  }, []);

  const getMockDataFromServer = () => {
    const dataSource = new Array(45).fill(1);
    return dataSource;
  };
  const getDataByPagination = pagaination => {
    const { pageNo, pageSize } = pagaination;
    const data = getMockDataFromServer();
    return data.slice(pageSize * (pageNo - 1), pageSize * pageNo);
  };

  const onPullingUp = () => {
    // 模拟上拉 加载更多数据
    console.log('上拉加载');
    getData().then((res: []) => {
      console.log('res', res);
      setItems(prev => prev.concat(res));
      //  this.items = this.items.concat(res)
      if (res.length < 10) {
        console.log('to end');
        bsListInstance.current.forceUpdate(false);
      } else {
        bsListInstance.current.forceUpdate(true);
      }
    });
  };

  const onPullingDown = () => {
    // 模拟下拉刷新
    console.log('下拉刷新');
    pageNo.current = 1;
    getData().then(res => {
      setItems(res as []);
      bsListInstance.current.forceUpdate(true);
    });
  };
  // 模拟数据请求
  const getData = () => {
    return new Promise(resolve => {
      setTimeout(() => {
        const arr: number[] = getDataByPagination({
          pageNo: pageNo.current,
          pageSize: pageSize.current,
        });
        pageNo.current++;
        resolve(arr);
      }, 1000);
    });
  };
  return (
    <div className="container">
      <div className="navbar">导航栏</div>
      <BetterScrollList
        bscrollListRef={bsListInstance}
        scrollbar={{ fade: true }}
        pullDownRefresh={{
          threshold: 90,
          stop: 40,
        }}
        pullUpLoad={{
          threshold: 0,
          txt: {
            more: '加载更多',
            noMore: '没有更多数据了',
          },
        }}
        onPullingUp={onPullingUp}
        onPullingDown={onPullingDown}
      >
        <ul>
          {items.map((item, index) => (
            <li className="item">{index}</li>
          ))}
        </ul>
      </BetterScrollList>
    </div>
  );
};

export default BetterScrollPage;
```

index.css

```css
ul {
  margin: 0;
  padding: 0;
}
body,
html,
#root {
  height: 100%;
}
body {
  margin: 0;
}
.item {
  height: 140px;
  text-align: center;
  background-color: rgba(216, 145, 117, 0.678);
  border: 1px solid rgb(15, 235, 125);
  line-height: 140px;
  color: #eee;
}
.item:not(:last-child) {
  border-bottom: none;
}

.container {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.navbar {
  padding: 20px;
  text-align: center;
  font-size: 24px;
  background-color: rgba(204, 238, 228, 0.541);
}
```

3. 异步下拉刷新组件自定义

![examplePulldown](/example/image/exampleCustomPulldown.gif)

```tsx
const PullDownComponent = props => {
  const { beforePullDown, isPulling, reachRefreshRegion } = props;

  return (
    <div className="PullDownComponent">
      {beforePullDown ? (
        reachRefreshRegion ? (
          <div>松开加载</div>
        ) : (
          <div>下拉加载</div>
        )
      ) : (
        <>{isPulling ? <div>加载中</div> : <div>刷新成功</div>}</>
      )}
    </div>
  );
};
return (
  <div className="container">
    <div className="navbar">导航栏</div>
    <BetterScrollList
      bscrollListRef={bsListInstance}
      scrollbar={{ fade: true }}
      PullDownElement={PullDownComponent}
      onPullingUp={onPullingUp}
      onPullingDown={onPullingDown}
    >
      <ul>
        {items.map((item, index) => (
          <li className="item">{index}</li>
        ))}
      </ul>
    </BetterScrollList>
  </div>
);
```

### Attributes:

| 参数               | 说明                                                                                                                                                               | 类型              | 可选值                                                                | 默认值 |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------- | --------------------------------------------------------------------- | ------ |
| probeType          | 派发 scroll 事件的条件                                                                                                                                             | Number            | 1、2、3                                                               | 1      |
| click              | better-scroll 会派发一个 click 事件                                                                                                                                | Boolean           |                                                                       | true   |
| listenScroll       | 是否监听滚动，开启后才能派发 scroll 事件                                                                                                                           | Boolean           |                                                                       | false  |
| listenBeforeScroll | 是否监听滚动之前，开启后才能派发 before-scroll-start 事件                                                                                                          | Boolean           |                                                                       | false  |
| scrollbar          | 这个配置可以开启滚动条。当设置为 true 或者是一个 Object 的时候，都会开启滚动条，默认是会 fade 的                                                                   | Boolean or Object | {fade: true},                                                         | false  |
| pullDownRefresh    | 这个配置用于做下拉刷新功能。当设置为 true 或者是一个 Object 的时候，可以开启下拉刷新，可以配置顶部下拉的距离（threshold） 来决定刷新时机以及回弹停留的距离（stop） | Boolean or Object | {threshold: 90,stop: 40},                                             | false  |
| pullUpLoad         | 这个配置用于做上拉加载功能。当设置为 true 或者是一个 Object 的时候，可以开启上拉加载，可以配置离底部距离阈值（threshold）来决定开始加载的时机                      | Boolean or Object | { threshold: 0, txt: { more: '加载更多',noMore:'没有更多数据了'} }    | false  |
| startY             | 纵轴方向初始化位置                                                                                                                                                 | Number            |                                                                       | 0      |
| freeScroll         | 有些场景我们需要支持横向和纵向同时滚动，而不仅限制在某个方向，这个时候我们只要设置 freeScroll 为 true 即可                                                         | Boolean           |                                                                       | false  |
| options            | 可自行根据 better-scroll 官方文档 扩展参数 例：`:options="{stopPropagation:true}"`                                                                                 | Object            | 官方文档的所有参数（注：props 传入的相同的属性会覆盖 options 传入的） | {}     |

### 自定义 react element:

| name            | 说明                              | 注入属性                                                                                                                                         |
| --------------- | --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| children        | 滚动的主体内容区域组件            |                                                                                                                                                  |
| PullDownElement | 下拉刷新的组件函数 （注：非组件） | reachRefreshRegion // 是否触及刷新阈值， beforePullDown:boolean, // 在下拉之前 pulldownY:number,//下拉 y 轴距离 isPulling:boolean //是否正在下拉 |
| PullUpElement   | 上拉刷新的组件函数 （注：非组件） | isPullUpLoad:boolean // 是否上拉加载                                                                                                             |

### Methods:

| 方法名          | 说明                                                                                                                | 参数                                                                                                                                                                                      |
| --------------- | ------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| initScroll      | 初始化 scroll 组件                                                                                                  |                                                                                                                                                                                           |
| disable         | 禁用 better-scroll，DOM 事件（如 touchstart、touchmove、touchend）的回调函数不再响应                                |                                                                                                                                                                                           |
| enable          | 启用 better-scroll, 默认 开启                                                                                       |                                                                                                                                                                                           |
| refresh         | 重新计算 better-scroll，当 DOM 结构发生变化的时候务必要调用确保滚动的效果正常（当页面无法滚动时，可尝试调用此方法） |                                                                                                                                                                                           |
| scrollTo        | 滚动到指定的位置                                                                                                    | (scrollToX, scrollToY, scrollToTime, easing)接收 4 个参数，1.x 横轴坐标(px) 2.y 纵轴坐标(px) 3.滚动动画执行的时长(ms) 4.easing 缓动函数，一般不建议修改                                   |
| scrollToElement | 滚动到指定的目标元素                                                                                                | (el, time, offsetX , offsetY )接收 4 个参数 详情请查看: [scrollToElement](https://ustbhuangyi.github.io/better-scroll/doc/zh-hans/api.html#scrolltoelementel-time-offsetx-offsety-easing) |
| destroy         | 销毁 better-scroll，解绑事件                                                                                        |
| **forceUpdate** | 数据跟新后强制更新页面                                                                                              | (dirty)接收 1 个 boolean 类型的参数，如果参数为 true，说明还可以触发下拉或者上拉事件，若参数为 false 表示之后不可拉动，一般用于数据加载全部了                                             |

### Events:

| 事件名称          | 说明                                                                                                                       | 回调参数                                       |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------- |
| scroll            | 触发时机：滚动过程中，具体时机取决于选项中的 probeType (触发事件在参数中需要开启 **listenScroll** )                        | 共 1 个参数,类型 Object, {x, y} 滚动的实时坐标 |
| beforeScrollStart | 触发时机：滚动开始之前 (触发事件在参数中需要开启 **listenBeforeScroll** )                                                  | 无                                             |
| pullingDown       | 触发时机：在一次下拉刷新的动作后，这个时机一般用来去后端请求数据。(触发事件在参数中需要开启 **pullDownRefresh** 相关配置 ) | 无                                             |
| pullinUp          | 触发时机：在一次上拉加载的动作后，这个时机一般用来去后端请求数据。(触发事件在参数中需要开启 **pullingUp** 相关配置 )       | 无                                             |

---

> 目前只提供了以上常用方法、Api,如有额外需要请 issue

# More detailed settings, please visit

[better-scroll document](https://ustbhuangyi.github.io/better-scroll/doc/)

# Author Blog

[不要温和地走进那良夜](https://zoyopo.github.io/)
