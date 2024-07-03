import { Component, OnInit, inject } from '@angular/core';
import { UsersService } from '../../../core/services/users.service';
import { NgFor } from '@angular/common';
import { User } from '../../../core/models/users.model';
import { TableModule } from 'primeng/table';
@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [NgFor, TableModule],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss',
})
export class UsersListComponent implements OnInit {
  user = inject(UsersService);
  users: User[] = [];

  constructor() {}

  ngOnInit() {
    this.user.getUsers().subscribe({
      next: (users: any) => {
        // console.log(users);
        this.users = users?.users;
      },
      error: (error: any) => {
        console.error('Error fetching users:', error);
      },
    });
  }
}
