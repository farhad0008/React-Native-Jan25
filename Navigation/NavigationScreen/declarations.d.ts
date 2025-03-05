declare module 'react-native-image-slider-box' {
    import { Component } from 'react';
    import { ImageStyle, ViewStyle, TextStyle } from 'react-native';
  
    export interface SliderBoxProps {
      images: string[];
      sliderBoxHeight?: number;
      onCurrentImagePressed?: (index: number) => void;
      ImageComponent?: React.ComponentType<any>;
      dotColor?: string;
      inactiveDotColor?: string;
      dotStyle?: ViewStyle;
      imageLoadingColor?: string;
      autoplay?: boolean;
      circleLoop?: boolean;
    }
  
    export class SliderBox extends Component<SliderBoxProps> {}
  }
  