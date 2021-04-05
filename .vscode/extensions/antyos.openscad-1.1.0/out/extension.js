"use strict";
/*---------------------------------------------------------------------------------------------
 * Extension
 *
 * Main file for activating extension
 *--------------------------------------------------------------------------------------------*/
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const cheatsheet_1 = require("./cheatsheet");
const previewManager_1 = require("./previewManager");
const config_1 = require("./config");
// New launch object
const previewManager = new previewManager_1.PreviewManager();
// Called when extension is activated
function activate(context) {
    console.log('Activating openscad extension');
    // Register commands
    context.subscriptions.push(vscode.commands.registerCommand(cheatsheet_1.Cheatsheet.csCommandId, () => cheatsheet_1.Cheatsheet.createOrShowPanel(context.extensionPath)));
    context.subscriptions.push(vscode.commands.registerCommand('openscad.preview', (mainUri, allUris) => previewManager.openFile(mainUri, allUris)));
    context.subscriptions.push(vscode.commands.registerCommand('openscad.exportByType', (mainUri, allUris) => previewManager.exportFile(mainUri, allUris)));
    context.subscriptions.push(vscode.commands.registerCommand('openscad.exportByConfig', (mainUri, allUris) => previewManager.exportFile(mainUri, allUris, 'auto')));
    context.subscriptions.push(vscode.commands.registerCommand('openscad.exportWithSaveDialogue', (mainUri, allUris) => previewManager.exportFile(mainUri, allUris, 'auto', true)));
    context.subscriptions.push(vscode.commands.registerCommand('openscad.kill', () => previewManager.kill()));
    context.subscriptions.push(vscode.commands.registerCommand('openscad.autoKill', () => previewManager.kill(true)));
    context.subscriptions.push(vscode.commands.registerCommand('openscad.killAll', () => previewManager.killAll()));
    // Register status bar item
    context.subscriptions.push(cheatsheet_1.Cheatsheet.getStatusBarItem());
    // Register listeners to make sure cheatsheet items are up-to-date
    context.subscriptions.push(vscode.window.onDidChangeActiveTextEditor(onDidChangeActiveTextEditor));
    context.subscriptions.push(vscode.workspace.onDidChangeConfiguration(onDidChangeConfiguration));
    onDidChangeConfiguration();
    // Update status bar item once at start
    cheatsheet_1.Cheatsheet.updateStatusBar();
    // Register serializer event action to recreate webview panel if vscode restarts
    if (vscode.window.registerWebviewPanelSerializer) {
        // Make sure we register a serializer in action event
        vscode.window.registerWebviewPanelSerializer(cheatsheet_1.Cheatsheet.viewType, {
            deserializeWebviewPanel(webviewPanel, state) {
                return __awaiter(this, void 0, void 0, function* () {
                    if (config_1.DEBUG)
                        console.log(`Got state: ${state}`);
                    cheatsheet_1.Cheatsheet.revive(webviewPanel, context.extensionPath);
                });
            },
        });
    }
}
exports.activate = activate;
// Called when extension is deactivated
// export function deactivate() {}
// Run on active change text editor
function onDidChangeActiveTextEditor() {
    cheatsheet_1.Cheatsheet.onDidChangeActiveTextEditor();
}
// Run when configuration is changed
function onDidChangeConfiguration() {
    const config = vscode.workspace.getConfiguration('openscad'); // Get new config
    cheatsheet_1.Cheatsheet.onDidChangeConfiguration(config); // Update the cheatsheet with new config
    previewManager.onDidChangeConfiguration(config); // Update launcher with new config
    // vscode.window.showInformationMessage("Config change!"); // DEBUG
}
//# sourceMappingURL=extension.js.map