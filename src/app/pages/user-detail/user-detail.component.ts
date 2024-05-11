import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit{

  user: any;
  error: string | null = null;
  loading: boolean = true;
  
  constructor(private route: ActivatedRoute, private router: Router, private apiService: ApiService) { }

  ngOnInit(): void {
    this.getUserDetail();
  }

  // getUserDetail(): void {
  //   const id = this.route.snapshot.paramMap.get('id');
  //   if (id !== null) {
  //     const userId = parseInt(id, 10);
  //     console.log(userId);
  //     if (!isNaN(userId)) {
  //       this.apiService.getUserById(userId).subscribe((user: any) => {
  //         this.user = user.data;
  //       });
  //     }
  //   }
  // }

  getUserDetail(): void {
    this.loading = true;
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      const userId = parseInt(id, 10); // Parse id as a base-10 integer

      // console.log(userId + typeof(userId));

      if (!isNaN(userId)) {
        this.apiService.getUserById(userId).subscribe(
          (user: any) => {
            this.user = user.data;
            this.loading = false;
            // console.log(this.user)
          },
          (error) => {
            this.error = 'User not found';
          }
        );
      } else {
        this.error = 'Invalid user ID';
      }
    } else {
      this.error = 'User ID not provided';
    }
  }


  goBack(): void {
    this.router.navigate(['/users']);
    // window.location.href="users";
  }
}
