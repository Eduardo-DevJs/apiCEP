import { useState } from 'react';
import { IMaskInput } from 'react-imask';

const App = () => {
  const [address, setAddress] = useState('');
  const [cep, setCep] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [district, setDistrict] = useState('');

  const handleFields = async () => {
    try {
      const url = `https://cdn.apicep.com/file/apicep/${cep}.json`;
      const data = await fetch(url);
      const response = await data.json();

      setAddress(response.address);
      setCity(response.city);
      setState(response.state);
      setDistrict(response.district);

    } catch (error) {
      console.error('Erro ao preencher campos: ', error);
      alert("CEP INVALIDO")
    }
  };

  const handleTabPress = (event) => {
    if (event.key === 'Tab') {
      handleFields();
    }
  };

  return (
    <div className="container">
      <h2>BuscaCep <a href="https://apicep.com/api-de-consulta/"> -- API Link --</a></h2>
      <form className="form">
        <div className="form_group">
          <div id="cep">
            <label htmlFor="cep">CEP</label>
            <IMaskInput
              mask={'00000-000'}
              onChange={(e) => setCep(e.target.value)}
              onKeyDown={handleTabPress}
            />
          </div>
          <div id="estado">
            <label htmlFor="estado">Estado</label>
            <input type="text" value={state} readOnly />
          </div>
          <div id="cidade">
            <label htmlFor="cidade">Cidade</label>
            <input type="text" value={city} readOnly />
          </div>
        </div>
        <div className="form_group">
          <div id="cidade">
            <label htmlFor="bairro">Bairro</label>
            <input type="text" value={district} readOnly />
          </div>
          <div id="endereco">
            <label htmlFor="endereco">Endereço</label>
            <input type="text" value={address} readOnly />
          </div>
        </div>
      </form>
    </div>
  );
};

export default App;
