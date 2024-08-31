import axios from 'axios';

//const API_URL = 'https://form-psind-5fbdegynd-pedroporto87s-projects.vercel.app/api/forms';
const testApi = 'http://localhost:3000/api/forms'

export const submitForm = async (formData) => {
  try {
    const response = await axios.post(testApi, formData);
    return response.data;
  } catch (error) {
    console.error('Erro ao enviar formulário:', error);
    throw error;
  }
};