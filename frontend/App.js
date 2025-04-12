import React, { useState, useRef } from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import {
  NativeBaseProvider,
  Box,
  HStack,
  VStack,
  Text,
  Avatar,
  IconButton,
  Icon,
  ScrollView,
  Spinner,
  Input
} from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';

// Memoized ChatHeader to prevent unnecessary re-renders
const ChatHeader = React.memo(() => (
  <HStack bg="#003366" px={4} py={3} alignItems="center">
    <Avatar source={require('./assets/—Pngtree—future intelligent technology robot ai_5766888.png')} />
    <VStack ml={3}>
      <Text color="white" fontSize="md" bold>
        AI Assistant
      </Text>
      <Text color="gray.200" fontSize="xs">
        Online
      </Text>
    </VStack>
    <IconButton
      ml="auto"
      icon={<Icon as={MaterialIcons} name="expand-more" color="white" />}
      onPress={() => {}}
    />
  </HStack>
));

const ChatList = ({ messages, loading, scrollViewRef }) => (
  <ScrollView
    ref={scrollViewRef}
    keyboardShouldPersistTaps="always"
    keyboardDismissMode="none" // keeps keyboard from dismissing on drag
    onContentSizeChange={() =>
      scrollViewRef.current?.scrollToEnd({ animated: true })
    }
    style={{ paddingHorizontal: 10, flex: 1 }}
  >
    {messages.map((msg, i) => (
      <Box
        key={i}
        bg={msg.sender === 'user' ? '#007AFF' : '#e0e0e0'}
        alignSelf={msg.sender === 'user' ? 'flex-end' : 'flex-start'}
        p={3}
        borderRadius={10}
        m={1}
        maxWidth="80%"
      >
        <Text color={msg.sender === 'user' ? 'white' : 'black'}>
          {msg.text}
        </Text>
      </Box>
    ))}
    {loading && <Spinner color="gray.500" size="sm" />}
  </ScrollView>
);

const ChatInput = ({ input, setInput, onSend }) => (
  <HStack
    p={3}
    alignItems="center"
    bg="white"
    borderTopWidth={1}
    borderColor="gray.200"
    space={1.5}
  >
    <IconButton
      icon={<Icon as={MaterialIcons} name="emoji-emotions" />}
      onPress={() => {}}
    />
    <Input
      flex={1}
      variant="filled"
      placeholder="Type your message"
      value={input}
      onChangeText={setInput}
      bg="gray.100"
      borderRadius={20}
      px={4}
    />
    <IconButton
      icon={<Icon as={MaterialIcons} name="attach-file" />}
      onPress={() => {}}
    />
    <IconButton
      icon={<Icon as={MaterialIcons} name="send" color="#007AFF" />}
      onPress={onSend}
    />
  </HStack>
);

export default function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollViewRef = useRef(null);

  // Function to send message
  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { text: input, sender: 'user' };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('https://ai-chat-app-production.up.railway.app/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });
      const data = await res.json();
      const botMsg = { text: data.reply, sender: 'bot' };
      setMessages(prev => [...prev, botMsg]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <NativeBaseProvider>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <Box safeArea flex={1} bg="#f5f5f5">
          <ChatHeader />
          <ChatList messages={messages} loading={loading} scrollViewRef={scrollViewRef} />
          <ChatInput input={input} setInput={setInput} onSend={sendMessage} />
        </Box>
      </KeyboardAvoidingView>
    </NativeBaseProvider>
  );
}
