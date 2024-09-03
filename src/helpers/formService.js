import axios from 'axios';

const API_URL = 'https://form-psind-backend-89b9de53d3ee.herokuapp.com/api/forms';


export const submitForm = async (formData) => {
  try {
    const response = await axios.post(API_URL, formData);
    return response.data;
  } catch (error) {
    console.error('Erro ao enviar formulário:', error);
    throw error;
  }
};