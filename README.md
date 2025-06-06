# Comment Banners

[![GitHub](https://img.shields.io/badge/GitHub-Repo-blue?logo=github)](https://github.com/AxelDlv00/comment-banners)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)
[![VS Code Marketplace](https://img.shields.io/visual-studio-marketplace/v/naela.comment-banners?label=VS%20Code%20Marketplace)](https://marketplace.visualstudio.com/items?itemName=naela.comment-banners)

A VS Code extension to quickly insert stylish ASCII or markdown-style **comment banners** for code and documentation.

If you want your code to look more organized and visually appealing, this extension is for you!

---

## Features

- Insert *centered* banners with box-drawing characters (e.g. `╔═══╗`, `###`, `===`, `---`, ...)
- Language-aware comment prefixes (e.g. `//`, `#`, `%`)
- It automatically detects the language of the file and uses the appropriate comment syntax (e.g. `//`, `#`, `%`)
- If the selected text is too long, it will automatically wrap to the next line 
- Quick shortcut to insert banners: `Ctrl + Alt + B` (Windows/Linux) or `Ctrl + Option + B` (macOS)
- Multiple styles available: double line, rounded, single line, dashed, thick, classic, equals, arrow, unicode block, fidget

---

## Banner Styles

Here are just a few examples:

### Double Line

```ts
// ╔════════════════════════════════════════════════════════╗
// ║                    SECTION HEADING                     ║
// ╚════════════════════════════════════════════════════════╝
```

```ts
// ╔════════════════════════════════════════════════════════╗
// ║                    SECTION HEADING                     ║
// ║ You can also add several lines of text inside the box. ║
// ╚════════════════════════════════════════════════════════╝
```

```ts
// ╔════════════════════════════════════════════════════════╗
// ║                    SECTION HEADING                     ║
// ║ You can also add several lines of text inside the box  ║
// ║and if it is too long it will automatically wrap to the ║
// ║                       next line.                       ║
// ╚════════════════════════════════════════════════════════╝
```

### Rounded

```py
# ╭────────────────────────────────────────────────────────╮
# │                    SECTION HEADING                     │
# │ You can also add several lines of text inside the box. │
# ╰────────────────────────────────────────────────────────╯
```

### Single Line

```latex
% /********************************************************\
% *                    SECTION HEADING                     *
% * You can also add several lines of text inside the box. *
% \********************************************************/
```

### Dashed

```ts
// +--------------------------------------------------------+
// |                    SECTION HEADING                     |
// | You can also add several lines of text inside the box. |
// +--------------------------------------------------------+
```

### Thick

```ts
// █▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀█
// █                    SECTION HEADING                     █
// █ You can also add several lines of text inside the box. █
// █▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄█
```

### Classic

```ts
// /--------------------------------------------------------\
// |                    SECTION HEADING                     |
// | You can also add several lines of text inside the box. |
// \--------------------------------------------------------/
```

### Equals

```ts
// ==========================================================
//                      SECTION HEADING                      
//   You can also add several lines of text inside the box.  
// ==========================================================
```

### Arrow

```ts
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// >                    SECTION HEADING                     >
// > You can also add several lines of text inside the box. >
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
```

### Unicode block

```ts
// 🭽▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀🭾
// ▌                    SECTION HEADING                     ▐
// ▌ You can also add several lines of text inside the box. ▐
// 🭼▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄🭿
```

### Fidget

```ts
// SECTION HEADING
// You can also add several lines of text inside the box.
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

Publisher: naela (a.k.a. [Axel Delaval](https://github.com/AxelDlv00))
