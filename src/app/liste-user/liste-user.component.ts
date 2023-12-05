import { Component, OnInit } from '@angular/core';
import { User } from '../model/user.model';
import { Role } from '../model/role.model';
import { AuthService } from '../services/auth.service';
import { FreelancerService } from '../services/freelancer.service';

@Component({
  selector: 'app-liste-user',
  templateUrl: './liste-user.component.html',
  styleUrls: ['./liste-user.component.css']
})
export class ListeUserComponent implements OnInit {
  users? : User[];
  roles?: Role[];
  constructor( private freelancerService: FreelancerService ,private authService:AuthService) {}

  ngOnInit(): void {
    this.chargerUsers();
    console.log(this.users);

  }
  chargerUsers(){
    this.freelancerService.listeUser().
    subscribe((users:any)=>{
    console.log(users);
    this.users=users;
    });
    }
    deleteUser(id: number) {
      const confirmed = confirm("Are you sure you want to delete this user?");
    
      if (confirmed) {
        this.authService.deleteUser(id).subscribe(
          data => {
            console.log(data);
            window.location.reload();
          },
          err => {
            if (err.status !== 200) {
              alert("An error occurred while deleting the user.");
            }
          }
        );
      }
    }
}
