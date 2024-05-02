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
    children:React.ReactNode
  }

  export interface AvatarProps{
    source:ImageSourcePropType;
    extContainerStyles:ViewStyle;
    extImageStyle:ImageStyle;
  }

  export interface BadgeProps{
    count:number;
    customStyles?:ViewStyle;
    showBadge?:boolean;
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
  }

export interface DraggableComponentProps{
  visible:boolean;
   renderComponent:React.FC
}

export interface DropdownProps{
  data:any[];
  label?:string;
  customIcon?:React.FC;
  placeHolder?:string;
  brColor?:string;
  customStyles?:ViewStyle;
  customDropdownLabelStyle?:TextStyle;
  customLabelStyle?:TextStyle;
  selectedValue:{label:string}|object;
  onChangeValue:(e:object)=>void;
  dataKey?:string;
  defaultIndex?:number;
  disabled?:boolean;
  isLoading?:boolean;
  disableKey:string;
  disableCompareValue?:string;
  showClear?:boolean;
  onClear?:()=>void;
}