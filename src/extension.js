const vscode = require('vscode');
const { format } = require('../lib/sqlFormatter');

// This function is called when your extension is activated
function activate(context) {
    // Register the 'extension.formatSQL' command
    let disposable = vscode.commands.registerCommand('extension.formatSQL', function () {
        const editor = vscode.window.activeTextEditor;
        
        if (!editor) {
            vscode.window.showErrorMessage('No active editor found!');
            return;
        }

        const document = editor.document;
        const fullText = document.getText();
        
        // Call your formatting function (sqlFormatter) here
        const formattedSQL = format(fullText, { language: 'sql', indent: '  ', uppercase: true });

        // Apply the formatted SQL back to the editor
        editor.edit(editBuilder => {
            const firstLine = document.lineAt(0);
            const lastLine = document.lineAt(document.lineCount - 1);
            const textRange = new vscode.Range(firstLine.range.start, lastLine.range.end);
            editBuilder.replace(textRange, formattedSQL);
        });

        vscode.window.showInformationMessage('SQL formatted successfully!');
    });

    context.subscriptions.push(disposable);
}

// This function is called when your extension is deactivated
function deactivate() {}

module.exports = {
    activate,
    deactivate
};
