interface Iprops {
  children: ReactElement;
}

import React, { ReactElement } from 'react';
import { BetterScrollList } from '..';

const PullPuRefresh = (props: Iprops) => {
  const { children, ...restProps } = props;

  return <>{React.cloneElement(children, restProps)}</>;
};
