import {
  Alert,
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { ChatComponentInterface } from "./constants/interfaces";
import { Colors } from "./constants/colors";
import { Strings } from "./constants/strings";
import { MessageType } from "./constants/enums";

const ChatComponent = props => {
  const { chatHistory, onMessageSend } = props;

  const [typedMessage, setTypedMessage] = useState("");
  let flatListRef = React.useRef(null);

  //For auto scrolling of chat
  useEffect(() => {
    if (flatListRef?.current) {
      flatListRef?.current?.scrollToEnd({ animated: true });
    }
  }, [JSON.stringify(chatHistory || [])]);

  //Sending message input box
  const renderMessageInput = () => {
    return (
      <View
        style={{
          ...styles.inputBox,
          marginBottom: Platform.OS === "android" ? 5 : 30,
        }}
      >
        <TextInput
          style={styles.input}
          onChangeText={setTypedMessage}
          value={typedMessage}
          placeholder={Strings.EnterMessageHere}
          multiline
        />
        <TouchableOpacity
          style={styles.sendBox}
          activeOpacity={0.7}
          onPress={() => {
            if (typedMessage) {
              onMessageSend(typedMessage);
              setTypedMessage("");
            } else {
              Alert.alert(Strings.MessageCanNotBeEmpty);
            }
          }}
        >
          <Image
            source={require("./images/send_message_icon.png")}
            style={styles.sendIconStyle}
          />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitleStyle}>{"Chat with..."}</Text>
      </View>
      <FlatList
        ref={flatListRef}
        keyExtractor={(item, index) => index?.toString()}
        data={chatHistory ?? []}
        renderItem={({ item }) => {
          return (
            <View
              style={{
                ...styles.messageBox,
                backgroundColor:
                  item?.type === "SENT" ? Colors.CHARDONNAY : "#E5E7E9",
                alignSelf: item?.type === "SENT" ? "flex-end" : "flex-start",
              }}
            >
              <Text style={styles.messageTextStyle}>{item?.message}</Text>
              <Text style={styles.timeTextStyle}>
                {item?.timestamp?.getHours() +
                  ":" +
                  item?.timestamp?.getMinutes()}
              </Text>
            </View>
          );
        }}
        automaticallyAdjustKeyboardInsets={true}
        contentContainerStyle={{
          paddingHorizontal: 15,
        }}
      />
      {Platform.OS === "android" ? (
        renderMessageInput()
      ) : (
        <KeyboardAvoidingView behavior="padding">
          {renderMessageInput()}
        </KeyboardAvoidingView>
      )}
    </View>
  );
};

export default ChatComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
    padding: 10,
  },
  input: {
    maxHeight: 100,
    minHeight: 45,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    flex: 1,
  },
  messageBox: {
    maxWidth: "70%",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 7,
    marginVertical: 10,
  },
  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 12,
  },
  sendBox: {
    height: 40,
    width: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.PICKTON_BLUE,
  },
  sendIconStyle: {
    height: 20,
    width: 20,
    tintColor: Colors.WHITE,
  },
  messageTextStyle: {
    color: Colors.BLACK,
    fontSize: 16,
    marginBottom: 2,
  },
  timeTextStyle: {
    color: "rgba(0,0,0,0.6)",
    fontSize: 12,
  },
  noActiveUserBox: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  noActiveUserText: {
    fontSize: 16,
    color: Colors.BLACK,
    fontWeight: "bold",
    marginBottom: 20,
  },
  headerContainer: {
    height: 48,
    elevation: 1,
    backgroundColor: Colors.WHITE,
    shadowColor: Colors.BLACK,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 1.84,
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 10,
  },
  headerTitleStyle: {
    fontSize: 16,
    color: Colors.BLACK,
  },
});
