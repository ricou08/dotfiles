"use strict";
/*---------------------------------------------------------------------------------------------
 * Preview Store
 *
 * Class to manage a Set of previews
 *--------------------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const path_1 = require("path");
const preview_1 = require("./preview");
const config_1 = require("./config");
// Used to keep track of Set of Previews
class PreviewStore /* extends vscode.Disposable */ {
    // Constructor
    constructor(maxPreviews) {
        this._previews = new Set();
        this._maxPreviews = maxPreviews ? maxPreviews : 0;
        this.setAreOpenPreviews(false);
    }
    // Dispose of the PreviewStore
    dispose() {
        // super.dispose();
        for (const preview of this._previews) {
            preview.dispose();
        }
        this._previews.clear();
    }
    // Defines: PreviewStore[]
    [Symbol.iterator]() {
        return this._previews[Symbol.iterator]();
    }
    // Finds a resource in the PreviewStore by uri
    // Returns the preview if found, otherwise undefined
    get(resource, previewType) {
        for (const preview of this._previews) {
            if (preview.matchUri(resource, previewType)) {
                return preview;
            }
        }
        return undefined;
    }
    // Add preview
    add(preview) {
        this._previews.add(preview);
        preview.onKilled.subscribe(() => this._previews.delete(preview)); // Auto delete when killed
        this.setAreOpenPreviews(true);
    }
    // Create new preview (if not one with same uri) and then add it
    createAndAdd(uri, args) {
        const previewType = PreviewStore.getPreviewType(args);
        // Check there's not an existing preview of same type (can view and export same file)
        if (this.get(uri, previewType) === undefined) {
            const newPreview = preview_1.Preview.create(uri, previewType, args);
            if (!newPreview)
                return undefined;
            this.add(newPreview);
            if (newPreview.previewType === 'output')
                this.makeExportProgressBar(newPreview);
            return newPreview;
        }
        return undefined;
    }
    // Delete and dispose of a preview
    delete(preview, informUser) {
        preview.dispose();
        if (informUser)
            vscode.window.showInformationMessage(`Killed: ${path_1.basename(preview.uri.fsPath)}`);
        this._previews.delete(preview);
        if (this.size === 0) {
            this.setAreOpenPreviews(false);
        }
    }
    // Functionally same as dispose() but without super.dispose()
    deleteAll(informUser) {
        for (const preview of this._previews) {
            preview.dispose();
            if (informUser)
                vscode.window.showInformationMessage(`Killed: ${path_1.basename(preview.uri.fsPath)}`);
        }
        this._previews.clear();
        this.setAreOpenPreviews(false);
    }
    // Returns a list of all the uris
    getUris() {
        const uris = [];
        // this.cleanup(); // Clean up any killed instances that weren't caught
        for (const preview of this._previews) {
            uris.push(preview.uri);
        }
        return uris;
    }
    // Create progress bar for exporting
    makeExportProgressBar(preview) {
        // Progress window
        vscode.window.withProgress({
            location: vscode.ProgressLocation.Notification,
            title: `Exporting: ${path_1.basename(preview.uri.fsPath)}`,
            cancellable: true,
        }, (progress, token) => {
            // Create and add new OpenSCAD preview to PreviewStore
            // Cancel export
            token.onCancellationRequested(() => {
                if (config_1.DEBUG)
                    console.log('Canceled Export');
                this.delete(preview);
            });
            // Return promise that resolve the progress bar when the preview is killed
            const p = new Promise((resolve) => {
                preview.onKilled.subscribe(() => resolve(null));
            });
            return p;
        });
    }
    // Returns the preview type based on the arguments supplied
    static getPreviewType(args) {
        return (args === null || args === void 0 ? void 0 : args.some((item) => ['-o', '--o'].includes(item))) ? 'output'
            : 'view';
    }
    // Returns size (length) of PreviewStore
    get size() {
        return this._previews.size;
    }
    get maxPreviews() {
        return this._maxPreviews;
    }
    set maxPreviews(num) {
        this._maxPreviews = num;
    }
    // Set context 'areOpenPreviews' for use in 'when' clauses
    setAreOpenPreviews(value) {
        vscode.commands.executeCommand('setContext', PreviewStore.areOpenScadPreviewsContextKey, value);
    }
}
exports.PreviewStore = PreviewStore;
PreviewStore.areOpenScadPreviewsContextKey = 'areOpenScadPreviews';
//# sourceMappingURL=previewStore.js.map