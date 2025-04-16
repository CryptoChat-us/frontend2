import { authService } from '../services/authService';

export const testAuthFlows = async () => {
  try {
    // Test signup flow
    console.log('Testing signup...');
    await authService.signup('test@example.com', 'Test123!');
    console.log('✅ Signup successful');

    // Test login flow
    console.log('Testing login...');
    await authService.login('test@example.com', 'Test123!');
    console.log('✅ Login successful');

    // Test Google login flow
    console.log('Testing Google login...');
    await authService.loginWithGoogle();
    console.log('✅ Google login successful');

    // Test token validation
    console.log('Testing token validation...');
    const token = localStorage.getItem('cryptoChat.token');
    if (token) {
      await authService.validateToken(token);
      console.log('✅ Token validation successful');
    }

    return true;
  } catch (error) {
    console.error('❌ Auth flow test failed:', error);
    return false;
  }
};
