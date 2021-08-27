import React, { ReactElement } from 'react';
import {Iprops as BsIprops} from '../BetterScrollList'

type pullUpLoadObj = {
  txt?: {
    more: string;
    noMore: string;
  };
  threshold: number; // 底部距离阈值（threshold）来决定开始加载的时机
};

type PullUpElementProps = {
  isPullUpLoad: boolean;
};
interface PullPuRefreshProps {
  children: ReactElement<BsIprops>;
  onPullingUp:()=>void;
}

type PullUpReaction ={
  PullUpElement?: React.FC<PullUpElementProps>;
  pullUpRefreshConfig:pullUpLoadObj
}|{
  PullUpElement: React.FC<PullUpElementProps>;
  pullUpRefreshConfig?:pullUpLoadObj
}|{
  PullUpElement?: React.FC<PullUpElementProps>;
  pullUpRefreshConfig?:pullUpLoadObj
}



const PullPuRefresh = (props: PullPuRefreshProps & PullUpReaction) => {
  const { children,pullUpRefreshConfig:pullUpLoad, ...restProps } = props;

  return <>{React.cloneElement(children, {...restProps,pullUpLoad})}</>;
};



export default PullPuRefresh