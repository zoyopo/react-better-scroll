import BetterScrollList from '../../../components/BetterScrollList/index'
import { useRef } from 'react'
import styles from './index.less'
const BetterScrollPage = () => {
  const bsListInstance = useRef(null)

  const onPullingUp = () => {}

  const onPullingDown = () => {}
  return (
    <div className={styles.container}>
      <div className={styles['navbar']}>导航栏</div>
      <BetterScrollList
        bscrollListRef={bsListInstance}
        scrollbar={{ fade: true }}
       
        startY={0}
        onPullingUp={onPullingUp}
        onPullingDown={onPullingDown}
      >
        <ul>
          {new Array(20).fill(1).map((item,index) => (
            <li className={styles.item}>{index}</li>
          ))}
        </ul>
      </BetterScrollList>
    </div>
  )
}

export default BetterScrollPage
