import React from "react";

// Turkce sayfada CSS "uppercase", lang="tr" kurallariyla "i"yi noktali buyuk I'ya
// cevirir ve "GitHub" noktali I ile yazilir. Karisik metinlerde yalnizca bu
// marka/terimler lang="en" ile sarilir; Turkce kelimeler dogru buyuk harfle kalir.
const LATIN_TERMS = /(GitHub|LinkedIn|Garage\.ist|Sortify|iPadOS|iOS|Android)/;
// Apple adlari buyuk harfe cevrilmez: "IOS" degil "iOS".
const KEEP_CASE = new Set(["iOS", "iPadOS"]);

export default function LatinText({ text }: { text: string }) {
  return (
    <>
      {text.split(LATIN_TERMS).map((part, i) =>
        i % 2 === 1 ? (
          <span key={i} lang="en" className={KEEP_CASE.has(part) ? "normal-case" : undefined}>
            {part}
          </span>
        ) : (
          part
        ),
      )}
    </>
  );
}
