import { Component, inject, computed, signal, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { DashboardStatisticsComponent } from "../../components/dashboard-statistics/dashboard-statistics.component";
import { MentorpostService } from '../../../post/services/mentorpost.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { MentorPost } from '../../../post/models/mentorpost.model';
import { Timestamp } from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';
import * as XLSX from 'xlsx';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink, DashboardStatisticsComponent, DatePipe, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  mentorPostService = inject(MentorpostService);
  toastr = inject(ToastrService);

  mentorPosts = toSignal(this.mentorPostService.getMentorPosts());
  mentorPostsLoading = signal<MentorPost[] | undefined>(undefined);
  searchQuery = signal('');
  currentPage = signal(1);
  itemsPerPage = 10;

  ngOnInit(): void {
    this.loadMentors();
  }


  loading = true;
  loadMentors(){
    this.loading = true;
    this.mentorPostService.getMentorPosts().subscribe({
      next: (data) =>{
        this.mentorPostsLoading.set(data);
        this.loading = false;
      },
      error:()=>{
        this.loading = false;
      }
    })
  }
 

  totalMentors = computed(() => {
    return this.mentorPosts()?.length ?? 0;
  });

  totalActiveMentors = computed(() => {
    return this.mentorPosts()?.filter(post => post.status === 'Active').length ?? 0;
  });

  totalInactiveMentors = computed(() => {
    return this.mentorPosts()?.filter(post => post.status === 'Inactive').length ?? 0;
  });

  totalInProgressMentors = computed(() => {
    return this.mentorPosts()?.filter(post => post.status === 'In-Progress').length ?? 0;
  });

  filteredMentorPosts = computed(() => {
    const query = this.searchQuery().toLowerCase().trim();
    const posts = this.mentorPosts() ?? [];

    if (!query) {
      return posts;
    }

    return posts.filter((post) => {
      return post.firstname.toLowerCase().includes(query) ||
        post.lastname.toLowerCase().includes(query) ||
        post.program.toLowerCase().includes(query);
    });
  });

  paginatedMentorPosts = computed(() => {
    const start = (this.currentPage() - 1) * this.itemsPerPage;
    const posts = this.filteredMentorPosts();
    return posts.slice(start, start + this.itemsPerPage);
  });

  totalPages = computed(() => {
    const total = Math.ceil(this.filteredMentorPosts().length / this.itemsPerPage);
    return total > 0 ? total : 1;
  });

  pageNumbers = computed(() => {
    const total = this.totalPages();
    const current = this.currentPage();
    const pages: number[] = [];

    if (total <= 7) {
      // Show all pages if 7 or fewer
      for (let i = 1; i <= total; i++) {
        pages.push(i);
      }
    } else {
      // Show smart pagination with ellipsis
      if (current <= 4) {
        // Show first 5 pages + ellipsis + last page
        for (let i = 1; i <= 5; i++) {
          pages.push(i);
        }
        pages.push(-1); // Ellipsis
        pages.push(total);
      } else if (current >= total - 3) {
        // Show first page + ellipsis + last 5 pages
        pages.push(1);
        pages.push(-1); // Ellipsis
        for (let i = total - 4; i <= total; i++) {
          pages.push(i);
        }
      } else {
        // Show first page + ellipsis + current-1, current, current+1 + ellipsis + last page
        pages.push(1);
        pages.push(-1); // Ellipsis
        for (let i = current - 1; i <= current + 1; i++) {
          pages.push(i);
        }
        pages.push(-1); // Ellipsis
        pages.push(total);
      }
    }

    return pages;
  });

  startItem = computed(() => {
    return (this.currentPage() - 1) * this.itemsPerPage + 1;
  });

  endItem = computed(() => {
    return Math.min(this.currentPage() * this.itemsPerPage, this.filteredMentorPosts().length);
  });

  convertTimestampToDate(timestamp: Timestamp) {
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
      'In-Progress': 'bg-yellow-100 text-yellow-800 ring-yellow-600/20',
      'Active': 'bg-green-100 text-green-700 ring-green-600/20',
      'Inactive': 'bg-gray-200 text-gray-600 ring-gray-500/10'
    };

    return statusClasses[status] || 'bg-gray-50 text-gray-600 ring-gray-500/10';
  }

  onSearchChange(value: string) {
    this.searchQuery.set(value);
    this.currentPage.set(1); // Reset to first page when searching
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage.set(page);
    }
  }

  previousPage() {
    if (this.currentPage() > 1) {
      this.currentPage.set(this.currentPage() - 1);
    }
  }

  nextPage() {
    if (this.currentPage() < this.totalPages()) {
      this.currentPage.set(this.currentPage() + 1);
    }
  }

  trackByPage(index: number, page: number): number {
    return page;
  }

  downloadExcel() {
    this.mentorPostService.getMentorPosts().subscribe((data: MentorPost[]) => {
      const worksheet = XLSX.utils.json_to_sheet(data);
      const workbook = XLSX.utils.book_new();

      XLSX.utils.book_append_sheet(workbook, worksheet, 'Mentors');
      XLSX.writeFile(workbook, 'Mentors.xlsx');
    })
    // alert('Successfully download');
    this.toastr.success('Successfully download', 'Success');
  }

  isFollowUpDue(post: MentorPost): boolean {
    if (!post.createdAt || !post.followUpInterval) return false;

    const createdDate = new Date(post.createdAt);
    const now = new Date();

    // followUpInterval is expected in days
    const diffInMs = now.getTime() - createdDate.getTime();
    const diffInDays = diffInMs / (1000 * 60 * 60 * 24); // is used to convert days into milliseconds

    return diffInDays >= post.followUpInterval;
  }

  // getFollowUpDueDate(createdAt: string, intervalDays: number): Date {
  //   const created = new Date(createdAt);
  //   return new Date(created.getTime() + intervalDays * 24 * 60 * 60 * 1000);
  // }

  // converted to Firestore

  getFollowUpDueDate(createdAt: string | Timestamp | undefined, intervalDays: number): Date | null {
    if (!createdAt) return null;

    let createdDate: Date;

    if (typeof createdAt === 'string') {
      createdDate = new Date(createdAt);
    } else if (createdAt instanceof Timestamp) {
      createdDate = createdAt.toDate();
    } else {
      return null;
    }

    return new Date(createdDate.getTime() + intervalDays * 24 * 60 * 60 * 1000);
  }

}
