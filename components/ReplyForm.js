import * as React from 'react';
import { useState } from 'react';
import { StyleSheet, View } from "react-native";
import { Button, Input } from 'react-native-elements';


export default function ReplyForm({onClose, onSend}) {
  const [message, setMessage] = useState('');
  return (
    <View style={{
      height:70,
      padding: 5
    }}>
      <View
        style={{
          // marginBottom: 10,
          flex:1,
          // display: 'flex',
          flexDirection: 'row',
          // height: 80,
        }}
      >
        <View style={{flex: 1}}>
          <Input
            onChangeText={text => setMessage(text)}
            value={message}
            containerStyle={{ borderStyle: 'solid', borderWidth: 1, borderRadius: 20 }}
            placeholder={'Quick reply'}
          />
        </View>
        <Button
          icon={{
            name: 'paper-plane',
            type: 'font-awesome',
          }}
          type="clear"
          onPress={()=> onSend({message})}
          // style={{width: 60}}

        />
        <Button
          icon={{
            name: 'times',
            type: 'font-awesome',
          }}
          type="clear"
          onPress={onClose}
          // style={{width: 60}}

        />

      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  inner: {
    flex: 1,
    justifyContent: "space-around"
  },
  header: {
    fontSize: 36,
    marginBottom: 48
  },
  textInput: {
    height: 40,
    borderColor: "#000000",
    borderBottomWidth: 1,
    marginBottom: 36
  },
  btnContainer: {
    backgroundColor: "white",
    marginTop: 12
  }
});
