"use client";

import { useEffect } from "react";

/**
 * Strips text/background color from copied content while preserving the rest of
 * the typography (size, weight, family, etc.).
 *
 * The site renders most text white (body `text-white`). When the browser copies
 * a selection it bakes the *computed* styles into the clipboard HTML as inline
 * styles, including `color: rgb(255,255,255)`, so pasting into a white document
 * (Word, Google Docs, etc.) renders invisible text.
 *
 * We rebuild the clipboard HTML ourselves: clone the selection, copy a
 * whitelist of computed font/text properties onto the clones, and intentionally
 * omit color — so the destination uses its own default text color but keeps the
 * original font size, weight, family, etc.
 */

// Properties we re-inline so they survive the paste. `color` and
// `background-color` are deliberately excluded.
const PRESERVED_PROPS = [
  "font-size",
  "font-weight",
  "font-family",
  "font-style",
  "font-variant",
  "text-decoration-line",
  "text-transform",
  "line-height",
  "letter-spacing",
  "text-align",
] as const;

export default function CopyColorFix() {
  useEffect(() => {
    const handleCopy = (e: ClipboardEvent) => {
      const selection = window.getSelection();
      if (!selection || selection.isCollapsed || !e.clipboardData) return;

      const range = selection.getRangeAt(0);
      const container = document.createElement("div");
      container.appendChild(range.cloneContents());

      // The cloned elements (document order) line up 1:1 with the original
      // elements within the range (document order), so we can copy computed
      // styles across by index.
      const clones = container.querySelectorAll<HTMLElement>("*");

      const originals: Element[] = [];
      const walker = document.createTreeWalker(
        range.commonAncestorContainer,
        NodeFilter.SHOW_ELEMENT,
        {
          acceptNode: (node) =>
            range.intersectsNode(node)
              ? NodeFilter.FILTER_ACCEPT
              : NodeFilter.FILTER_SKIP,
        },
      );
      while (walker.nextNode()) originals.push(walker.currentNode as Element);

      clones.forEach((clone, i) => {
        const original = originals[i];
        if (!original) return;
        const computed = window.getComputedStyle(original);
        for (const prop of PRESERVED_PROPS) {
          const value = computed.getPropertyValue(prop);
          if (value) clone.style.setProperty(prop, value);
        }
        // Make sure no color sneaks in from a shorthand or inline attribute.
        clone.style.removeProperty("color");
        clone.style.removeProperty("background-color");
      });

      e.clipboardData.setData("text/html", container.innerHTML);
      e.clipboardData.setData("text/plain", selection.toString());
      e.preventDefault();
    };

    document.addEventListener("copy", handleCopy);
    return () => document.removeEventListener("copy", handleCopy);
  }, []);

  return null;
}
