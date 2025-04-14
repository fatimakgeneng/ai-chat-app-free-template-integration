import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const ChatHeader = React.memo(() => (
  <View style={{
    flexDirection: 'row',
    backgroundColor: '#003366',
    paddingHorizontal: 20,
    paddingVertical: 16,
    alignItems: 'center',
  }}>
    <Image
      source={require('./assets/—Pngtree—future intelligent technology robot ai_5766888.png')}
      style={{ width: 50, height: 50, borderRadius: 25 }}
    />
    <View style={{ marginLeft: 16 }}>
      <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>AI Assistant</Text>
      <Text style={{ color: '#e5e5e5', fontSize: 14 }}>Online</Text>
    </View>
    <TouchableOpacity style={{ marginLeft: 'auto' }} onPress={() => {}}>
      <MaterialIcons name="expand-more" size={28} color="white" />
    </TouchableOpacity>
  </View>
));

const ChatList = ({ messages, loading, scrollViewRef }) => (
  <ScrollView
    ref={scrollViewRef}
    keyboardShouldPersistTaps="always"
    onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
    style={{ paddingHorizontal: 12, flex: 1 }}
  >
    {messages.map((msg, i) => (
      <View
        key={i}
        style={{
          alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
          backgroundColor: msg.sender === 'user' ? '#007AFF' : '#e0e0e0',
          padding: 14,
          borderRadius: 24,  // Increased for more rounded bubbles
          marginVertical: 6,
          marginHorizontal: 8,
          maxWidth: '80%',
          transition: 'all 0.3s ease',  // Added transition for smooth hover effect
        }}
        onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
        onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
      >
        <Text style={{ fontSize: 16, color: msg.sender === 'user' ? 'white' : 'black' }}>
          {msg.text}
        </Text>
      </View>
    ))}
    {loading && (
      <ActivityIndicator size="large" color="gray" style={{ marginTop: 12 }} />
    )}
  </ScrollView>
);

const ChatInput = ({ input, setInput, onSend }) => (
  <View style={{
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderTopWidth: 1,
    borderColor: '#e0e0e0',
    backgroundColor: 'white',
  }}>
    <TouchableOpacity onPress={() => {}} style={{ padding: 6 }}>
      <MaterialIcons name="emoji-emotions" size={28} color="gray" />
    </TouchableOpacity>
    <TextInput
      style={{
        flex: 1,
        backgroundColor: '#f0f0f0',
        borderRadius: 24,
        paddingHorizontal: 18,
        paddingVertical: 12,
        marginHorizontal: 10,
        fontSize: 16,
      }}
      placeholder="Type your message"
      placeholderTextColor="#999"
      value={input}
      onChangeText={setInput}
    />
    <TouchableOpacity onPress={() => {}} style={{ padding: 6 }}>
      <MaterialIcons name="attach-file" size={28} color="gray" />
    </TouchableOpacity>
    <TouchableOpacity onPress={onSend} style={{ padding: 6 }}>
      <MaterialIcons name="send" size={28} color="#007AFF" />
    </TouchableOpacity>
  </View>
);

export default function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollViewRef = useRef(null);

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
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
        <ChatHeader />
        <ChatList messages={messages} loading={loading} scrollViewRef={scrollViewRef} />
        <ChatInput input={input} setInput={setInput} onSend={sendMessage} />
      </View>
    </KeyboardAvoidingView>
  );
}
