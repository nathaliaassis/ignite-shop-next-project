/* 
  - nesse arquivo simulamos o arquivo html que vem em projetos padrões react
  - tags HTML e Head são importadas do next/document
  obs: toda vez que o arquivo _document for alterado, a aplicação next deve 
  ser reiniciada, pois esse arquivo só é lido uma vez pelo next. 
  - qualquer importação feita nesse arquivo será carregada em todas as páginas 
  da aplicação
*/
import { Head, Html, Main, NextScript } from "next/document";
import { getCssText } from "styles";

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap"
          rel="stylesheet"
        />
        {/* essa config é feita para estilizar a aplicação ssr  */}
        <style
          id="stitches"
          dangerouslySetInnerHTML={{ __html: getCssText() }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
