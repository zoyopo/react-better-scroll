import React from 'react';
import { ReactElement } from 'react';
import { Iprops as BsIprops } from '../BetterScrollList';
interface MouseWheelConfig {
  // 鼠标滚轮滚动的速度
  speed?: number;
  // 当该值为 true 时，表示滚轮滚动和 BetterScroll 滚动的方向相反。
  invert?: boolean;
  // 滚动动画的缓动时长
  easeTime?: number;
  // 因此只要在 discreteTime 时间内没有探测到滚动，那么一次的滚轮动作就结束了。因此只要在 discreteTime 时间内没有探测到滚动，那么一次的滚轮动作就结束了。
  discreteTime?: number;
  // 由于滚轮滚动是高频率的动作，因此可以通过 throttleTime 来限制触发频率，mouseWheel 内部会缓存滚动的距离，并且每隔 throttleTime 会计算缓存的距离并且滚动。
  throttleTime?: number;
  // 阻尼因子，值的范围是[0, 1]，当 BetterScroll 滚出边界的时候，需要施加阻力，防止滚动幅度过大，值越小，阻力越大。
  dampingFactor?: number;
}
type MouseWheelOptions = Partial<MouseWheelConfig> | true;

interface Iprops {
  mouseWheelConfig: MouseWheelOptions;
  children: ReactElement<BsIprops>;
}

const MouseWheel = (props: Iprops) => {
  const { children, mouseWheelConfig: mouseWheel, ...restProps } = props;

  return (
    <>
      {React.cloneElement(children, { ...restProps, options: { mouseWheel } })}
    </>
  );
};

export default MouseWheel;
