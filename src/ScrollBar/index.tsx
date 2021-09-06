import React from 'react';
import { ReactElement } from 'react';
import { Iprops as BsIprops } from '../BetterScrollList';
interface ScrollBarConfig {
  // 当滚动停止的时候，滚动条渐隐
  fade?: boolean;
  // 滚动条是否可以交互。
  interactive?: boolean;

  // 滚动条轨道是否允许点击。
  scrollbarTrackClickable?: boolean;
  // 滚动条轨道被点击之后，滚动距离的计算方式，默认与浏览器的表现形式一样，可以配置为 'clickedPoint'，代表滚动条滚动至点击的位置。
  scrollbarTrackOffsetType?: string;
  // 滚动条渐显的动画时长
  fadeInTime?: number;
  // 滚动条渐隐的动画时长。
  fadeOutTime?: number;
}

type ScrollCustomConfig =
  | {
      // 用户提供自定义的滚动条。
      customElements?: HTMLElement[];
    }
  | {
      // 滚动条的最小尺寸，当用户提供了自定义的滚动条，该配置无效。
      minSize?: number;
    };

interface Iprops {
  scrollBarConfig: (ScrollBarConfig & ScrollCustomConfig) | boolean;
  children: ReactElement<BsIprops>;
}

const ScrollBar = (props: Iprops) => {
  const { children, scrollBarConfig: scrollBar, ...restProps } = props;

  return <>{React.cloneElement(children, { ...restProps })}</>;
};

export default ScrollBar;
