import { BottomSheetModalRef } from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheetModalProvider/types";
import { BottomSheetMethods, BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { ReactElement, RefObject } from "react";
import { ImageSourcePropType, ImageStyle, TextStyle, ViewStyle } from "react-native";

export interface ButtonProps {
    onPress?:()=>void;
    loadingComponent?:React.FC;
    customStyle?:object;
    labelStyle?:object;
    title:string;
    disabled?:boolean;
    isLoading?:boolean;
    icon?:React.ReactNode;
    buttonWidth?:number|string|undefined;
    buttonHeight?:number|string|undefined;
    textColor?:string;
    outlined?:boolean;
    numberOfLines?:number;
    borderColor?:string
  }

  export interface AmPieChartProps {
    data:any[];
    licenseKey?:string;
  }

  export interface CustomImageLoaderProps{
    isLoading:boolean;
    children?:React.ReactNode
  }

  export interface AvatarProps{
    source:ImageSourcePropType;
    extContainerStyles?:ViewStyle;
    extImageStyle?:ImageStyle;
    onPress?:()=>void;
  }

  export interface BadgeProps{
    count:number;
    customStyles?:ViewStyle;
    showBadge:boolean;
  }

  export interface BottomSheetComponentProps{
    bottomSheetModalRef:((instance: BottomSheetModalMethods | null) => void) | RefObject<BottomSheetModalMethods> | null | undefined;
    snapPoints:string[];
    children:React.ReactNode;
    index:number;
    enableContentPanningGesture:boolean;
    enableHandlePanningGesture:boolean;
    opacity?:number;
    onDismiss?:()=>void;
    onClose?:()=>void;
    disableCloseOnOutsideClick?:boolean;
    handleIndicatorStyle?:ViewStyle;
    onOpen?:(index?:number)=>void;
  }

  export interface ModalComponentProps{
    children:React.ReactNode
    closeModal?:()=>void;
  }

export interface DraggableComponentProps{
  visible:boolean;
   renderComponent:React.FC
}

export type DropdownValueProps={
  label:string;
  value:string|number;
}|object
export interface DropdownProps{
  data:any[];
  label?:string;
  customIcon?:React.FC;
  placeHolder?:string;
  brColor?:string;
  customStyles?:ViewStyle;
  customDropdownLabelStyle?:TextStyle;
  customLabelStyle?:TextStyle;
  selectedValue:DropdownValueProps;
  onChangeValue:(e:object)=>void;
  dataKey?:string;
  defaultIndex?:number;
  disabled?:boolean;
  isLoading?:boolean;
  disableKey?:string;
  disableCompareValue?:string;
  showClear?:boolean;
  onClear?:()=>void;
}

export interface EmptyRecordProps{
  message?:string;
  showIcon?:boolean;
  renderIcon?:React.FC;
  secondMessage?:string;
  customMessageStyle:TextStyle;
  customSubtitleStyle:TextStyle;
}

export type LabelValue={label:string,value:string|number,itemData?:LabelValue[]};
export interface AccordionData{
  data:LabelValue[];
  customItemStyle?:ViewStyle;
  customMainContainerStyle?:ViewStyle;
  itemTextStyle?:TextStyle
}

export interface HeaderProps{
  title?:string;
  leftChildren?:ReactElement[];
  rightChildren?:ReactElement[];
  customStyles?:ViewStyle;
  titleStyles?:TextStyle;
  customTitleContainerStyle?:ViewStyle;
  customRightChildStyle?:ViewStyle;
  customLeftChildStyle?:ViewStyle;
}

export type BottomSheetModalRefProps  = RefObject<BottomSheetModalMethods> | ((instance: BottomSheetModalMethods | null) => void) | null | undefined


export type ModalRefProps = {
  showModal:()=>void; 
  dismissModal:()=>void;
}

export interface OnBoardingPageProps{
  data:any[];
  indicatorAnimationType:'STRETCH'|"FLIP"|"NORMAL"
}

export interface TileScrollingProps{
  data:any[];
}