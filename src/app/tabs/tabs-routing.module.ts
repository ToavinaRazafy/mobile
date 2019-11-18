import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'tabs/liste',
    pathMatch: 'full'
  },
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: '',
        redirectTo: 'liste',
        pathMatch: 'prefix'
      },
      {
        path: 'liste',
        loadChildren: '../liste/liste.module#ListePageModule'
      },
      {
        path: 'ajout',
        loadChildren: '../ajout/ajout.module#AjoutPageModule'
      },
       {
        path: 'modification',
        loadChildren: '../modification/modification.module#ModificationPageModule'
      },
      {
        path: 'fiche',
        loadChildren: '../fiche/fiche.module#FichePageModule'
      },
      {
        path: 'profil',
        loadChildren: '../profil/profil.module#ProfilPageModule'
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule { }
