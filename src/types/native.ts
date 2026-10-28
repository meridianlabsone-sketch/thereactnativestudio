import React from 'react';

export interface ViewProps extends React.HTMLAttributes<HTMLDivElement> {
  accessibilityRole?: string;
  accessibilityLabel?: string;
  children?: React.ReactNode;
  className?: string;
}

export interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  numberOfLines?: number;
  accessibilityRole?: string;
  accessibilityLabel?: string;
  variant?: 'h1' | 'h2' | 'h3' | 'body' | 'caption' | 'mono';
  children?: React.ReactNode;
  className?: string;
}

export interface TextInputProps {
  value?: string;
  defaultValue?: string;
  onChangeText?: (text: string) => void;
  placeholder?: string;
  placeholderTextColor?: string;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  multiline?: boolean;
  numberOfLines?: number;
  maxLength?: number;
  editable?: boolean;
  clearButtonMode?: 'never' | 'while-editing' | 'always';
  label?: string;
  helperText?: string;
  errorText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  accessibilityLabel?: string;
  className?: string;
  autoFocus?: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
  onSubmitEditing?: () => void;
}

export interface PressableProps {
  onPress?: () => void;
  disabled?: boolean;
  activeOpacity?: number;
  accessibilityLabel?: string;
  accessibilityRole?: string;
  children: React.ReactNode | ((state: { pressed: boolean }) => React.ReactNode);
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export interface FlatListProps<T> {
  data: T[];
  renderItem: (info: { item: T; index: number }) => React.ReactNode;
  keyExtractor: (item: T, index: number) => string;
  ListHeaderComponent?: React.ReactNode;
  ListEmptyComponent?: React.ReactNode;
  ListFooterComponent?: React.ReactNode;
  ItemSeparatorComponent?: () => React.ReactNode;
  className?: string;
  initialNumToRender?: number;
}

export interface SwitchProps {
  value: boolean;
  onValueChange: (val: boolean) => void;
  disabled?: boolean;
  accessibilityLabel?: string;
  className?: string;
}

export interface ActivityIndicatorProps {
  animating?: boolean;
  size?: 'small' | 'large';
  color?: string;
  className?: string;
}

export interface NativeTaskItem {
  id: string;
  title: string;
  category: string;
  renderCost: string;
  active: boolean;
  timestamp: string;
}
