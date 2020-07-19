import React from "react";
import {View , ActivityIndicator,StyleSheet, Text } from "react-native"



function Loading(props) {
return(
    <View style={styles.loadingView}>
<ActivityIndicator
size={22} color="#512DA8"
></ActivityIndicator>
<Text style={styles.loadingText}>Loading...</Text>
    </View>
)
}


const styles = StyleSheet.create ({
 loadingView: {alignItems:"center" , justifyContent:"center" , flex:1},
 loadingText:{
     color:"#512DA8",
     fontSize:14,
     fontWeight:"bold"
 }
});


export default Loading;
