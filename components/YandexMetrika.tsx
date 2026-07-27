import Script from "next/script";

/**
 * Подключаю только если id задан. null — значит на странице вообще
 * ничего не будет, ни скрипта, ни noscript-пикселя.
 */
export function YandexMetrika({ id }: { id: string | null }) {
  if (!id) return null;

  const code = `
    (function(m,e,t,r,i,k,a){
      m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
      m[i].l=1*new Date();
      for (var j = 0; j < document.scripts.length; j++) {
        if (document.scripts[j].src === r) { return; }
      }
      k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
    })(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=${id}', 'ym');

    ym(${JSON.stringify(id)}, 'init', {
      ssr: true,
      webvisor: true,
      clickmap: true,
      trackLinks: true,
      accurateTrackBounce: true
    });
  `;

  return (
    <>
      <Script
        id="yandex-metrika"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: code }}
      />
      <noscript>
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://mc.yandex.ru/watch/${id}`}
            style={{ position: "absolute", left: "-9999px" }}
            alt=""
          />
        </div>
      </noscript>
    </>
  );
}

export default YandexMetrika;
