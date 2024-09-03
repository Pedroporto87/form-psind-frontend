import axios from 'axios';

const API_URL = 'https://form-psind-backend-89b9de53d3ee.herokuapp.com/api/forms';

export const submitForm = async (formData) => {
  try {
    const response = await axios.post(API_URL, formData);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error('Erro ao enviar formulário.');
    }
  }
};