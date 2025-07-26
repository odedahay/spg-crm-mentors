import { Routes } from '@angular/router';
import { CreatePostComponent } from './features/post/pages/create-post/create-post.component';
import { DashboardComponent } from './features/dashboard/pages/dashboard/dashboard.component';

export const routes: Routes = [
    {
        path: 'create-post',
        component: CreatePostComponent
    },
    {
        path: 'dashboard',
        component: DashboardComponent
    }
];
