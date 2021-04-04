"use strict";
/*---------------------------------------------------------------------------------------------
 * Preview
 *
 * Stores a single instance of OpenSCAD
 *--------------------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const child = require("child_process");
const os_1 = require("os");
const ste_signals_1 = require("ste-signals");
const config_1 = require("./config");
const commandExists = require("command-exists");
const pathByPlatform = {
    Linux: 'openscad',
    Darwin: '/Applications/OpenSCAD.app/Contents/MacOS/OpenSCAD',
    Windows_NT: 'C:\\Program Files\\Openscad\\openscad.exe',
};
// Preview class to open instance of OpenSCAD
class Preview {
    // Constructor
    constructor(fileUri, previewType, args) {
        this._onKilled = new ste_signals_1.SignalDispatcher();
        // Set local arguments
        this._fileUri = fileUri;
        this._previewType = previewType ? previewType : 'view';
        const commandArgs = args
            ? args.concat(this._fileUri.fsPath)
            : [this._fileUri.fsPath];
        if (config_1.DEBUG)
            console.log(`commangArgs: ${commandArgs}`); // DEBUG
        // New process
        this._process = child.execFile(Preview._scadPath, commandArgs, (error, stdout, stderr) => {
            // If there's an error
            if (error) {
                // console.error(`exec error: ${error}`);
                if (config_1.DEBUG)
                    console.error(`stderr: ${stderr}`); // DEBUG
                vscode.window.showErrorMessage(stderr); // Display error message
            }
            // No error
            else {
                // For some reason, OpenSCAD seems to use stderr for all console output...
                // If there is no error, assume stderr should be treated as stdout
                // For more info. see: https://github.com/openscad/openscad/issues/3358
                const message = stdout || stderr;
                if (config_1.DEBUG)
                    console.log(`stdout: ${message}`); // DEBUG
                vscode.window.showInformationMessage(message); // Display info
            }
            // if (DEBUG) console.log(`real stdout: ${stdout}`);    // DEBUG
            this._isRunning = false;
            this._onKilled.dispatch(); // Dispatch 'onKilled' event
        });
        // Child process is now running
        this._isRunning = true;
    }
    // Kill child process
    dispose() {
        if (this._isRunning)
            this._process.kill();
        // this._isRunning = false;
    }
    // Returns if the given Uri is equivalent to the preview's Uri
    matchUri(uri, previewType) {
        return (this._fileUri.toString() === uri.toString() &&
            this._previewType === (previewType ? previewType : 'view'));
    }
    // Return Uri
    get uri() {
        return this._fileUri;
    }
    // Get if running
    get isRunning() {
        return this._isRunning;
    }
    // On killed handlers
    get onKilled() {
        return this._onKilled.asEvent();
    }
    // Static factory method. Create new preview child process
    // Needed to make sure path to `openscad.exe` is defined
    static create(resource, previewType, args) {
        // Error checking
        // Make sure scad path is defined
        if (!Preview._isValidScadPath) {
            if (config_1.DEBUG)
                console.error('OpenSCAD path is undefined in config');
            vscode.window.showErrorMessage('OpenSCAD path does not exist.');
            return undefined;
        }
        // If previewType is undefined, automatically assign it based on arguemnts
        if (!previewType)
            previewType = (args === null || args === void 0 ? void 0 : args.some((item) => ['-o', '--o'].includes(item))) ? 'output'
                : 'view';
        // New file
        return new Preview(resource, previewType, args);
    }
    // Used to set the path to `openscad.exe` on the system. Necessary to open children
    static setScadPath(scadPath) {
        // Set OpenSCAD path if specified; otherwise use system default
        Preview._scadPath = scadPath
            ? scadPath
            : pathByPlatform[os_1.type()];
        if (config_1.DEBUG)
            console.log(`Path: '${Preview._scadPath}'`); // DEBUG
        // Verify 'openscad' command is valid
        Preview._isValidScadPath = false; // Set to false until can test if the command exists
        commandExists(Preview._scadPath, (err, exists) => {
            Preview._isValidScadPath = exists;
        });
    }
    get previewType() {
        return this._previewType;
    }
    static get scadPath() {
        return Preview._scadPath;
    }
    static get isValidScadPath() {
        return Preview._isValidScadPath;
    }
}
exports.Preview = Preview;
Preview._isValidScadPath = false;
//# sourceMappingURL=preview.js.map