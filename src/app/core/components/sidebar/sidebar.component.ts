import { Component, inject, computed, signal, OnInit } from '@angular/core';
import { NavbarService } from '../../services/navbar.service';
import { MentorpostService } from '../../../features/post/services/mentorpost.service';
import { RouterModule } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { MentorPost } from '../../../features/post/models/mentorpost.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  imports: [RouterModule, DatePipe],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {
  navBarService = inject(NavbarService);
  mentorPostService = inject(MentorpostService);

  mentorPosts = toSignal(this.mentorPostService.getMentorPosts());
  followUpList = signal<MentorPost[]>([]);

  ngOnInit(): void {
    this.mentorPostService.getMentorPosts().subscribe(posts => {
      const dueList = (posts ?? []).filter(post => this.mentorPostService.isFollowUpDue(post)).slice(0, 10);
      this.followUpList.set(dueList);
    });
  }

  // isFollowUpDue(post: MentorPost): boolean {
  //   if (!post.createdAt || !post.followUpInterval) return false;

  //   const createdDate = typeof post.createdAt === 'string'
  //     ? new Date(post.createdAt)
  //     : (post.createdAt as any).toDate();

  //   const now = new Date();
  //   const diffInDays = (now.getTime() - createdDate.getTime()) / (1000 * 60 * 60 * 24);

  //   return diffInDays >= post.followUpInterval;
  // }

  getFollowUpDueDate(post: MentorPost): string {
    if (!post.createdAt || !post.followUpInterval) return '';

    const createdDate = typeof post.createdAt === 'string'
      ? new Date(post.createdAt)
      : (post.createdAt as any).toDate();

    const dueDate = new Date(createdDate.getTime() + post.followUpInterval * 24 * 60 * 60 * 1000);
    return dueDate.toLocaleDateString();
  }
}
