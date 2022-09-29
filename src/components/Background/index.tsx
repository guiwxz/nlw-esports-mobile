import React from 'react';
import { View, ImageBackground } from 'react-native';

import backgroundImg from '../../assets/background-galaxy.png'

import { styles } from './styles';

interface BackgroundProps {
  children: React.ReactNode;
}

export function Background({ children }: BackgroundProps) {
  return (
    <ImageBackground 
      style={styles.container}
      defaultSource={backgroundImg}
      source={backgroundImg}
    >
      {children}
    </ImageBackground>
  );
}