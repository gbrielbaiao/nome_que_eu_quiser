import { NextResponse } from "next/server";

const database = [
    { id: 1, name: 'Pelé', gols: 1281, assistencias: 500, posicao: 'Atacante' },
    { id: 2, name: 'Diego Maradona', gols: 345, assistencias: 200, posicao: 'Meio-campista' },
    { id: 3, name: 'Ryam', gols: 1281, assistencias: 500, posicao: 'Atacante' },
    { id: 4, name: 'Cristiano Ronaldo', gols: 1281, assistencias: 500, posicao: 'Atacante' }
]

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const nome = searchParams.get('nome');

    if (!nome) {
        return NextResponse.json({error: 'Nome do jogador é obrigatório.'}, {status: 400})
    }

    const nomeBusca = nome.toLowerCase().trim();

    const jogador = database.find(jogador => jogador.name.toLocaleLowerCase() === nomeBusca);

    if (!jogador) {
        return NextResponse.json({ error: 'Jogador não encontrado.' }, { status: 404 });
    }

    return NextResponse.json(jogador);
}