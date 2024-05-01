import { StyleSheet } from "react-native";
import appStyle, { Responsive } from "../../../styles/appStyle";
import colors from "../../../constants/color";

export const styles = StyleSheet.create({
    ...appStyle,
    errorMsg: {
      color: '#FF3242',paddingVertical:10,
      fontSize: Responsive.getWidth(13),
    },
    inputText2: {
      flex: 1,color:colors.black,
      height: Responsive.getWidth(45),
      fontSize: Responsive.getWidth(16),
      paddingLeft: Responsive.getWidth(10),
    },
    inputText: {
      height: Responsive.getWidth(45),
      fontSize: Responsive.getWidth(16),
      borderBottomColor: colors.border,
      color:colors.black,
      borderBottomWidth: 1,
    },
    loginTitle: {color:colors.black,
      fontSize: Responsive.getWidth(34),
      marginTop: Responsive.getWidth(35),
      marginBottom: Responsive.getWidth(15),
    },
    signupTextBtn2: {color:colors.black,
      textDecorationLine: 'underline',
    },
    signupTextBtn: {color:colors.black,
      textAlign: 'center',
      marginTop: Responsive.getWidth(20),
      fontSize: Responsive.getWidth(14),
      lineHeight: Responsive.getWidth(22),
    },
    
})