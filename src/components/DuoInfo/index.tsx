import React from 'react';
import { ColorValue, View, Text } from 'react-native';
import { THEME } from '../../theme';

import { styles } from './styles';

interface DuoInfoProps {
  label: string;
  value: string;
  colorValue?: ColorValue;
}

export function DuoInfo({ label, value, colorValue = THEME.COLORS.TEXT }: DuoInfoProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        {label}
      </Text>

      <Text style={[styles.label, { color: colorValue }]} numberOfLines={1}>
        {value}
      </Text>
    </View>
  );
}