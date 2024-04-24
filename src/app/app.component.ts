import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./shared/header/header.component";
import { FooterComponent } from './shared/footer/footer.component';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    providers: [],
    imports: [RouterOutlet, HttpClientModule, HeaderComponent, FooterComponent, HeaderComponent]
})
export class AppComponent {
  title = 'blog-app';
}
