import { useWebViewer } from "./useWebViewer";

// DOCX editing: load a .docx file directly into the Office editor (no PDF conversion)
const DocxEditViewer = () => {
  const viewer = useWebViewer({
    initialDoc: "https://pdftron.s3.amazonaws.com/downloads/pl/legal-contract.docx",
    enableOfficeEditing: true,
    // Handle IME composition events (required for Japanese/Chinese/Korean input)
    enableCompositionInput: true,
    officeEditorOptions: {
      initialEditMode: "editing",
    },
  });

  return <div className="webviewer" ref={viewer}></div>;
};

export default DocxEditViewer;
