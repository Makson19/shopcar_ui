import React from 'react';
import { ServerStyleSheet } from 'styled-components';
import { renderToStaticMarkup } from 'react-dom/server';
import * as sc from 'styled-components';

const styled: any = (sc as any).default?.default ?? (sc as any).default ?? sc;
console.log('keys de styled-components:', Object.keys(sc as any).slice(0, 15));
console.log('typeof styled.div:', typeof styled.div);

// Replica exatamente o CSS do src/components/Input.tsx
const InputBox = styled.div<{ $isError?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 8px;

  & > .label {
    color: #666666;
    font-size: 16px;
    font-weight: 500;
  }

  & > .input_container {
    width: 100%;

    & > .input {
      border: 1px solid #d9d9d9;
      border-radius: 8px;
      font-size: 16px;
      height: 40px;
      padding-inline: 8px;
      width: 100%;

      &:hover {
        border-color: #b3b3b3;
      }

      &:focus {
        border-color: rgba(0, 0, 0, 0.78) !important;
      }
    }
  }
`;

const sheet = new ServerStyleSheet();
const html = renderToStaticMarkup(
  sheet.collectStyles(
    <InputBox>
      <label htmlFor="email" className="label">E-mail</label>
      <div className="input_container">
        <input id="email" className="input" />
      </div>
    </InputBox>
  )
);
const tags: any = sheet.getStyleTags() as any;
const css = String(tags);
console.log('tipo dos tags:', typeof tags, Array.isArray(tags) ? 'array' : tags._styleTags ? 'sheet-like' : 'unknown');
if (!Array.isArray(tags)) { console.log(tags); }
sheet.seal();

console.log('=== HTML ===');
console.log(html);
console.log('=== CSS GERADO ===');
console.log(css);
