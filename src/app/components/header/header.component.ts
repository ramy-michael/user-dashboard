import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private router: Router) { }

  searchUser(userId: any): void {
    setTimeout(()=>{
      const id = parseInt(userId.target.value);
        if (!isNaN(id)) {
        console.log(id)
        // window.location.href="users-detail/"+id;
        this.router.navigate(['/users-detail', id]);
      }
      },1000)
    }
}
