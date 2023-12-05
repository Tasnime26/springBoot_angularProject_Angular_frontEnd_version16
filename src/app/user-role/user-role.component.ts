import { Component } from '@angular/core';
import { User } from '../model/user.model';
import { Role } from '../model/role.model';
import { FreelancerService } from '../services/freelancer.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-user-role',
  templateUrl: './user-role.component.html',
  styleUrls: ['./user-role.component.css']
})
export class UserRoleComponent {
  constructor(private freelancerService: FreelancerService, private activatedRoute: ActivatedRoute, private authService: AuthService) { }
  User!: User
  Users!: User[]
  roles!: any
  Role!: Role
  idOfRole!: Role
  NewRole!: Role
  RoleToRemove: Role = new Role();


  ngOnInit(): void {
    this.freelancerService.listeUser().subscribe(data => {
      this.Users = data;
      console.log(data);
    }
      ,
      err => {
        console.log(err);
      }
    );
    this.authService.consulterUser(this.activatedRoute.snapshot.params['id']).subscribe((user) => {
      this.User = user;
      console.log(this.User);
    }
    );
    this.freelancerService.getAllRoles().subscribe(data => {
      this.roles = data;
      console.log(data);
    },
      err => {
        console.log(err);
      }
    );
  }





  addRoleToUser() {
    console.log(this.idOfRole);
    console.log(this.activatedRoute.snapshot.params['id'])
    this.authService.AddRoleForUser(this.activatedRoute.snapshot.params['id'], this.idOfRole).subscribe((user) => {
      console.log(user);
      this.User = user;

    });
  }




  removeRoleFromUsers(id: number) {
    console.log("id of the role" + id)
    this.freelancerService.findRoleById(id).subscribe((role) => {
      this.Role = role;
      console.log("the role" + role.role_id);
      console.log(this.activatedRoute.snapshot.params['id'])
      this.authService.removeRoleFromUser(this.activatedRoute.snapshot.params['id'], this.Role).subscribe((user) => {
        console.log(user);
        this.User = user;
      });
    }
    );
  }
  
}
