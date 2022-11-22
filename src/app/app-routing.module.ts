import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorksComponent} from './components/works/works.component';

const routes: Routes = [
    {path: 'works', component: WorksComponent},
    {path: '' , redirectTo:'works', pathMatch: 'full'},
    {path: '**', redirectTo:'works', pathMatch: 'full'}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
