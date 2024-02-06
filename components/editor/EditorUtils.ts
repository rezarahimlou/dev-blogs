import { Editor } from "@tiptap/react";

export const getFocusedEditor = (editor: Editor) => {
  return editor.chain().focus();
};

export const validateUrl = (url: string): string => {
  if (!url) return "";
  let finalUrl;

  try {
    finalUrl = new URL(url);
  } catch (error) {
    finalUrl = new URL("http://" + url);
  }

  return finalUrl.origin;
};
