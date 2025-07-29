import { Routes } from '@angular/router';
import { CreatePostComponent } from './features/post/pages/create-post/create-post.component';
import { DashboardComponent } from './features/dashboard/pages/dashboard/dashboard.component';
import { EditPostComponent } from './features/post/pages/edit-post/edit-post.component';
import { RegisterComponent } from './features/user/pages/register/register.component';
import { LoginComponent } from './features/user/pages/login/login.component';
import { LogoutComponent } from './features/user/pages/logout/logout.component';
import { authGuard } from './core/guards/auth.guard'

export const routes: Routes = [
    {
        path: '',
        component: LoginComponent,
        pathMatch: 'full',
    },
    {
        path: 'create-post',
        component: CreatePostComponent,
        canActivate: [authGuard]
    },
    {
        path: 'edit-post/:id',
        component: EditPostComponent,
        canActivate: [authGuard]
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [authGuard]
    },
    {
        path: 'register',
        component: RegisterComponent
    }
    ,
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'logout',
        component: LogoutComponent
    }
];
