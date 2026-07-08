import { Injectable } from '@angular/core';
import { ContentBlock } from './models/content-block.model';
import { parseContentBlocks } from './utils/content-parser.utils';

@Injectable({
  providedIn: 'root'
})
export class ContentParserService {
  parseContent(content: string): ContentBlock[] {
    return parseContentBlocks(content);
  }
}