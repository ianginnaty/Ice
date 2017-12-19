import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslatorService } from '../core/translator/translator.service';
import { MenuService } from '../core/menu/menu.service';
import { SharedModule } from '../shared/shared.module';
import { PagesModule } from './pages/pages.module';

import { menu } from './menu';
import { routes } from './routes';
//
// import { LunchComponent } from '../components/lunch/lunch.component';
// import { ClientComponent } from '../components/client/client.component';
// import { UserComponent } from '../components/user/user.component';
// import { RegisterComponent } from '../components/register/register.component';
// import { LoginComponent } from '../components/login/login.component';
// import { EditClientComponent } from '../components/edit-client/edit-client.component';
// import { AddClientComponent } from '../components/add-client/add-client.component';

// const routes: Routes = [
//   { path: '', redirectTo: '/login', pathMatch: 'full' },
//   { path: 'lunch', component: LunchComponent, canActivate:[AuthGuard] },
//   { path: 'client', component: ClientComponent, canActivate:[AuthGuard] },
//   { path: 'user', component: UserComponent, canActivate:[AuthGuard] },
//   { path: 'register', component: RegisterComponent },
//   { path: 'login', component: LoginComponent },
//   { path: 'edit-client', component: EditClientComponent },
//   { path: 'add-client', component: AddClientComponent }
// ];

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forRoot(routes),
        PagesModule
    ],
    declarations: [],
    exports: [
        RouterModule
    ]
})

export class RoutesModule {
    constructor(public menuService: MenuService, tr: TranslatorService) {
        menuService.addMenu(menu);
    }
}
