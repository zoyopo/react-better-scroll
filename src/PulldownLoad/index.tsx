import { Iprops as BsIprops } from '../BetterScrollList';
import React, { ReactElement } from 'react';
interface PullDownElementProps {
  beforePullDown: boolean;
  pulldownY: number;
  isPulling: boolean;
  reachRefreshRegion: boolean;
}
type pullDownRefreshObj = {
  txt?: string;
  stop?: number; // 回弹停留的距离（stop）
  stopTime?: number;
  threshold: number; // 顶部下拉的距离（threshold）
};
interface Iprops {
  children: ReactElement<BsIprops>;
  onPullingUp: () => void;
}
type PullDownReaction =
  | {
      PullDownElement?: React.FC<PullDownElementProps>;
      pullDownRefreshConfig: pullDownRefreshObj;
    }
  | {
      PullDownElement: React.FC<PullDownElementProps>;
      pullDownRefreshConfig?: pullDownRefreshObj;
    }
  | {
      PullDownElement?: React.FC<PullDownElementProps>;
      pullDownRefreshConfig?: pullDownRefreshObj;
    };

const PulldownLoad = (props: Iprops & PullDownReaction) => {
  const {
    children,
    pullDownRefreshConfig: pullDownRefresh,
    ...restProps
  } = props;

  return <>{React.cloneElement(children, { ...restProps, pullDownRefresh })}</>;
};

export default PulldownLoad;
