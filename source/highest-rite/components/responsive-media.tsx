import { useWindowDimensions, type ImageStyle, type StyleProp } from 'react-native';
import { Image, type ImageProps } from 'expo-image';
import { responsiveHeight } from '@/lib/responsive-media';

/** Meaningful imagery is never cropped. Cover is opt-in only for decoration. */
export function ResponsiveMedia({
  source,
  alt,
  style,
  aspectRatio = 2 / 3,
  decorative = false,
  ...rest
}: Omit<ImageProps, 'contentFit' | 'style'> & {
  style?: StyleProp<ImageStyle>;
  aspectRatio?: number;
  decorative?: boolean;
}) {
  const { width, height } = useWindowDimensions();
  const maxHeight = responsiveHeight(width, height, aspectRatio);
  return (
    <Image
      source={source}
      alt={decorative ? '' : (alt ?? '')}
      accessible={!decorative}
      contentFit={decorative ? 'cover' : 'contain'}
      style={[{ width: '100%', height: maxHeight, alignSelf: 'center' }, style]}
      {...rest}
    />
  );
}
