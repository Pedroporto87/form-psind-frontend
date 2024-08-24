import { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Home.scss';

const Home = () => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    crp: '',
    cidade: '',
    situacao: '',
    areaAtuacao: '',
    especificarAreaAtuacao: '',
    regimeTrabalho: '',
    nomeEmpresa: [],
    orgaoEfetivo: [],
    orgaoTemporario: [],
    prestacaoServico: [],
    terceirizadoEmpresa: [],
    cooperativaNome: [],
    outrosRegime: [],
    sugestoes: ''
  });

  const [cidades, setCidades] = useState([]);
  const [filteredCidades, setFilteredCidades] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [extraFields, setExtraFields] = useState([]);

  useEffect(() => {
    const fetchCidades = async () => {
      try {
        const response = await axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados/23/municipios');
        setCidades(response.data);
      } catch (error) {
        console.error('Erro ao buscar cidades:', error);
      }
    };

    fetchCidades();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    if (name === 'cidade') {
      if (value.length > 0) {
        const filtered = cidades.filter(cidade => cidade.nome.toLowerCase().includes(value.toLowerCase()));
        setFilteredCidades(filtered);
        setShowSuggestions(true);
      } else {
        setShowSuggestions(false);
      }
    }
  };

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
      nomeEmpresa: [],
      orgaoEfetivo: [],
      orgaoTemporario: [],
      prestacaoServico: [],
      terceirizadoEmpresa: [],
      cooperativaNome: [],
      outrosRegime: []
    });
    setExtraFields([]);
  };

  const handleSuggestionClick = (cidadeNome) => {
    setFormData({
      ...formData,
      cidade: cidadeNome
    });
    setShowSuggestions(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.nome || !formData.email || !formData.telefone || !formData.cidade || !formData.situacao || !formData.areaAtuacao || !formData.regimeTrabalho || !formData.sugestoes) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    if (formData.areaAtuacao === 'Outros' && !formData.especificarAreaAtuacao) {
      alert('Por favor, especifique a área de atuação.');
      return;
    }

    if (formData.regimeTrabalho === 'CLT' && !formData.nomeEmpresa) {
      alert('Por favor, preencha o nome da empresa.');
      return;
    }
    if (formData.regimeTrabalho === 'Servidor Efetivo' && !formData.orgaoEfetivo) {
      alert('Por favor, preencha o órgão.');
      return;
    }
    if (formData.regimeTrabalho === 'Servidor Temporário' && !formData.orgaoTemporario) {
      alert('Por favor, preencha o órgão.');
      return;
    }
    if (formData.regimeTrabalho === 'Pessoa Jurídica' && !formData.prestacaoServico) {
      alert('Por favor, preencha onde presta serviço.');
      return;
    }
    if (formData.regimeTrabalho === 'Terceirizado' && !formData.terceirizadoEmpresa) {
      alert('Por favor, preencha o nome da empresa terceirizada.');
      return;
    }
    if (formData.regimeTrabalho === 'Cooperativa' && !formData.cooperativaNome) {
      alert('Por favor, preencha o nome da cooperativa.');
      return;
    }
    if (formData.regimeTrabalho === 'Outros' && !formData.outrosRegime) {
      alert('Por favor, especifique o tipo de regime de trabalho.');
      return;
    }

    console.log(formData);
  };

  const addExtraField = () => {
    setExtraFields([...extraFields, '']);
  };

  return (
    <section className='formulario'> 
      <form onSubmit={handleSubmit}>
        <input type="text" name="nome" value={formData.nome} onChange={handleChange} placeholder="Nome" required />
        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="E-mail" required />
        <input type="tel" name="telefone" value={formData.telefone} onChange={handleChange} placeholder="Telefone" required />
        <input type="text" name="crp" value={formData.crp} onChange={handleChange} placeholder="CRP" required />
        <input type="text" name="cidade" value={formData.cidade} onChange={handleChange} placeholder="Cidade" required />
        {showSuggestions && filteredCidades.length > 0 && (
          <ul>
            {filteredCidades.map((cidade, index) => (
              <li key={index} onClick={() => handleSuggestionClick(cidade.nome)}>
                {cidade.nome}
              </li>
            ))}
          </ul>
        )}
        <p>Qual a sua situação atual, em relação ao PSIND-CE?</p>
        <select name="situacao" value={formData.situacao} onChange={handleChange} required>
          <option value="">Selecione sua situação</option>
          <option value="Filiado">Filiado</option>
          <option value="Não Sei">Não Sei</option>
          <option value="Quero me filiar">Quero me filiar</option>
          <option value="Quero conhecer melhor o sindicato">Quero conhecer melhor o sindicato</option>
        </select>
        <p>Qual sua área de atuação?</p>
        <select name="areaAtuacao" value={formData.areaAtuacao} onChange={handleSelectChange} required>
          <option value="">Selecione sua área de atuação</option>
          <option value="Clinica">Clínica</option>
          <option value="Pesquisa/Acadêmica">Pesquisa/Acadêmica</option>
          <option value="Organizacional/Trabalho">Organizacional/Trabalho</option>
          <option value="Assistência Social/Comunitária">Assistência Social/Comunitária</option>
          <option value="Educacional/Escolar">Educacional/Escolar</option>
          <option value="Saúde">Saúde</option>
          <option value="Outros">Outros</option>
        </select>
        {formData.areaAtuacao === 'Outros' && (
          <div className="typeJobs">
            <label htmlFor="especificarAreaAtuacao">Especifique a área de atuação:</label>
            <input type="text" name="especificarAreaAtuacao" value={formData.especificarAreaAtuacao} onChange={handleChange} placeholder="Especifique a área de atuação" required />
          </div>
        )}
        <p>Qual seu regime de trabalho?</p>
        <select name="regimeTrabalho" value={formData.regimeTrabalho} onChange={handleSelectChange} required>
          <option value="">Selecione seu regime de trabalho</option>
          <option value="CLT">CLT</option>
          <option value="Servidor Efetivo">Servidor Efetivo</option>
          <option value="Servidor Temporário">Servidor Temporário</option>
          <option value="Autônomo">Autônomo</option>
          <option value="Pessoa Jurídica">Contrato de pres. de serviço</option>
          <option value="Terceirizado">Terceirizado</option>
          <option value="Cooperativa">Cooperativa</option>
          <option value="Outros">Outros</option>
        </select>
        {formData.regimeTrabalho === 'CLT' && (
          <div className="typeJobs">
            <label htmlFor="nomeEmpresa">Qual empresa você trabalha?</label>
            <input type="text" name="nomeEmpresa" value={formData.nomeEmpresa} onChange={handleChange} placeholder="Nome da Empresa" required />
            {extraFields.map((_, index) => (
              <input key={index} type="text" name={`nomeEmpresa${index}`} placeholder="Nome da Empresa" required />
            ))}
            <button type="button" className="add-icon" onClick={addExtraField}>Possui outro vínculo?</button>
          </div>
        )}
        {formData.regimeTrabalho === 'Servidor Efetivo' && (
          <div className="typeJobs">
            <label htmlFor="orgaoEfetivo">Qual órgão público você trabalha?</label>
            <input type="text" name="orgaoEfetivo" value={formData.orgaoEfetivo} onChange={handleChange} placeholder="Qual o órgão?" required />
            {extraFields.map((_, index) => (
              <input key={index} type="text" name={`orgaoEfetivo${index}`} placeholder="Qual o órgão?" required />
            ))}
            <button type="button" className="add-icon" onClick={addExtraField}>Possui outro vínculo?</button>
          </div>
        )}
        {formData.regimeTrabalho === 'Servidor Temporário' && (
          <div className="typeJobs">
            <label htmlFor="orgaoTemporario">Qual órgão público você trabalha?</label>
            <input type="text" name="orgaoTemporario" value={formData.orgaoTemporario} onChange={handleChange} placeholder="Qual o órgão?" required />
            {extraFields.map((_, index) => (
              <input key={index} type="text" name={`orgaoTemporario${index}`} placeholder="Qual o órgão?" required />
            ))}
            <button type="button" className="add-icon" onClick={addExtraField}>Possui outro vínculo?</button>
          </div>
        )}
        {formData.regimeTrabalho === 'Pessoa Jurídica' && (
          <div className="typeJobs">
            <label htmlFor="prestacaoServico">Em qual empresa você trabalha?</label>
            <input type="text" name="prestacaoServico" value={formData.prestacaoServico} onChange={handleChange} placeholder="Onde presta serviço?" required />
            {extraFields.map((_, index) => (
              <input key={index} type="text" name={`prestacaoServico${index}`} placeholder="Onde presta serviço?" required />
            ))}
            <button type="button" className="add-icon" onClick={addExtraField}>Possui outro vínculo?</button>
          </div>
        )}
        {formData.regimeTrabalho === 'Terceirizado' && (
          <div className="typeJobs">
            <label htmlFor="terceirizadoEmpresa">Qual empresa terceirizada você trabalha?</label>
            <input type="text" name="terceirizadoEmpresa" value={formData.terceirizadoEmpresa} onChange={handleChange} placeholder="Nome da Empresa Terceirizada" required />
          </div>
        )}
        {formData.regimeTrabalho === 'Cooperativa' && (
          <div className="typeJobs">
            <label htmlFor="cooperativaNome">Qual cooperativa você trabalha?</label>
            <input type="text" name="cooperativaNome" value={formData.cooperativaNome} onChange={handleChange} placeholder="Nome da Cooperativa" required />
          </div>
        )}
        {formData.regimeTrabalho === 'Outros' && (
          <div className="typeJobs">
            <label htmlFor="outrosRegime">Especifique o tipo de regime de trabalho:</label>
            <input type="text" name="outrosRegime" value={formData.outrosRegime} onChange={handleChange} placeholder="Especifique o tipo de regime" required />
          </div>
        )}
        <textarea name="sugestoes" value={formData.sugestoes} onChange={handleChange} placeholder="Observações/Sugestões" required />
        <button type="submit">Enviar</button>
      </form>
    </section>
  );
};

export default Home;