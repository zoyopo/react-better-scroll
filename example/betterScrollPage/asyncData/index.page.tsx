import BetterScrollList from '../../../components/BetterScrollList/index'
import { useEffect, useRef, useState } from 'react'
import styles from './index.less'

const BetterScrollPage = () => {
  const bsListInstance = useRef(null)
  const count = useRef(0)
  const [items,setItems] = useState([])
  useEffect(() => {
     onPullingDown()
    return () => {
      
    };
  }, []);
  
  const onPullingUp = () => {
      // 模拟上拉 加载更多数据
      console.log('上拉加载')
      getData().then(res => {
        setItems(prev=>prev.concat(res))
      //  this.items = this.items.concat(res)
        if (count.current < 30) {
          bsListInstance.current.forceUpdate(true)
        } else {
          bsListInstance.current.forceUpdate(false)
        }
      })
  }

  const onPullingDown = () => {
     // 模拟下拉刷新
     console.log('下拉刷新')
     
     getData().then(res => {
      setItems(res as [])
      bsListInstance.current.forceUpdate(true)
     })
  }
   // 模拟数据请求
 const  getData =() => {
    return new Promise(resolve => {
      setTimeout(() => {
        const arr = []
        for (let i = 0; i < 10; i++) {
          arr.push(count.current ++ )
        }
        resolve(arr)
      }, 1000)
    })
  }
  return (
    <div className={styles.container}>
      <div className={styles['navbar']}>导航栏</div>
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
        startY={0}
        onPullingUp={onPullingUp}
        onPullingDown={onPullingDown}
      >
        <ul>
          {items.map((item,index) => (
            <li className={styles.item}>{index}</li>
          ))}
        </ul>
      </BetterScrollList>
    </div>
  )
}

export default BetterScrollPage
