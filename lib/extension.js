"use strict";

var vscode = require('vscode');

var _require = require('../lib/sqlFormatter'),
    format = _require.format; // This function is called when your extension is activated


function activate(context) {
  // Register the 'extension.formatSQL' command
  var disposable = vscode.commands.registerCommand('extension.formatSQL', function () {
    var editor = vscode.window.activeTextEditor;

    if (!editor) {
      vscode.window.showErrorMessage('No active editor found!');
      return;
    }

    var document = editor.document;
    var fullText = document.getText(); // Call your formatting function (sqlFormatter) here

    var formattedSQL = format(fullText, {
      language: 'sql',
      indent: '  ',
      uppercase: true
    }); // Apply the formatted SQL back to the editor

    editor.edit(function (editBuilder) {
      var firstLine = document.lineAt(0);
      var lastLine = document.lineAt(document.lineCount - 1);
      var textRange = new vscode.Range(firstLine.range.start, lastLine.range.end);
      editBuilder.replace(textRange, formattedSQL);
    });
    vscode.window.showInformationMessage('SQL formatted successfully!');
  });
  context.subscriptions.push(disposable);
} // This function is called when your extension is deactivated


function deactivate() {}

module.exports = {
  activate: activate,
  deactivate: deactivate
};