import React from 'react';
import Slider, { SliderProps } from '@mui/material/Slider';

export type UiSliderProps = SliderProps;

export function UiSlider(props: UiSliderProps) {
  return <Slider {...props} />;
}
