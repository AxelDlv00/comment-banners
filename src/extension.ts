import * as vscode from 'vscode';
import stringWidth from 'string-width';

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand(
    'comment-banners.insertBox',
    async () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) {return;}

      const selection = editor.selection;
      const selectedText = editor.document.getText(selection) ||
        await vscode.window.showInputBox({ prompt: 'Banner text' });

      if (!selectedText) {return;}

      const style = await vscode.window.showQuickPick(
        [
          'Rounded', 'Double-line', 'Single-line', 'Dashed', 'Thick',
          'Classic', 'Equals', 'Arrow', 'Unicode Block', 'Figlet'
        ],
        { placeHolder: 'Box style' }
      );

      if (!style) {return;}

      const commentPrefix = guessCommentPrefix(editor.document.languageId) || '//';
      const width = vscode.workspace.getConfiguration('commentBanners').get('width', 60);

      const banner = buildBanner(selectedText, style, commentPrefix, width);

      editor.edit(edit => {
        if (selection.isEmpty) {
          edit.insert(selection.start, banner);
        } else {
          edit.replace(selection, banner);
        }
      });
    });

  context.subscriptions.push(disposable);
}

export function deactivate() {}

function guessCommentPrefix(langId: string): string | undefined {
  const map: Record<string, string> = {
    'typescript': '//', 'javascript': '//', 'python': '#', 'c': '//', 'cpp': '//',
    'shellscript': '#', 'latex': '%', 'markdown': '//', 'html': '//'
  };
  return map[langId];
}

function buildBanner(text: string, style: string, prefix: string, width: number = 100): string {
  const cleanText = text
    .split('\n')
    .map(line => line.trim())
    .join('\n');

  const contentWidth = Math.max(width - 4, 10);

  function splitLines(str: string, maxLen: number): string[] {
    const words = str.split(' ');
    const lines: string[] = [];
    let line = '';
    for (const word of words) {
      if ((line + ' ' + word).trim().length > maxLen) {
        if (line) {lines.push(line);}
        line = word;
      } else {
        line = line ? line + ' ' + word : word;
      }
    }
    if (line) {lines.push(line);}
    return lines;
  }

  const rawLines = cleanText.split('\n');
  const lines = rawLines.flatMap(line => splitLines(line, contentWidth));

  function pad(str: string, width: number): string {
    const len = stringWidth(str);
    const padLeft = Math.floor((width - len) / 2);
    const padRight = Math.ceil((width - len) / 2);
    return ' '.repeat(padLeft) + str + ' '.repeat(padRight);
  }

  let top: string, mid: string[], bottom: string;

  switch (style) {
    case 'Double-line':
      top = '╔' + '═'.repeat(contentWidth) + '╗';
      mid = lines.map(l => '║' + pad(l, contentWidth) + '║');
      bottom = '╚' + '═'.repeat(contentWidth) + '╝';
      break;
    case 'Dashed':
      top = '+' + '-'.repeat(contentWidth) + '+';
      mid = lines.map(l => '|' + pad(l, contentWidth) + '|');
      bottom = '+' + '-'.repeat(contentWidth) + '+';
      break;
    case 'Single-line':
      top = '/' + '*'.repeat(contentWidth) + '\\';
      mid = lines.map(l => '*' + pad(l, contentWidth) + '*');
      bottom = '\\' + '*'.repeat(contentWidth) + '/';
      break;
    case 'Thick':
      top = '█' + '▀'.repeat(contentWidth) + '█';
      mid = lines.map(l => '█' + pad(l, contentWidth) + '█');
      bottom = '█' + '▄'.repeat(contentWidth) + '█';
      break;
    case 'Rounded':
      top = '╭' + '─'.repeat(contentWidth) + '╮';
      mid = lines.map(l => '│' + pad(l, contentWidth) + '│');
      bottom = '╰' + '─'.repeat(contentWidth) + '╯';
      break;
    case 'Classic':
      top = '/' + '-'.repeat(contentWidth) + '\\';
      mid = lines.map(l => '|' + pad(l, contentWidth) + '|');
      bottom = '\\' + '-'.repeat(contentWidth) + '/';
      break;
    case 'Equals':
      top = '='.repeat(contentWidth + 2);
      mid = lines.map(l => pad(l, contentWidth + 2));
      bottom = '='.repeat(contentWidth + 2);
      break;
    case 'Arrow':
      top = '>' + '>'.repeat(contentWidth) + '>';
      mid = lines.map(l => '>' + pad(l, contentWidth) + '>');
      bottom = '<' + '<'.repeat(contentWidth) + '<';
      break;
    case 'Unicode Block':
      top = '🭽' + '▀'.repeat(contentWidth) + '🭾';
      mid = lines.map(l => '▌' + pad(l, contentWidth) + '▐');
      bottom = '🭼' + '▄'.repeat(contentWidth) + '🭿';
      break;
    case 'Figlet':
      return `${prefix} ${cleanText.split('\n').join('\n' + prefix + ' ')}\n`;
    default:
      top = '// ' + '='.repeat(contentWidth);
      mid = lines.map(l => '// ' + pad(l, contentWidth));
      bottom = '// ' + '='.repeat(contentWidth);
  }

  return [top, ...mid, bottom].map(l => `${prefix} ${l}`).join('\n') + '\n';
}
