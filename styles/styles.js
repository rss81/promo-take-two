import {StyleSheet} from 'react-native';
export default StyleSheet.create({
    container: {    
      flexDirection:'column',
      backgroundColor: '#fff',
      alignItems:'center',
      justifyContent: 'center',
      marginTop:100,
    },
    bigFont:{
      fontSize:40,
      color:'darkblue'
    },
    row:{
      flexDirection:'row',
      marginBottom:15,
    },
    button:{
      flexDirection:'row',
      marginTop:30,
      marginBottom:30,
    },
    bold: {
      fontWeight: 'bold',
      color:'green',
    },
    input: {
      borderWidth: 1,
      borderColor: 'black',
      marginRight: 10,
      paddingHorizontal:15,
      minWidth: 50,
    },
  })
