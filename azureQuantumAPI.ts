import * as SecureStore from 'expo-secure-store';
import axios from 'axios';

export const submitCircuit = async (circuit: string) => {
  const apiKey = await SecureStore.getItemAsync('AZURE_API_KEY');  // Stored securely, not in code
  if (!apiKey) throw new Error('Azure key not set');

  const response = await axios.post('https://your-fastapi-backend.azurewebsites.net/run-circuit', {
    circuit,
  }, {
    headers: { 'Authorization': `Bearer ${apiKey}` }
  });
  return response.data.jobId;
};

export const getCircuitResults = async (jobId: string) => {
  const apiKey = await SecureStore.getItemAsync('AZURE_API_KEY');
  if (!apiKey) throw new Error('Azure key not set');

  const response = await axios.get(`https://your-fastapi-backend.azurewebsites.net/results/${jobId}`, {
    headers: { 'Authorization': `Bearer ${apiKey}` }
  });
  return response.data;
};

// Poll results similarly
