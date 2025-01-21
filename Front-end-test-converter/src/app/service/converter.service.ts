import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class ConverterService {
  private storage: Storage | null = null;

  constructor(private storageService: Storage) {
    this.init();
  }

  /* Método de iniciar o armazenamento local storage */
  async init() {
    try {
      const storage = await this.storageService.create();
      this.storage = storage; // Inicializando corretamente o storage
    } catch (error) {
      console.error('Erro ao inicializar o Storage', error);
    }
  }

  /* Método de captura a Taxa de conversão usando fetch */
  async getConverterRate(from: string, to: string, amount: number): Promise<number> {
    const api = `https://economia.awesomeapi.com.br/json/last/${from}-${to}`;


    try {
      // Validações 
      if (isNaN(amount) || amount <= 0) {
        throw new Error('O valor para conversão deve ser um número positivo.');
      }

      const response = await fetch(api);
      if (!response.ok) {
        throw new Error(`Erro ao buscar a taxa de conversão: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Dados da API:', data);

      const rate = parseFloat(data[`${from.toUpperCase()}${to.toUpperCase()}`]?.ask);
      if (isNaN(rate)) {
        throw new Error(`Taxa de conversão não encontrada para ${from} para ${to}`);
      }

      return amount * rate; // Retorna o valor convertido
    } catch (error) {
      console.error('Erro ao fazer a requisição de conversão', error);
      throw new Error('Erro ao realizar a conversão. Tente novamente mais tarde.');
    }
  }

  /* Salva no localStorage e armazena no histórico do navegador */
  async historicSalve(converter: any) {

    if (!this.storage) {
      console.error('Storage não foi inicializado corretamente.');
      return;
    }
    const historic = (await this.storage.get('historic')) || [];
    
    // Verificar se o item já existe no histórico (evitar duplicação)
    const exists = historic.some((item: any) => item.from === converter.from && item.to === converter.to);

    if (!exists) {
      historic.unshift(converter); // Adicionando o novo item no início do histórico

      await this.storage.set('historic', historic); // Salvando o histórico atualizado
    }
  }

  /* Método Exibe o histórico */
  async getHistoric() {

    const historic = await this.storage?.get('historic');
    
    if (!historic || !Array.isArray(historic)) {
      console.log('Nenhum histórico encontrado');
      return [];
    }
    return historic;
  }

  /* Método para pegar todas as moedas disponíveis */
  async getAllCurrencies(): Promise<any> {
    const api = 'https://economia.awesomeapi.com.br/json/available/';

    try {
      const response = await fetch(api);
      if (!response.ok) {
        throw new Error(`Erro ao buscar as moedas disponíveis: ${response.statusText}`);
      }
      const data = await response.json();
      return data; // Retorna todas as moedas disponíveis
    } catch (error) {
      console.error('Erro ao buscar as moedas disponíveis', error);
      throw new Error('Erro ao buscar as moedas disponíveis. Tente novamente mais tarde.');
    }
  }
}


