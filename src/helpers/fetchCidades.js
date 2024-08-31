import axios from 'axios'
export const fetchCidades = async () => {
    try {
      const response = await axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados/23/municipios');
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar cidades:', error);
      throw error;
    }
  };