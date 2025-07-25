import { Routes } from '@angular/router';
import { CreatePostComponent } from './features/post/pages/create-post/create-post.component';
import { DashboardComponent } from './features/dashboard/pages/dashboard/dashboard.component';
import { EditPostComponent } from './features/post/pages/edit-post/edit-post.component';

export const routes: Routes = [
    {
        path: '',
        component: DashboardComponent,
        pathMatch: 'full'
    },
    {
        path: 'create-post',
        component: CreatePostComponent
    },
    {
        path: 'edit-post/:id',
        component: EditPostComponent
    },
    {
        path: 'dashboard',
        component: DashboardComponent
    }
];
