import { SyntheticEvent, useRef, useState } from "react"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { materialOceanic } from "react-syntax-highlighter/dist/cjs/styles/prism"
import prismLangs from "./prismLangs.json" // https://github.com/react-syntax-highlighter/react-syntax-highlighter/blob/HEAD/AVAILABLE_LANGUAGES_PRISM.MD

export default function SnippetCopier() {
  const [code, setCode] = useState<string>("")
  const [language, setLanguage] = useState<string>("")
  const [copyText, setCopyText] = useState<string | null>(null)
  const syntaxHighlighterRef = useRef<HTMLDivElement>(null)

  function handleTextareaChange(event: SyntheticEvent<HTMLTextAreaElement>) {
    const target = event.target as HTMLTextAreaElement
    const textareaContent = target.value

    setCode(textareaContent)
  }

  function handleLanguageSelect(event: SyntheticEvent<HTMLInputElement>) {
    const target = event.target as HTMLInputElement

    setLanguage(target.value)
  }

  function handleCopyToClipboard() {
    const syntaxHighlighterElem = syntaxHighlighterRef.current
    if (!syntaxHighlighterElem?.children[0]) {
      return
    }

    let textToCopy = syntaxHighlighterElem.children[0].outerHTML
    textToCopy = textToCopy.replaceAll("&quot;", "'")

    navigator.clipboard.writeText(textToCopy)

    setCopyText("Copied")
    setTimeout(() => setCopyText(null), 1000)
  }

  return (
    <>
      <main className="max-w-screen-md mx-auto p-4">
        <h1 className="mt-4 mb-8 text-center text-3xl font-semibold">
          Snippet Copier
        </h1>

        <textarea
          onChange={handleTextareaChange}
          className="resize-none w-full border-2 rounded-sm"
          rows={10}
          placeholder="Your code goes here"
        />

        {code && (
          <>
            <div className="mt-2 mb-4 flex items-center justify-between">
              <div>
                <label
                  htmlFor="language-select"
                  className="mr-2 text-slate-500"
                >
                  Language:
                </label>
                <input
                  list="languages"
                  id="language-select"
                  placeholder="e.g. javascript"
                  className="border-2 rounded-sm px-1"
                  onChange={handleLanguageSelect}
                  size={12}
                />
                <datalist id="languages">
                  {prismLangs.map((lang, index) => (
                    <option key={index} value={lang}>
                      {lang}
                    </option>
                  ))}
                </datalist>
              </div>

              <button
                onClick={handleCopyToClipboard}
                className="text-blue-500 hover:underline disabled:hover:no-underline"
                disabled={copyText !== null}
              >
                {copyText ? copyText : "Copy snippet"}
              </button>
            </div>

            <div ref={syntaxHighlighterRef}>
              <SyntaxHighlighter
                language={language}
                style={materialOceanic}
                showLineNumbers
                customStyle={{ borderRadius: "4px" }}
              >
                {code}
              </SyntaxHighlighter>
            </div>
          </>
        )}
      </main>
    </>
  )
}
