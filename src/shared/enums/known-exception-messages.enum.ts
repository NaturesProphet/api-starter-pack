export enum KnownExceptionMessages {
  BAD_REQUEST = 'Requisição inválida',
  INVALID_FK = 'Foreign key inválida',
  NOT_FOUND = 'Não foi encontrado nenhum registro',
  UNKNOWN_COLUMN = 'Coluna desconhecida',
  UNKNOWN_TABLE = 'Tabela não existe',
  UNKNOWN = 'Um erro inesperado aconteceu',
  UNAUTHORIZED = 'Acesso não autorizado',
}

export function fluentValidatorMenssagemConhecida ( campo: any ): string {
  return `Campo ${campo.toLowerCase()} inválido.`;
}
