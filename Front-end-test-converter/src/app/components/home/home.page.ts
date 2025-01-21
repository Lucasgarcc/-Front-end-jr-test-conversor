import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonList, IonInput, IonButton, IonSelectOption, IonSelect, IonIcon, IonMenuButton, IonButtons} from '@ionic/angular/standalone';
import { ConverterService } from '../../service/converter.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonList,
    IonItem,
    IonInput,
    IonButton,
    FormsModule,
    IonSelect,
    CommonModule,
    IonIcon,
    IonButtons,
    IonContent,
    IonMenuButton,
    IonSelectOption,
],
})
export class HomePage implements OnInit {
  value: number | null = null;
  currencyOrigin: string = '';
  currencyTarget: string = '';
  convertedValue: number | null = null;
  history: any[] = []; // Histórico
  currencies: any[] = []; // Lista de moedas
  selectedCurrencyOrigin: string = ''; // Moeda de origem
  selectedCurrencyTarget: string = ''; // Moeda de destino

  constructor(private converterService: ConverterService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadCurrencies();  // Carregar as moedas ao inicializar o componente
    this.loadHistory();     // Carregar o histórico ao inicializar
  }

  navigateToHistoricPage() { 
    this.router.navigate(['/historic']);
  }
  

  async loadCurrencies() {
    try {
      const data = await this.converterService.getAllCurrencies();
      this.currencies = Object.keys(data).map(key => ({
        code: key,
        name: data[key]
      }));
      console.log(this.currencies);
    } catch (error) {
      console.error('Erro ao carregar as moedas', error);
    }
  }

  async onSubmit() {
    // Lógica de conversão ao enviar o formulário
    if (!this.value || !this.currencyOrigin || !this.currencyTarget) {
      alert('Por favor, preencha todos os campos!');
      return;
    }

    try {
      const rate = await this.converterService.getConverterRate(
        this.currencyOrigin,
        this.currencyTarget,
        this.value
      );

      this.convertedValue = rate;

      const conversionRecord = {
        from: this.currencyOrigin,
        to: this.currencyTarget,
        amount: this.value,
        result: rate,
      };

      await this.converterService.historicSalve(conversionRecord);
      alert(`Valor convertido: ${rate} ${this.currencyTarget}`);
    } catch (error) {
      console.error('Erro ao converter moeda:', error);
      alert('Ocorreu um erro ao tentar realizar a conversão.');
    }
  }

  async loadHistory() {
    this.history = await this.converterService.getHistoric();
    console.log('Histórico de conversões:', this.history);
  }
}
