import React, { MutableRefObject, useEffect, useImperativeHandle, useRef } from "react"
import { useState } from "react"

interface Iprops{
  y?:number
  bubbleRef:MutableRefObject<any>
}
const PullLoadBubble = (props:Iprops) =>{
  const {y = 0 ,bubbleRef } =props;
  const bubbleDomRef = useRef<any>()
  const isServer = () =>{
    return typeof window === 'undefined'
  }

  const getDpr = () =>{
    const dpr = isServer()?1:window.devicePixelRatio 
    return dpr
  }
  const ratio = getDpr();

  const initRadius = 18 * ratio
  const minHeadRadius = 12 * ratio
  const minTailRadius = 5 * ratio
  const initArrowRadius = 10 * ratio
  const minArrowRadius = 6 * ratio
  const arrowWidth = 3 * ratio
  const maxDistance = 40 * ratio
  const initCenterX = 25 * ratio
  const initCenterY = 25 * ratio
  const headCenter = {
    x: initCenterX,
    y: initCenterY
  }
  const [width,setWidth] = useState(50)


  const [height,setHeight] = useState(60)

  useEffect(() => {
     setHeight(ratio * height)
     setWidth(ratio * width)
     _draw()
    
    return () => {
      
    };
  }, []);

  useEffect(()=>{
    _draw()
 
  },[y])

  useImperativeHandle(bubbleRef,() => ({
    clearRect() {
      const bubble = bubbleDomRef.current
      const ctx = bubble.getContext('2d')
      ctx.clearRect(0, 0, bubble.width, bubble.height)
    }
  }))

 const _draw = () => {
    const bubble = bubbleDomRef.current
    const ctx = bubble.getContext('2d')
    ctx.clearRect(0, 0, bubble.width, bubble.height)

    _drawBubble(ctx)

    _drawArrow(ctx)
  }
  const _drawBubble = (ctx:any)=> {
    ctx.save()
    ctx.beginPath()

    const rate = getDistance() / maxDistance
    const headRadius = initRadius - (initRadius - minHeadRadius) * rate

    headCenter.y = initCenterY - (initRadius - minHeadRadius) * rate

    // 画上半弧线
    ctx.arc(headCenter.x, headCenter.y, headRadius, 0, Math.PI, true)

    // 画左侧贝塞尔
    const tailRadius = initRadius - (initRadius - minTailRadius) * rate
    const tailCenter = {
      x: headCenter.x,
      y: headCenter.y + getDistance()
    }

    const tailPointL = {
      x: tailCenter.x - tailRadius,
      y: tailCenter.y
    }
    const controlPointL = {
      x: tailPointL.x,
      y: tailPointL.y -  getDistance() / 2
    }

    ctx.quadraticCurveTo(controlPointL.x, controlPointL.y, tailPointL.x, tailPointL.y)

    // 画下半弧线
    ctx.arc(tailCenter.x, tailCenter.y, tailRadius, Math.PI, 0, true)
//debugger
    // 画右侧贝塞尔
    const headPointR = {
      x: headCenter.x + headRadius,
      y: headCenter.y
    }
    const controlPointR = {
      x: tailCenter.x + tailRadius,
      y: headPointR.y + getDistance() / 2
    }
    ctx.quadraticCurveTo(controlPointR.x, controlPointR.y, headPointR.x, headPointR.y)

    ctx.fillStyle = 'rgb(170,170,170)'
    ctx.fill()
    ctx.strokeStyle = 'rgb(153,153,153)'
    ctx.stroke()
    ctx.restore()
  }
 const _drawArrow =(ctx:any) => {
    ctx.save()
    ctx.beginPath()

    const rate = getDistance() / maxDistance
    const arrowRadius = initArrowRadius - (initArrowRadius - minArrowRadius) * rate

    // 画内圆
    ctx.arc(headCenter.x, headCenter.y, arrowRadius - (arrowWidth - rate), -Math.PI / 2, 0, true)

    // 画外圆
    ctx.arc(headCenter.x, headCenter.y, arrowRadius, 0, Math.PI * 3 / 2, false)

    ctx.lineTo(headCenter.x, headCenter.y - arrowRadius - arrowWidth / 2 + rate)
    ctx.lineTo(headCenter.x + arrowWidth * 2 - rate * 2, headCenter.y - arrowRadius + arrowWidth / 2)

    ctx.lineTo(headCenter.x, headCenter.y - arrowRadius + arrowWidth * 3 / 2 - rate)

    ctx.fillStyle = 'rgb(255,255,255)'
    ctx.fill()
    ctx.strokeStyle = 'rgb(170,170,170)'
    ctx.stroke()
    ctx.restore()
  
  }
 


  const getDistance = () => {
    return Math.max(0, Math.min(y * ratio, maxDistance))
  }

  const getStyle = () =>{
    return {width:`${width / getDpr()}px`,height:`${height / getDpr()}px`}
  }


  return  <canvas ref={bubbleDomRef} width={width} height={height} style={getStyle()}></canvas>

}

export default PullLoadBubble