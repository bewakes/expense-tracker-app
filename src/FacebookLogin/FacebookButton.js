import React from 'react';
import { View, StyleSheet, Text, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AppStyles from '../appStyles/styles';
const iconName = 'facebook';

export default FaceBookButton = (props) => {
  let renderable = (
    <View style={{padding:3, backgroundColor:AppStyles.AppColors.primaryColor}}>
    <TouchableHighlight
      underlayColor='#99d9f4'
      style={{elevation:2}}
      onPress={props.onPress}>
      <View style={styles.buttonContainer}>
        <Icon name={iconName} color="white" size={25} />
        <Text style={styles.btnText}>Sign In with Facebook</Text>
      </View>
    </TouchableHighlight>
    </View>
  )
  return renderable;
}
const backgroundColor = "#3b5998";

const styles = StyleSheet.create(Object.assign({}, {}, {
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: backgroundColor,
    paddingVertical: 17,
    paddingHorizontal: 7,
    height:48,
    borderRadius: 2,
    justifyContent: 'center',
  },
 btnText: {
    fontSize: 18,
    color: '#FAFAFA',
    marginLeft: 10,
    marginTop: 2,
  }
}));
