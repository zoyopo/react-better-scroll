import {BetterScrollList } from '../../../dist'
import { useEffect, useRef, useState } from 'react'
import React = require('react')
import './index.css'


const BetterScrollPage = () => {
  const bsListInstance = useRef<any>()
  const pageNo = useRef(1)
  const pageSize = useRef(10)
  const [items,setItems] = useState([])
  
  useEffect(() => {
     onPullingDown()
    return () => {
      
    };
  }, []);

  const getMockDataFromServer = () => {
    const dataSource = new Array(45).fill(1)
    return dataSource
  }
  const getDataByPagination= (pagaination) => {
        const {pageNo,pageSize} = pagaination
        const data = getMockDataFromServer();
        return data.slice(pageSize * (pageNo -1),pageSize*pageNo)
  }
  
  const onPullingUp = () => {
      // 模拟上拉 加载更多数据
      console.log('上拉加载')
      getData().then((res:[]) => {
        console.log('res',res)
        setItems(prev=>prev.concat(res))
      //  this.items = this.items.concat(res)
         if (res.length < 10) {
          console.log('to end')
          bsListInstance.current.forceUpdate(false)
         } else {
          bsListInstance.current.forceUpdate(true)
         }
      })
  }

  const onPullingDown = () => {
     // 模拟下拉刷新
     console.log('下拉刷新')
     pageNo.current = 1
     getData().then(res => {
      setItems(res as [])
      bsListInstance.current.forceUpdate(true)
     })
  }
   // 模拟数据请求
 const  getData =() => {
    return new Promise(resolve => {
      setTimeout(() => {
        const arr:number[] = getDataByPagination({pageNo:pageNo.current,pageSize:pageSize.current})
        pageNo.current ++
        resolve(arr)
      }, 1000)
    })
  }
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
          {items.map((item,index) => (
            <li className="item">{index}</li>
          ))}
        </ul>
      </BetterScrollList>
    </div>
  )
}

export default BetterScrollPage
