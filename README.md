# giri-chat-component

NPM package contains a chat component which shows the sent and receives messages on the page in a sequece. and also functionallity to send the message

# install Package

Using npm:

```bash
$ npm install giri-chat-component
```

Using yarn:

```bash
$ yarn add giri-chat-component
```

Once the package is installed, you can import the library using `import` approach:

```js
import ChatComponent from 'giri-chat-component';
```

Complete code

```js
import React, {useState} from 'react';
import ChatComponent from 'giri-chat-component';

const App = () => {
  //state for chat history updation
  const [chatHistory, setChatHistory] = useState([
    {
      type: 'RECEIVED',
      message: 'Hellow',
      timestamp: new Date(),
    },
  ]);

  //function to trigger receive message by default after 1 sec of sending the message
  const onAutoReceive = () => {
    setTimeout(() => {
      const newChat = {
        type: 'RECEIVED',
        message: 'Received message',
        timestamp: new Date(),
      };
      setChatHistory(prevHistory => [...prevHistory, newChat]);
    }, 1000);
  };

  return (
    <ChatComponent
      headerTitle={'Chating with Giri'}
      headerContainerStyle={{
        backgroundColor: 'black',
      }}
      headerTitleStyle={{
        color: 'white',
      }}
      chatHistory={chatHistory}
      onMessageSend={message => {
        const newChat = {
          type: 'SENT',
          message: message,
          timestamp: new Date(),
        };
        setChatHistory([...chatHistory, newChat]);
        onAutoReceive();
      }}
    />
  );
};

export default App;

                
```

# Information about the Interfaces
```typescript
//chatHistory
interface ChatHistoryInterface {
  type: MessageType;
  message: string;
  timestamp: Date;
}

//Chat component props

interface ChatComponentInterface {
  chatHistory: ChatHistoryInterface[];
  onMessageSend: (userMessage: string) => void;
  headerContainerStyle: StyleSheet;
  headerTitleStyle: StyleSheet;
  headerTitle: string;
}

```

# importing the component

 