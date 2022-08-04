import React from 'react';
import {createIconSetFromIcoMoon} from 'react-native-vector-icons';
import fontelloConfig from './selection.json';
const Icon = createIconSetFromIcoMoon(fontelloConfig);
const FontIcon = ({name, color, size, style}) => (
  <Icon name={name} color={color} size={size} style={[style]} />
);

export default FontIcon;
