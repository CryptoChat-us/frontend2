import { chatService } from '../services/chatService';

export const testChatFunctionality = async () => {
  const testMessages = [
    'Hello, what can you tell me about Bitcoin?',
    'What are the current market trends?',
    'Should I invest in cryptocurrencies?'
  ];

  try {
    console.log('Testing chat functionality...');
    
    // Test basic message sending
    console.log('Testing message sending...');
    for (const message of testMessages) {
      const response = await chatService.sendMessage(message);
      console.log(`✅ Message sent: "${message.substring(0, 20)}..."`);
      console.log(`✅ Response received: "${response.content.substring(0, 20)}..."`);
    }

    // Test media response
    console.log('Testing media response...');
    const mediaResponse = await chatService.sendMessage('Show me Bitcoin price chart');
    if (mediaResponse.type === 'media') {
      console.log('✅ Media response successful');
    }

    // Test error handling
    console.log('Testing error handling...');
    try {
      await chatService.sendMessage('');
      console.log('❌ Empty message should have failed');
    } catch (error) {
      console.log('✅ Error handling successful');
    }

    return true;
  } catch (error) {
    console.error('❌ Chat functionality test failed:', error);
    return false;
  }
};
