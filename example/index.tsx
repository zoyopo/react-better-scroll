import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import SimpleScrollList from './betterScrollPage/simple';
import AsyncDataScrollList from './betterScrollPage/asyncData'
import {  useState } from 'react';
import { ReactElement } from 'react';
import UseHistorySubscribe from './hooks/UseHistorySubscribe'
import './index.css'
enum DemoType {
  simple ='simple',
  async='async'
}
type DicOfComponent={
   key:DemoType,
   value:ReactElement,
   visible:boolean
}
const App = () => {
  const dicOfComponentArr:DicOfComponent[] = [
    {key:DemoType.simple,value:<SimpleScrollList/>,visible:false},
    {key:DemoType.async,value:<AsyncDataScrollList/>,visible:false}
  ]
  const [activeKey,setActiveKey] = useState<DemoType>()
  const setActiveKeyAction   = () =>{
    const key = getParameterByName('demoType')
    setActiveKey(key as DemoType)
  }
     
  const {getParameterByName}=UseHistorySubscribe({cb:setActiveKeyAction})


const navigateTo = (name) => () =>{
  const prefix = window.location.href.split('?')[0]
  window.history.pushState({target:name},"",`${prefix}?demoType=${name}`)
}
const renderDemoOption = () =>{
  return <> <div className="option-btn" onClick={navigateTo(DemoType.simple)}>simple</div>
  <div className="option-btn" onClick={navigateTo(DemoType.async)}>async</div></>
}
  return (
    <div style={{height:'100%'}}>
      {activeKey?dicOfComponentArr.find(item=>item.key === activeKey)?.value:renderDemoOption()}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
