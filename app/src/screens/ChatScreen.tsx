import React, { useState, useCallback, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { GiftedChat, IMessage } from 'react-native-gifted-chat';
import { useAuth } from '../contexts/AuthContext';
import { getChatbotResponse } from '../services/chatService';

interface CustomIMessage extends IMessage {
    // You can add custom properties here if needed
}

const ChatScreen = () => {
  const [messages, setMessages] = useState<CustomIMessage[]>([]);
  const { user, token } = useAuth();

  useEffect(() => {
    // Initial message from the chatbot when the screen loads
    setMessages([
      {
        _id: 1,
        text: 'Hello! How can I help you today?',
        createdAt: new Date(),
        user: {
          _id: 2, // AI bot's user ID
          name: 'ChristAI Bot',
        },
      },
    ]);
  }, []);

  const onSend = useCallback((newMessages: CustomIMessage[] = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, newMessages)
    );

    const userMessage = newMessages[0];
    handleBotResponse(userMessage.text);
  }, []);

  const handleBotResponse = async (userMessageText: string) => {
    try {
      if (!token) {
        throw new Error('Authentication token not found.');
      }
      const botResponse = await getChatbotResponse(userMessageText, token);

      const botMessage: CustomIMessage = {
        _id: Math.random().toString(36).substring(7),
        text: botResponse.reply,
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'ChristAI Bot',
        },
      };

      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, [botMessage])
      );
    } catch (error) {
      console.error('Error fetching bot response:', error);
      const errorMessage: CustomIMessage = {
        _id: Math.random().toString(36).substring(7),
        text: 'Sorry, I am having trouble connecting. Please try again later.',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'ChristAI Bot',
        },
      };
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, [errorMessage])
      );
    }
  };

  return (
    <GiftedChat
      messages={messages}
      onSend={(newMessages) => onSend(newMessages as CustomIMessage[])}
      user={{
        _id: user?.uid || 1,
      }}
    />
  );
};

export default ChatScreen; 