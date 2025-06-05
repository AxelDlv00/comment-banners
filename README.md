# Comment Banners

[![GitHub](https://img.shields.io/badge/GitHub-Repo-blue?logo=github)](https://github.com/AxelDlv00/comment-banners)

A VS Code extension to quickly insert stylish ASCII or markdown-style **comment banners** for code and documentation.

---

## Features

- Insert centered banners with box-drawing characters (e.g. `╔═══╗`, `█▀▀█`)
- Markdown-style banners (`###`, `===`, `---`)
- Lightweight styles using slashes and hashes
- Language-aware comment prefixes (e.g. `//`, `#`, `%`)
- Works on empty lines or replaces selected text
- Quick style picker with live generation

---

## Banner Styles

Here are just a few examples:

### Unicode Box (Double-line)

```ts
// ╔══════════════════════╗
// ║   Section Heading    ║
// ╚══════════════════════╝
````

### Thick Block

```py
# █▀▀▀▀▀▀▀▀▀▀▀█
# █  WARNING  █
# █▄▄▄▄▄▄▄▄▄▄▄█
```

---

## Usage

1. Select text or place cursor
2. Open Command Palette (`Ctrl+Shift+P`)
3. Type: **Banner: Insert ASCII Box**
4. Choose a style from the menu
5. Done!

> Or use shortcut: `Ctrl + Alt + B`

---

## Supported Languages

Auto-detects appropriate comment syntax for:

* JavaScript / TypeScript: `//`
* Python / Shell: `#`
* HTML / Markdown: `<!-- -->`
* C / C++: `//`
* LaTeX: `%`

---

## Install

Search for `LaTeX Shortcuts` in the Extensions Marketplace.

Or install via CLI:

```bash
code --install-extension naela.latex-shortcuts
```

## Author

Publisher: naela ([GitHub](https://github.com/AxelDlv00))
