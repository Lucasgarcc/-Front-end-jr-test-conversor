import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IonicStorageModule } from '@ionic/storage-angular'; // Importando o IonicStorageModule

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./components/home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'historic',
    loadComponent: () => import('./components/historic/historic.page').then(m => m.HistoricPage),
  },
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    IonicStorageModule.forRoot(), // Inicialize o armazenamento aqui
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
