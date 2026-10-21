import { useWebViewer } from "./useWebViewer";

// Toolbar group that hosts the PDF content editing (Edit Text) tools
const EDIT_TEXT_TOOLBAR_GROUP = "toolbarGroup-EditText";

// PDF content editing: edit text and images directly in the PDF page content
const ContentEditViewer = () => {
  const viewer = useWebViewer(
    {
      initialDoc:
        "https://apryse.s3.amazonaws.com/public/files/samples/WebviewerDemoDoc.pdf",
    },
    (instance) => {
      const { documentViewer } = instance.Core;

      instance.UI.enableFeatures([instance.UI.Feature.ContentEdit]);

      // Open the Edit Text toolbar as soon as the document is ready
      const onDocumentLoaded = () => {
        instance.UI.setToolbarGroup(EDIT_TEXT_TOOLBAR_GROUP);
      };

      documentViewer.addEventListener("documentLoaded", onDocumentLoaded);

      return () => {
        documentViewer.removeEventListener("documentLoaded", onDocumentLoaded);
      };
    },
  );

  return <div className="webviewer" ref={viewer}></div>;
};

export default ContentEditViewer;
