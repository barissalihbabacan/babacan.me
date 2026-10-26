// Türkçe sayfada CSS "uppercase", lang="tr" kurallarıyla "i"yi noktalı büyük İ'ye
// çevirir ve "GitHub" noktalı İ ile yazılır. Karışık metinlerde yalnızca bu
// marka/terimler lang="en" ile sarılır; Türkçe kelimeler doğru büyük harfle kalır.
const LATIN_TERMS = /(GitHub|LinkedIn|Garage\.ist|Sortify|iPadOS|iOS|Android)/;
// Apple adları büyük harfe çevrilmez: "IOS" değil "iOS".
const KEEP_CASE = new Set(["iOS", "iPadOS"]);

export interface LatinTextProps {
  readonly text: string;
}

export default function LatinText({ text }: LatinTextProps) {
  return (
    <>
      {text.split(LATIN_TERMS).map((part, index) =>
        index % 2 === 1 ? (
          <span key={index} lang="en" className={KEEP_CASE.has(part) ? "normal-case" : undefined}>
            {part}
          </span>
        ) : (
          part
        ),
      )}
    </>
  );
}
