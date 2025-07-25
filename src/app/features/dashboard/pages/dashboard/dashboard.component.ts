import { Component, inject, OnInit, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { DashboardStatisticsComponent } from "../../components/dashboard-statistics/dashboard-statistics.component";
import { MentorpostService } from '../../../post/services/mentorpost.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { MentorPost } from '../../../post/models/mentorpost.model';
import { Timestamp } from '@angular/fire/firestore';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink, DashboardStatisticsComponent, DatePipe],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent{
  mentorPostService = inject(MentorpostService);

  mentorPosts = toSignal(this.mentorPostService.getMentorPosts());

  totalMentors = computed(()=>{
    return this.mentorPosts()?.length ?? 0;
  });

  totalActiveMentors = computed(()=>{
    return this.mentorPosts()?.filter(post => post.status === 'Active').length ?? 0;
  });

  totalInactiveMentors = computed(()=>{
    return this.mentorPosts()?.filter(post => post.status === 'Inactive').length ?? 0;
  });

  totalInProgressMentors = computed(()=>{
    return this.mentorPosts()?.filter(post => post.status === 'In-Progress').length ?? 0;
  });

  convertTimestampToDate(timestamp: Timestamp){
    return timestamp.toDate(); 
  }

  onImageError(event: Event) {
    const target = event.target as HTMLImageElement;
    if (target) {
      target.src = 'assets/images/default-avatar.png';
    }
  }

  getStatusBadgeClass(status: string): string {
    const statusClasses: { [key: string]: string } = {
      'In-Progress': 'bg-yellow-50 text-yellow-800 ring-yellow-600/20',
      'Active': 'bg-green-50 text-green-700 ring-green-600/20',
      'Inactive': 'bg-gray-50 text-gray-600 ring-gray-500/10'
    };
    
    return statusClasses[status] || 'bg-gray-50 text-gray-600 ring-gray-500/10';
  }
}
