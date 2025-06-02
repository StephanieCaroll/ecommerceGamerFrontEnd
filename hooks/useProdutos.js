import { useState, useEffect } from "react";
import axios from 'axios';

export function useProdutos() {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(false);

  useEffect(() => {
    async function fetchProdutos() {
      try {
        const response = await axios.get("http://localhost:3001/produtos");
        setProdutos(response.data);
      } catch (error) {
        setErro(true);
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchProdutos();
  }, []);

  return { produtos, loading, erro };
}
