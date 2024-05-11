import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements  OnInit{

  users: any[] = [];
  loading: boolean = true;
  currentPage: number = 1;
  totalPages: number = 1;

  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.loading = true;
    this.apiService.getUsers(this.currentPage).subscribe((response: any) => {
      this.users = response.data;
      this.totalPages = response.total_pages;
      this.loading = false;
    });
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadUsers();
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadUsers();
    }
  }

  navigateToUser(userId: number): void {
    this.router.navigate(['/users-detail', userId]);
  }
}
