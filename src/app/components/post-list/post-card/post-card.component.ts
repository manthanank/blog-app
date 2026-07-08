import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Post } from '../../../models/post.model';

@Component({
  selector: 'app-post-card',
  standalone: true,
  imports: [RouterLink, DatePipe],
  template: `
    <article class="group bg-white rounded-xl overflow-hidden flex flex-col h-full transition-all duration-300 hover:translate-y-[-2px]">
      <!-- Cover Image Area -->
      <div class="relative h-48 bg-gradient-to-br from-blue-500 to-purple-600">
        <div class="absolute inset-0 bg-black/20"></div>
        @if (post.status === 'draft') {
          <div class="absolute top-3 right-3 bg-yellow-500 text-white text-xs font-bold px-2.5 py-1 rounded-lg shadow z-10 uppercase tracking-wider">
            Draft
          </div>
        }
        <div class="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
          <h3 class="text-xl font-bold text-white line-clamp-2 group-hover:text-blue-200 transition-colors duration-200">
            {{ post.title }}
          </h3>
        </div>
      </div>

      <!-- Content Area -->
      <div class="flex-grow p-4">
        <!-- Author and Date -->
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center gap-3">
            <div class="relative">
              <div class="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-lg shadow-md">
                {{ post.author[0].toUpperCase() }}
              </div>
              <div class="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
            <div>
              <div class="font-semibold text-gray-900">{{ post.author }}</div>
              <div class="text-sm text-gray-500">{{ post.postedDate | date:'MMM d, y' }}</div>
            </div>
          </div>
          
          <!-- Reading Time -->
          <div class="flex items-center text-sm text-gray-500">
            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            {{ post.readingTime || '1 min read' }}
          </div>
        </div>

        <!-- Preview Text -->
        <p class="text-gray-600 line-clamp-3 mb-4 text-sm leading-relaxed">
          {{ post.desc || stripHtml(post.content) }}
        </p>

        <!-- Tags -->
        <div class="flex flex-wrap gap-2">
          @for (tag of post.tags.slice(0, 3); track $index) {
            <span class="px-2.5 py-1 text-xs font-medium rounded-full 
                       bg-blue-50 text-blue-600 border border-blue-100
                       hover:bg-blue-100 transition-colors duration-200">
              {{ tag }}
            </span>
          }
          @if (post.tags.length > 3) {
            <span class="px-2.5 py-1 text-xs font-medium rounded-full 
                       bg-gray-50 text-gray-600 border border-gray-100">
              +{{ post.tags.length - 3 }}
            </span>
          }
        </div>
      </div>

      <!-- Footer -->
      <div class="px-4 py-3 border-t border-gray-100 bg-gray-50/50">
        <div class="flex items-center justify-between">
          <!-- Engagement Stats -->
          <div class="flex items-center gap-4 text-sm text-gray-500">
            <button class="flex items-center gap-1 hover:text-blue-600 transition-colors">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span>24</span>
            </button>
            <button class="flex items-center gap-1 hover:text-blue-600 transition-colors">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                      d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
              </svg>
              <span>12</span>
            </button>
          </div>

          <!-- Read More Link -->
          <a [routerLink]="['/post', post.id]" 
             class="inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors">
            Read more
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </article>
  `
})
export class PostCardComponent {
  @Input() post!: Post;

  stripHtml(html: string): string {
    if (!html) return '';
    return html.replace(/<[^>]*>/g, '');
  }
}