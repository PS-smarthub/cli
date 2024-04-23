import {rename} from "fs"

const nomeAntigo = 'app-template';
const nomeNovo = 'sot';

rename(nomeAntigo, nomeNovo, (err) => {
  if (err) {
    console.error('Erro ao renomear a pasta:', err);
    return;
  }

  console.log('Pasta renomeada com sucesso!');
});