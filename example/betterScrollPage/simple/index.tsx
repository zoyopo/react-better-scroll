import {BetterScrollList} from '../../../dist'
import React = require('react')
import './index.css'


const BetterScrollPage = () => {
  return (
    <div className="container">
      <div className="navbar">导航栏</div>
      <BetterScrollList>
        <ul>
          {new Array(20).fill(1).map((item,index) => (
            <li className="item">{index}</li>
          ))}
        </ul>
      </BetterScrollList>
    </div>
  )
}

export default BetterScrollPage
