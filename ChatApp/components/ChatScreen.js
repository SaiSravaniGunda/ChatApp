// components/ChatScreen.js

import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, FlatList, Text, StyleSheet } from 'react-native';
import io from 'socket.io-client';

const socket = io('http://192.168.1.102:3000');

const ChatScreen = ({ route }) => {
  const { username } = route.params;
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on('receiveMessage', (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    return () => {
      socket.off('receiveMessage');
    };
  }, []);

  const sendMessage = () => {
    if (message) {
      const timestamp = new Date().toLocaleTimeString();
      const msg = { text: message, time: timestamp, name: username };
      socket.emit('sendMessage', msg); // ✅ No local update here
      setMessage('');
    }
  };

  const renderMessage = ({ item }) => {
    const isSender = item.name === username;
    return (
      <View
        style={[
          styles.messageContainer,
          {
            alignSelf: isSender ? 'flex-end' : 'flex-start',
            backgroundColor: isSender ? '#DCF8C6' : '#f1f1f1',
          },
        ]}
      >
        <Text style={styles.senderName}>{item.name}</Text>
        <Text style={styles.messageText}>
          {item.text} <Text style={styles.timestamp}>({item.time})</Text>
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderMessage}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={message}
          onChangeText={setMessage}
          placeholder="Enter your message"
        />
        <Button title="Send" onPress={sendMessage} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  messageContainer: {
    padding: 10,
    marginBottom: 5,
    borderRadius: 5,
    maxWidth: '80%',
  },
  senderName: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#555',
  },
  messageText: {
    fontSize: 16,
    color: '#000',
  },
  timestamp: {
    fontSize: 12,
    color: '#888',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingLeft: 10,
    marginRight: 10,
    borderRadius: 5,
  },
});

export default ChatScreen;
