// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/

import Entypo from '@expo/vector-icons/Entypo';
import { type IconProps } from '@expo/vector-icons/build/createIconSet';
import { type ComponentProps } from 'react';

export function TabBarIcon({ style, ...rest }: IconProps<ComponentProps<typeof Entypo>['name']>) {
  return <Entypo size={20} style={[{ marginBottom: -3 }, style]} {...rest} />;
}
