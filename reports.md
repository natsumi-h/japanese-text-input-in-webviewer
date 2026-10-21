# WebViewer: Text Input Issues in DOCX Editor and PDF Text Edit

## Summary

| # | Feature | Issue |
|---|---------|-------|
| 1 | DOCX Editor (Office Editing) | Incorrect text input after selecting a table row/cell |
| 2 | PDF Text Edit (Content Edit) | Characters being typed with a Japanese IME do not appear immediately |

## Environment

| Item | Value |
|------|-------|
| WebViewer | 12.2.1 (`@pdftron/webviewer`) |
| Framework | React 19.2.8 / Vite 8.2.2 (based on the `webviewer-react` sample) |
| OS | macOS 26.7 (25G229) |
| Input method | macOS Japanese IME (Romaji input) |
| Node.js | v24.15.0 |

### Viewer configuration

DOCX Editor:

```ts
WebViewer(
  {
    path: "/lib/webviewer",
    licenseKey: import.meta.env.VITE_DEMO_KEY,
    initialDoc: "<path to .docx file>",
    enableOfficeEditing: true,
    // IME composition input is enabled
    enableCompositionInput: true,
    officeEditorOptions: {
      initialEditMode: "editing",
    },
  },
  viewerElement,
);
```

PDF Text Edit:

```ts
WebViewer(
  {
    path: "/lib/webviewer",
    licenseKey: import.meta.env.VITE_DEMO_KEY,
    initialDoc: "<path to .pdf file>",
  },
  viewerElement,
).then((instance) => {
  instance.UI.enableFeatures([instance.UI.Feature.ContentEdit]);
  instance.Core.documentViewer.addEventListener("documentLoaded", () => {
    instance.UI.setToolbarGroup("toolbarGroup-EditText");
  });
});
```

---

## Issue 1: DOCX Editor – Incorrect text input after selecting a table row/cell

### Description

In the DOCX Editor, when a table row or cell is selected and the user then types text, the text is not input correctly.

### Steps to reproduce

1. Load a `.docx` file that contains a table in WebViewer with `enableOfficeEditing: true`.
2. Make sure the editor is in **Editing** mode.
3. Select a table <!-- row / cell / multiple cells --> by <!-- e.g. dragging across cells, clicking the left edge of a row -->.
4. Type text <!-- e.g. "abc" / Japanese "日本語" via IME -->.

### Expected behavior

<!-- e.g. The selected content is replaced by the typed text, in the same way as Microsoft Word. -->

### Actual behavior

<!-- e.g. Only the first character is input / text is inserted into a different cell / characters are duplicated -->


---

## Issue 2: PDF Text Edit – Characters being typed do not appear immediately

### Description

When editing text in a PDF with the Content Edit (Edit Text) feature, characters being typed with a Japanese IME do not appear immediately. This is not the standard behavior for Japanese typing. In other commercial products (e.g. email clients, Slack), the composition text is displayed in place immediately as each key is pressed, before the text is committed.

Unlike the DOCX Editor, which handles IME input when `enableCompositionInput: true` is set, there does not appear to be an equivalent option for Content Edit.

### Steps to reproduce

1. Load a `.pdf` file in WebViewer with the `ContentEdit` feature enabled.
2. Open the **Edit Text** toolbar group.
3. Click an existing text block to start editing it.
4. Switch the keyboard input source to Japanese (e.g. Hiragana).
5. Type Japanese text (e.g. type `nihongo`) and watch the text block while typing, before committing.

### Expected behavior

Each character being typed (the IME composition text, e.g. `ひ` → `ひら` → `ひらがな`) appears immediately at the cursor position, with the standard composition underline, as in other applications.

### Actual behavior

The characters being typed do not appear immediately.



---

## Impact

- Issue 1: Users cannot reliably edit table content in the DOCX Editor. Customers have reported it as still unresolved after updating to a version where it was expected to be fixed.
- Issue 2: Japanese typing in PDF Text Edit is hard to use, because users cannot see what they are typing while composing.
