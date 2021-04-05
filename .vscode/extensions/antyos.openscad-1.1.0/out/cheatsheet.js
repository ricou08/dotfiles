"use strict";
/*---------------------------------------------------------------------------------------------
 * Cheatsheet
 *
 * Generates a webview panel containing the OpenSCAD cheatsheet
 *--------------------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const path = require("path");
const fs = require("fs");
// Cheatsheet color schemes. Located in [extensionPath]/media/
const colorScheme = {
    original: 'cheatsheet-original.css',
    auto: 'cheatsheet-auto.css',
};
// Class for Cheatsheet webview and commands
// Only one instance of cheatsheet panel so basically everything is delcared `static`
class Cheatsheet {
    // Constructor
    constructor(panel, extensionPath) {
        // private isScadDocument: boolean;                         // Is current document openSCAD
        this._disposables = [];
        this._panel = panel;
        this._extensionPath = extensionPath;
        // Listen for when panel is disposed
        // This happens when user closes the panel or when the panel is closed progamatically
        this._panel.onDidDispose(() => this.dispose(), null, this._disposables);
        // Set HTML content
        this.updateWebviewContent();
    }
    // Create or show cheatsheet panel
    static createOrShowPanel(extensionPath) {
        // Determine which column to show cheatsheet in
        // If not active editor, check config to open in current window to to the side
        const column = vscode.window.activeTextEditor
            ? Cheatsheet.config.openToSide === 'beside'
                ? vscode.ViewColumn.Beside
                : vscode.window.activeTextEditor.viewColumn
            : undefined;
        if (Cheatsheet.currentPanel) {
            // If we already have a panel, show it in the target column
            Cheatsheet.currentPanel._panel.reveal(column);
            return;
        }
        // Otherwise, create and show new panel
        const panel = vscode.window.createWebviewPanel(Cheatsheet.viewType, // Indentifies the type of webview. Used internally
        'OpenSCAD Cheat Sheet', // Title of panel displayed to the user
        column || vscode.ViewColumn.One, // Editor column
        {
            // Only allow webview to access certain directory
            localResourceRoots: [
                vscode.Uri.file(path.join(extensionPath, 'media')),
            ],
        } // Webview options
        );
        // Create new panel
        Cheatsheet.currentPanel = new Cheatsheet(panel, extensionPath);
    }
    // Recreate panel in case vscode restarts
    static revive(panel, extensionPath) {
        Cheatsheet.currentPanel = new Cheatsheet(panel, extensionPath);
    }
    // Dispose of panel and clean up resources
    dispose() {
        Cheatsheet.currentPanel = undefined;
        // Clean up resources
        this._panel.dispose();
        while (this._disposables.length) {
            const x = this._disposables.pop();
            if (x) {
                x.dispose;
            }
        }
    }
    // Initializes the status bar (if not yet) and return the status bar
    static getStatusBarItem() {
        if (!Cheatsheet.csStatusBarItem) {
            Cheatsheet.csStatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left);
            Cheatsheet.csStatusBarItem.command = Cheatsheet.csCommandId;
        }
        return Cheatsheet.csStatusBarItem;
    }
    // Dispose of status bar
    static disposeStatusBar() {
        if (!Cheatsheet.csStatusBarItem) {
            return;
        }
        Cheatsheet.csStatusBarItem.dispose();
        // Cheatsheet.csStatusBarItem = null; // Typescript doesn't like this...
    }
    // Show or hide status bar item (OpenSCAD Cheatsheet)
    static updateStatusBar() {
        let showCsStatusBarItem = false; // Show cheatsheet status bar item or not
        // Determine to show cheatsheet status bar icon based on extension config
        switch (Cheatsheet.config.displayInStatusBar) {
            case 'always':
                showCsStatusBarItem = true;
                break;
            case 'openDoc':
                showCsStatusBarItem = Cheatsheet.isScadDocOpen();
                break;
            case 'activeDoc':
                // Check the languageId of the active text document
                if (vscode.window.activeTextEditor) {
                    showCsStatusBarItem = Cheatsheet.isDocScad(vscode.window.activeTextEditor.document);
                }
                break;
            case 'never':
                showCsStatusBarItem = false;
                break;
        }
        // Show or hide `Open Cheatsheet` button
        if (Cheatsheet.csStatusBarItem) {
            if (showCsStatusBarItem) {
                Cheatsheet.csStatusBarItem.text = 'Open Cheatsheet';
                Cheatsheet.csStatusBarItem.show();
            }
            else {
                Cheatsheet.csStatusBarItem.hide();
            }
        }
    }
    // Run on change active text editor
    static onDidChangeActiveTextEditor() {
        // Update to the "Open Cheatsheet" status bar icon
        Cheatsheet.updateStatusBar();
    }
    // Run when configurations are changed
    static onDidChangeConfiguration(config) {
        // Load the configuration changes
        Cheatsheet.config.displayInStatusBar = config.get('cheatsheet.displayInStatusBar', 'openDoc');
        Cheatsheet.config.colorScheme = config.get('cheatsheet.colorScheme', 'auto');
        Cheatsheet.config.openToSide = config.get('cheatsheet.openToSide', 'beside');
        // Update the status bar
        this.updateStatusBar();
        // Update css of webview (if config option has changed)
        if (Cheatsheet.config.lastColorScheme !==
            Cheatsheet.config.colorScheme &&
            Cheatsheet.currentPanel !== undefined) {
            Cheatsheet.config.lastColorScheme = Cheatsheet.config.colorScheme; // Update last colorScheme
            Cheatsheet.currentPanel.updateWebviewContent(); // Update webview html content
        }
    }
    // Updates webview html content
    updateWebviewContent() {
        // If config.colorScheme isn't defined, use colorScheme 'auto'
        const colorScheme = Cheatsheet.config.colorScheme !== undefined
            ? Cheatsheet.config.colorScheme
            : 'auto';
        this._panel.webview.html = this.getWebviewContent(colorScheme);
    }
    //*****************************************************************************
    // Private Methods
    //*****************************************************************************
    // Returns true if there is at least one open document of languageId 'scad'
    static isScadDocOpen() {
        const openDocs = vscode.workspace.textDocuments;
        let isScadDocOpen = false;
        // Iterate through open text documents
        openDocs.forEach((doc) => {
            if (this.isDocScad(doc))
                // If document is of type 'scad' return true
                isScadDocOpen = true;
        });
        return isScadDocOpen;
    }
    // Returns true is current document is of type 'scad'
    static isDocScad(doc) {
        const langId = doc.languageId;
        // vscode.window.showInformationMessage("Doc: " + doc.fileName + "\nLang id: " + langId); // DEBUG
        return langId === 'scad';
    }
    // Returns cheatsheet html for webview
    getWebviewContent(styleKey) {
        // Read HTML from file
        let htmlContent = fs
            .readFileSync(path.join(this._extensionPath, 'media', 'cheatsheet.html'))
            .toString();
        // Get the filename of the given colorScheme
        // Thank you: https://blog.smartlogic.io/accessing-object-attributes-based-on-a-variable-in-typescript/
        const styleSrc = styleKey in colorScheme
            ? colorScheme[styleKey]
            : colorScheme['auto'];
        // Get style sheet URI
        const styleUri = vscode.Uri.file(path.join(this._extensionPath, 'media', styleSrc)).with({ scheme: 'vscode-resource' });
        // if (DEBUG) console.log("Style" + styleUri); // DEBUG
        // Replace `{{styleSrc}}` with the vscode URI for the desired `.css` file
        htmlContent = htmlContent.replace('{{styleSrc}}', styleUri.toString());
        return htmlContent;
    }
}
exports.Cheatsheet = Cheatsheet;
Cheatsheet.csCommandId = 'openscad.cheatsheet'; // Command id for opening the cheatsheet
Cheatsheet.viewType = 'cheatsheet'; // Internal reference to cheatsheet panel
Cheatsheet.config = {}; // Extension config
//# sourceMappingURL=cheatsheet.js.map