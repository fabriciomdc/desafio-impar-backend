import postgres from 'postgres';

const sql = postgres('postgres://postgres:docker@localhost:5432/desafio-impar');

export { sql };
