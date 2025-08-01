import { Component, ElementRef, HostListener, inject, input, OnInit, signal } from '@angular/core';
import { NavbarService } from '../../../services/navbar.service';
import { RouterLink } from '@angular/router';
import { User } from '../../../models/user.model';
import { MentorPost } from '../../../../features/post/models/mentorpost.model';
import { MentorpostService } from '../../../../features/post/services/mentorpost.service';
import { SidebarComponent } from '../../sidebar/sidebar.component';

@Component({
  selector: 'app-logged-in-functionality',
  imports: [RouterLink],
  templateUrl: './logged-in-functionality.component.html',
  styleUrl: './logged-in-functionality.component.css'
})
export class LoggedInFunctionalityComponent implements OnInit {
  navBarService = inject(NavbarService);
  eRef = inject(ElementRef);

  user = input.required<User>();
  followUpList = signal<MentorPost[]>([]);
  mentorPostService = inject(MentorpostService);
  

   ngOnInit(): void {
    this.mentorPostService.getMentorPosts().subscribe(posts => {
      const dueList = (posts ?? []).filter(post => this.mentorPostService.isFollowUpDue(post)).slice(0, 10);
      this.followUpList.set(dueList);
    });
  }

  @HostListener('document:click', ['$event'])
  handleOutsideClick(event: Event){
    if(!this.eRef.nativeElement.contains(event.target)){
      this.navBarService.closeUserMenu();
    }

    if(!this.eRef.nativeElement.contains(event.target)){
      this.navBarService.closeSidebar();
    }

  }

}
