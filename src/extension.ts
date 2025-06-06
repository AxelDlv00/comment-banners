import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand(
    'comment-banners.insertBox',
    async () => {
      // Get editor + text
      const editor = vscode.window.activeTextEditor;
      if (!editor) { return; }

      const selection = editor.selection;
      const selectedText = editor.document.getText(selection) || 
                           await vscode.window.showInputBox({ prompt: 'Banner text' });
      if (!selectedText) { return; }

      // Choose style (extend as desired)
      const style = await vscode.window.showQuickPick(
        [
          'Rounded', 'Double-line', 
          '🟨', '🟩', '🟪', '🟦', '🟥',
          'Single-line', 'Dashed', 'Thick', 'Classic',
          'Equals', 'Arrow', 'Unicode Block', 'Figlet'
        ],
        { placeHolder: 'Box style' }
      );

      if (!style) { return; }

      // Detect comment prefix, fallback to “//”
      const langCfg = vscode.languages.getLanguages().then(langs => { /* optional */ });
      const commentPrefix = guessCommentPrefix(editor.document.languageId) || '//';

      // Build banner
      const banner = buildBanner(selectedText, style, commentPrefix);

      // Replace or insert
      editor.edit(edit => {
        if (selection.isEmpty) {  // insert on its own line
          edit.insert(selection.start, banner);
        } else {                  // replace selection
          edit.replace(selection, banner);
        }
      });
    });

  context.subscriptions.push(disposable);
}

export function deactivate() {}

/* ---------- helpers ---------- */

function guessCommentPrefix(langId: string): string | undefined {
  const map: Record<string,string> = {
    'typescript':'//', 'javascript':'//', 'python':'#', 'c':'//', 'cpp':'//',
    'shellscript':'#', 'latex':'%', 'markdown':'<!--', 'html':'<!--'
  };
  return map[langId];
}

function buildBanner(text: string, style: string, prefix: string): string {
  const cleanText = text.trim().replace(/\s+/g, ' ');
  const width = Math.max(cleanText.length + 4, 20);
  const pad = (s: string, w = width - 2) =>
    ' '.repeat(Math.floor((w - s.length) / 2)) + s +
    ' '.repeat(Math.ceil((w - s.length) / 2));

  let top: string, mid: string, bottom: string;

  switch (style) {
    case 'Double-line':
      top    = '╔' + '═'.repeat(width - 2) + '╗';
      mid    = '║' + pad(cleanText) + '║';
      bottom = '╚' + '═'.repeat(width - 2) + '╝';
      break;
    case 'Dashed':
      top    = '+' + '-'.repeat(width - 2) + '+';
      mid    = '|' + pad(cleanText) + '|';
      bottom = '+' + '-'.repeat(width - 2) + '+';
      break;
    case 'Single-line':
      top    = '/' + '*'.repeat(width - 2) + '\\';
      mid    = '*' + pad(cleanText) + '*';
      bottom = '\\' + '*'.repeat(width - 2) + '/';
      break;
    case 'Thick':
      top    = '█' + '▀'.repeat(width - 2) + '█';
      mid    = '█' + pad(cleanText) + '█';
      bottom = '█' + '▄'.repeat(width - 2) + '█';
      break;
    case 'Classic':
      top    = '/'.padEnd(width - 1, '-') + '\\';
      mid    = '| ' + cleanText.padEnd(width - 4) + ' |';
      bottom = '\\'.padEnd(width - 1, '-') + '/';
      break;
    case 'Rounded':
      top    = '╭' + '─'.repeat(width - 2) + '╮';
      mid    = '│' + pad(cleanText) + '│';
      bottom = '╰' + '─'.repeat(width - 2) + '╯';
      break;
    case 'Equals':
      top    = '='.repeat(width);
      mid    = pad(cleanText, width);
      bottom = '='.repeat(width);
      break;
    case '🟨':
      top    = '🟨'.repeat(width);
      mid    = pad(cleanText, width);
      bottom = '🟨'.repeat(width);
      break;
    case '🟩':
      top    = '🟩'.repeat(width);
      mid    = pad(cleanText, width);
      bottom = '🟩'.repeat(width);
      break;
    case '🟪':
      top    = '🟪'.repeat(width);
      mid    = pad(cleanText, width);
      bottom = '🟪'.repeat(width);
      break;
    case '🟦':
      top    = '🟦'.repeat(width);
      mid    = pad(cleanText, width);
      bottom = '🟦'.repeat(width);
      break;
    case '🟥':
      top    = '🟥'.repeat(width);
      mid    = pad(cleanText, width);
      bottom = '🟥'.repeat(width);
      break;
    case 'Arrow':
      top    = '→' + '>'.repeat(width - 2) + '→';
      mid    = '→' + pad(cleanText) + '→';
      bottom = '→' + '<'.repeat(width - 2) + '→';
      break;
    case 'Unicode Block':
      top    = '🭽' + '▀'.repeat(width - 2) + '🭾';
      mid    = '▌' + pad(cleanText) + '▐';
      bottom = '🭼' + '▄'.repeat(width - 2) + '🭿';
      break;
    case 'Figlet':
      return `${prefix} ${cleanText.split('\n').join('\n' + prefix + ' ')}\n`;

    default:
      top    = '//' + '='.repeat(width - 2);
      mid    = '// ' + cleanText;
      bottom = '//' + '='.repeat(width - 2);
  }

  return [top, mid, bottom].map(l => `${prefix} ${l}`).join('\n') + '\n';
}
