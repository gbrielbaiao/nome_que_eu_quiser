'use client';

import { useState } from 'react';

interface Jogador {
  id: number;
  name: string;
  gols: number;
  assistencias: number;
  posicao: string;
}

export default function Home() {
  const [nome, setNome] = useState('');
  const [jogador, setJogador] = useState<Jogador | null>(null);
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  const buscarJogador = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!nome.trim()) {
      setErro('Digite o nome do jogador');
      return;
    }

    setCarregando(true);
    setErro('');
    setJogador(null);

    try {
      const response = await fetch(`/api/jogador?nome=${encodeURIComponent(nome)}`);
      
      if (!response.ok) {
        const data = await response.json();
        setErro(data.error || 'Erro ao buscar jogador');
        return;
      }

      const data = await response.json();
      setJogador(data);
    } catch (err) {
      setErro('Erro na conexão com o servidor');
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <main className="max-w-2xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <h1 className="text-4xl font-bold text-center mb-2 text-blue-600 dark:text-blue-400">
            ⚽ Busca de Jogadores
          </h1>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
            Encontre informações sobre jogadores de futebol
          </p>

          <form onSubmit={buscarJogador} className="mb-8">
            <div className="flex gap-2">
              <input
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Digite o nome do jogador..."
                className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              />
              <button
                type="submit"
                disabled={carregando}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold rounded-lg transition-colors"
              >
                {carregando ? 'Buscando...' : 'Buscar'}
              </button>
            </div>
          </form>

          {erro && (
            <div className="bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-200 px-4 py-3 rounded-lg mb-6">
              {erro}
            </div>
          )}

          {jogador && (
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-gray-700 dark:to-gray-600 rounded-lg p-8 space-y-6">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-blue-600 dark:text-blue-300 mb-2">
                  {jogador.name}
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-300 font-semibold">
                  {jogador.posicao}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 text-center">
                  <p className="text-gray-600 dark:text-gray-400 text-sm font-semibold mb-2">
                    GOLS
                  </p>
                  <p className="text-4xl font-bold text-blue-600 dark:text-blue-400">
                    {jogador.gols}
                  </p>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 text-center">
                  <p className="text-gray-600 dark:text-gray-400 text-sm font-semibold mb-2">
                    ASSISTÊNCIAS
                  </p>
                  <p className="text-4xl font-bold text-green-600 dark:text-green-400">
                    {jogador.assistencias}
                  </p>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <span className="font-semibold">ID:</span> {jogador.id}
                </p>
              </div>
            </div>
          )}

          {!jogador && !erro && !carregando && (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                Digite o nome de um jogador para começar
              </p>
              <div className="mt-4 text-sm text-gray-600 dark:text-gray-500">
                <p>Exemplos: Pelé, Diego Maradona, Ryam, Cristiano Ronaldo</p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
