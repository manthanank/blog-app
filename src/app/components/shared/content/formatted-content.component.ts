import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-formatted-content',
  standalone: true,
  template: `
    <div class="ql-editor text-gray-700 leading-relaxed max-w-none" [innerHTML]="content"></div>
  `,
  styles: [`
    :host ::ng-deep {
      .ql-editor {
        padding: 0;
        p {
          margin-bottom: 1rem;
          line-height: 1.75;
        }
        h1, h2, h3 {
          font-weight: 700;
          margin-top: 1.75rem;
          margin-bottom: 0.75rem;
          color: #111827;
        }
        h1 { font-size: 1.875rem; }
        h2 { font-size: 1.5rem; }
        h3 { font-size: 1.25rem; }
        ul, ol {
          margin-left: 1.5rem;
          margin-bottom: 1rem;
          list-style-position: outside;
        }
        ul { list-style-type: disc; }
        ol { list-style-type: decimal; }
        a {
          color: #2563eb;
          text-decoration: underline;
          &:hover {
            color: #1d4ed8;
          }
        }
        blockquote {
          border-left: 4px solid #3b82f6;
          padding-left: 1rem;
          font-style: italic;
          color: #4b5563;
          margin: 1.5rem 0;
          background-color: #f8fafc;
          padding-top: 0.5rem;
          padding-bottom: 0.5rem;
          border-radius: 0 0.375rem 0.375rem 0;
        }
        pre {
          background-color: #f1f5f9;
          padding: 1rem;
          border-radius: 0.5rem;
          overflow-x: auto;
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
          font-size: 0.875rem;
          margin: 1.5rem 0;
          border: 1px solid #e2e8f0;
        }
      }
    }
  `]
})
export class FormattedContentComponent {
  @Input() content!: string;
}