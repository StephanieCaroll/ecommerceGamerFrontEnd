import Login from '../components/Login';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function LoginPage() {
  const router = useRouter();
  const [usuarioLogado, setUsuarioLogado] = useState(null);

  const handleLoginSuccess = (usuario) => {
    setUsuarioLogado(usuario);
    router.push('/');
  };

  return (
    <div>
      <Login onLoginSuccess={handleLoginSuccess} />
    </div>
  );
}
