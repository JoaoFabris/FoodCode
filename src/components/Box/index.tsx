// src/components/Box/index.tsx
import React, { ReactNode } from 'react';
import { View, ViewStyle } from 'react-native';

type BoxProps = ViewStyle & {
  children?: ReactNode;
};

export const Box = ({ children, ...props }: BoxProps) => {
  return <View style={props}>{children}</View>;
};

export default Box;