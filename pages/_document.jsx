import Document from 'next/document';
import { Html, Head, Main, NextScript } from 'next/document'
import { ColorSchemeScript } from '@mantine/core';

export default function _Document() {
  return (
      <Html>
        <Head>
        <link rel="icon" type="image/x-icon" href="/icon.ico"></link>
        <ColorSchemeScript defaultColorScheme='auto'/>
        </Head> 
        <body>
          <Main />
          <NextScript/>
        </body>
      </Html>
    );
}