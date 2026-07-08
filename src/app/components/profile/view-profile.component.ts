import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post.model';
import { PostCardComponent } from '../post-list/post-card/post-card.component';

@Component({
  selector: 'app-view-profile',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule, PostCardComponent],
  template: `
    <div class="container mx-auto px-4 py-8 max-w-6xl">
      <!-- Profile Card -->
      <div class="bg-white rounded-2xl shadow-md border border-gray-100 p-6 md:p-8 mb-8">
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div class="flex items-center space-x-6">
            <div class="h-20 w-20 rounded-2xl bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center text-white text-3xl font-bold shadow-md flex-shrink-0">
              {{ profileUser ? profileUser.firstName[0].toUpperCase() + profileUser.lastName[0].toUpperCase() : 'U' }}
            </div>
            
            @if (!isEditing) {
              <div>
                <h1 class="text-2xl font-bold text-gray-900">
                  {{ profileUser?.firstName }} {{ profileUser?.lastName }}
                </h1>
                <p class="text-sm text-gray-500 font-medium">&#64;{{ profileUser?.username }}</p>
                <div class="flex flex-wrap items-center gap-4 mt-2 text-sm text-gray-600">
                  <span class="flex items-center">
                    <svg class="h-4 w-4 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                    </svg>
                    {{ profileUser?.email }}
                  </span>
                  <span class="flex items-center">
                    <svg class="h-4 w-4 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                    </svg>
                    {{ posts.length }} {{ posts.length === 1 ? 'post' : 'posts' }}
                  </span>
                </div>
              </div>
            } @else {
              <!-- Edit Profile Form -->
              <form [formGroup]="editForm" class="flex-grow grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-xs font-semibold text-gray-500 uppercase">First Name</label>
                  <input type="text" formControlName="firstName" class="mt-1 block w-full px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                </div>
                <div>
                  <label class="block text-xs font-semibold text-gray-500 uppercase">Last Name</label>
                  <input type="text" formControlName="lastName" class="mt-1 block w-full px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                </div>
                <div class="md:col-span-2">
                  <label class="block text-xs font-semibold text-gray-500 uppercase">Email</label>
                  <input type="email" formControlName="email" class="mt-1 block w-full px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                </div>
              </form>
            }
          </div>

          <!-- Edit Profile Action Buttons -->
          @if (isOwnProfile) {
            <div class="flex items-center space-x-2 md:self-center">
              @if (!isEditing) {
                <button
                  (click)="startEditing()"
                  class="px-4 py-2 border border-gray-200 hover:bg-gray-50 rounded-xl text-sm font-semibold text-gray-700 transition-colors"
                >
                  Edit Profile
                </button>
              } @else {
                <button
                  (click)="cancelEditing()"
                  class="px-4 py-2 border border-gray-200 hover:bg-gray-50 rounded-xl text-sm font-semibold text-gray-500 transition-colors"
                >
                  Cancel
                </button>
                <button
                  (click)="saveProfile()"
                  [disabled]="editForm.invalid || isSaving"
                  class="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  {{ isSaving ? 'Saving...' : 'Save' }}
                </button>
              }
            </div>
          }
        </div>
      </div>

      <!-- User's Articles Section -->
      <div>
        <h2 class="text-2xl font-bold text-gray-900 mb-6">Articles by {{ profileUser?.firstName }}</h2>
        
        @if (isLoadingPosts) {
          <div class="text-center py-12">
            <span class="inline-block animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full mb-2"></span>
            <p class="text-gray-500 text-sm">Loading articles...</p>
          </div>
        } @else if (posts.length > 0) {
          <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            @for (post of posts; track $index) {
              <app-post-card [post]="post" />
            }
          </div>
        } @else {
          <div class="text-center py-12 bg-white rounded-2xl border border-gray-100 shadow-sm animate-fadeIn">
            <svg class="mx-auto h-12 w-12 text-gray-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 4a2 2 0 00-2-2v4h4a2 2 0 00-2-2zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4h5"/>
            </svg>
            <h3 class="text-lg font-bold text-gray-900 mb-1">No articles published</h3>
            <p class="text-gray-500 text-sm">This user hasn't published any articles yet.</p>
          </div>
        }
      </div>
    </div>
  `
})
export class ViewProfileComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private authService = inject(AuthService);
  private postService = inject(PostService);
  private fb = inject(FormBuilder);

  profileUser: any = null;
  posts: Post[] = [];
  isOwnProfile = false;
  isEditing = false;
  isSaving = false;
  isLoadingPosts = true;

  editForm = this.fb.group({
    firstName: ['', [Validators.required, Validators.minLength(3)]],
    lastName: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]]
  });

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const username = params.get('username');
      if (username) {
        this.loadProfile(username);
      }
    });
  }

  loadProfile(username: string) {
    this.isLoadingPosts = true;
    this.posts = [];
    
    this.authService.getUserProfile(username).subscribe({
      next: (user) => {
        this.profileUser = user;
        const currentSession = this.authService.currentUser();
        this.isOwnProfile = currentSession !== null && currentSession.username === user.username;
        
        this.editForm.setValue({
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email
        });

        this.postService.getPostsByUsername(username).subscribe({
          next: (posts) => {
            this.posts = posts;
            this.isLoadingPosts = false;
          },
          error: () => {
            this.isLoadingPosts = false;
          }
        });
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  startEditing() {
    this.isEditing = true;
  }

  cancelEditing() {
    this.isEditing = false;
  }

  saveProfile() {
    if (this.editForm.invalid) return;

    this.isSaving = true;
    const profileData = {
      ...this.editForm.value,
      username: this.profileUser.username
    };

    this.authService.updateUserProfile(this.profileUser.username, profileData).subscribe({
      next: (updatedUser) => {
        this.profileUser = updatedUser;
        this.isEditing = false;
        this.isSaving = false;

        const session = this.authService.currentUser();
        if (session) {
          session.name = updatedUser.firstName + ' ' + updatedUser.lastName;
          session.email = updatedUser.email;
          this.authService.currentUser.set({ ...session });
          localStorage.setItem('name', session.name);
          localStorage.setItem('email', session.email);
        }
      },
      error: (err) => {
        console.error(err);
        this.isSaving = false;
      }
    });
  }
}
