import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const ListaKomponens = ({ elem }) => {
  return (
    <div className="container">
      <div className="row m-3 p-3 border">
        <img src={elem.image_url} alt="" width="150" />
        <h3>{elem.name}</h3>
        Születési dátum: {elem.birth_date}
        <br />
        Világbajnoki címek: {elem.world_ch_won}
      </div>
    </div>
  );
};

export const App = () => {
  const [sakkozok, setSakkozok] = useState([]);
  const [adat, setAdat] = useState(null);
  const [hiba, setHiba] = useState('');
  const [id] = useState(3);

  useEffect(() => {
    const osszesBetoltes = async () => {
      try {
        const response = await axios.get(
          'https://chess.sulla.hu/chess'
        );
        setSakkozok(response.data);
      } catch (error) {
        setHiba(error.message);
      }
    };

    osszesBetoltes();
  }, []);

  useEffect(() => {
    const egyBetoltes = async () => {
      try {
        const response = await axios.get(
          `https://chess.sulla.hu/chess/${id}`
        );
        setAdat(response.data);
      } catch (error) {
        setHiba(error.message);
      }
    };

    egyBetoltes();
  }, [id]);

  return (
    <div className="container">
      <h1>Sakkozók listája</h1>

      {hiba && <p>Hiba: {hiba}</p>}

      <h2>GET - Összes sakkozó</h2>

      {sakkozok.map((elem) => (
        <ListaKomponens
          key={elem.id}
          elem={elem}
        />
      ))}

      <hr />

      <h2>GET ID - Egy sakkozó</h2>

      {adat && <ListaKomponens elem={adat} />}
    </div>
  );
};

