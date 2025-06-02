import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [erro, setErro] = useState("");
  const [isCadastro, setIsCadastro] = useState(false);
  const [nome, setNome] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (senha.length < 6) {
      setErro("A senha deve ter pelo menos 6 caracteres.");
      return;
    }
    if (isCadastro && senha !== confirmarSenha) {
      setErro("As senhas não coincidem.");
      return;
    }
    if (isCadastro) {
      try {
        const response = await axios.post("http://localhost:3001/usuarios", {
          nome_usuario: nome,
          email_usuario: email,
          senha_usuario: senha,
        });
        if (response.status === 201) {
          onLoginSuccess(response.data);
          localStorage.setItem("usuarioLogado", JSON.stringify(response.data));
          router.push("/");
        } else {
          setErro("Erro ao cadastrar. Tente novamente.");
        }
      } catch (error) {
        setErro("Erro ao cadastrar. Tente novamente.");
      }
    } else {
      // Login
      try {
        const response = await axios.get("http://localhost:3001/usuarios");
        if (response.status === 200) {
          const usuario = response.data.find(
            (user) => user.email_usuario === email && user.senha_usuario === senha
          );
          if (usuario) {
            onLoginSuccess(usuario);
            localStorage.setItem("usuarioLogado", JSON.stringify(usuario));
            router.push("/");
          } else {
            setErro("Credenciais inválidas. Tente novamente.");
          }
        } else {
          setErro("Erro ao conectar com o servidor. Tente novamente mais tarde.");
        }
      } catch (error) {
        setErro("Erro ao fazer login. Por favor, tente novamente.");
      }
    }
  };

  return (
    <section aria-label="Tela de login" className="login-container d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
      <div className="login-card p-4 shadow rounded d-flex flex-column align-items-center bg-dark text-white" style={{ maxWidth: 400, width: '100%' }}>
        <h2 className="login-title text-center mb-4" style={{ color: '#fff', fontWeight: 700 }}>{isCadastro ? 'Cadastro' : 'Login'}</h2>
        <form onSubmit={handleSubmit} aria-label={isCadastro ? 'Formulário de cadastro' : 'Formulário de login'} className="w-100" style={{ maxWidth: 340 }}>
          {isCadastro && (
            <>
              <div className="form-group mb-3">
                <label htmlFor="nome" className="form-label" style={{ fontWeight: 500, color: '#fff' }}>Nome:</label>
                <input
                  type="text"
                  id="nome"
                  className="form-control bg-secondary text-white border-0"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  required
                  aria-required="true"
                  aria-label="Digite seu nome"
                />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="email" className="form-label" style={{ fontWeight: 500, color: '#fff' }}>Email:</label>
                <input
                  type="email"
                  id="email"
                  className="form-control bg-secondary text-white border-0"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  aria-required="true"
                  aria-label="Digite seu email"
                />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="senha" className="form-label" style={{ fontWeight: 500, color: '#fff' }}>Senha:</label>
                <input
                  type="password"
                  id="senha"
                  className="form-control bg-secondary text-white border-0"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  required
                  aria-required="true"
                  aria-label="Digite sua senha"
                />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="confirmarSenha" className="form-label" style={{ fontWeight: 500, color: '#fff' }}>Confirmar Senha:</label>
                <input
                  type="password"
                  id="confirmarSenha"
                  className="form-control bg-secondary text-white border-0"
                  value={confirmarSenha}
                  onChange={(e) => setConfirmarSenha(e.target.value)}
                  required
                  aria-required="true"
                  aria-label="Confirme sua senha"
                />
              </div>
            </>
          )}
          {!isCadastro && (
            <>
              <div className="form-group mb-3">
                <label htmlFor="email" className="form-label" style={{ fontWeight: 500, color: '#fff' }}>Email:</label>
                <input
                  type="email"
                  id="email"
                  className="form-control bg-secondary text-white border-0"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  aria-required="true"
                  aria-label="Digite seu email"
                />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="senha" className="form-label" style={{ fontWeight: 500, color: '#fff' }}>Senha:</label>
                <input
                  type="password"
                  id="senha"
                  className="form-control bg-secondary text-white border-0"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  required
                  aria-required="true"
                  aria-label="Digite sua senha"
                />
              </div>
            </>
          )}
          {erro && <p className="error-message text-danger text-center mb-2" role="alert" aria-live="assertive" style={{ fontWeight: 500 }}>{erro}</p>}
          <div className="form-actions d-grid gap-2">
            <button type="submit" className="btn btn-primary" aria-label={isCadastro ? 'Cadastrar' : 'Entrar no sistema'} style={{ fontWeight: 600, fontSize: '1.1rem', padding: '10px 0' }}>
              {isCadastro ? 'Cadastrar' : 'Entrar'}
            </button>
            <button type="button" className="btn btn-outline-light" onClick={() => { setIsCadastro(!isCadastro); setErro(""); }} style={{ fontWeight: 500 }}>
              {isCadastro ? 'Já tem conta? Faça login' : 'Não tem conta? Cadastre-se'}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
