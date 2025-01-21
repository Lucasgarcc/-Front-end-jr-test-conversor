import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {IonItem, IonList, IonButton, IonButtons, IonMenuButton} from '@ionic/angular/standalone';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonIcon } from '@ionic/angular/standalone';
import { ConverterService } from '../../service/converter.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-historic',
  templateUrl: './historic.page.html',
  styleUrls: ['./historic.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonButton,
    IonIcon,
    CommonModule,
    IonButtons,
    IonIcon,
    IonMenuButton
  ]
})
export class HistoricPage implements OnInit {
  value: number | null = null;
  currencyOrigin: string = '';
  currencyTarget: string = '';
  convertedValue: number | null = null;
  history: any[] = []; // Histórico
  currencies: any[] = []; // Lista de moedas
  selectedCurrencyOrigin: string = ''; // Moeda de origem
  selectedCurrencyTarget: string = ''; // Moeda de destino

  constructor(private converterService: ConverterService,
              private router: Router  // Adicionado o Router
  ) { }

  ngOnInit() {
    this.loadHistory();     // Carregar o histórico ao inicializar
  }

  navigateToHomePage() {
    this.router.navigate(['/home']);
  }

  async loadHistory() {
    this.history = await this.converterService.getHistoric();
    console.log('Histórico de conversões:', this.history);
  }
}
