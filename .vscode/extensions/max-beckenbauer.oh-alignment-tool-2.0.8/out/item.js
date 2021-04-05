"use strict";
class Item {
    constructor(range, leadingWhiteSpace, formatOption, highestLengths, type, name, label, icon, group, tag, channel, comment) {
        this.range = range;
        this.leadingWhiteSpace = leadingWhiteSpace;
        this.formatOption = formatOption;
        this.highestLengths = highestLengths;
        this.type = type;
        this.name = name;
        this.label = label.replace(/\"\s*/, '"').replace(/\s*\"/, '"');
        this.icon = icon.replace(/\<\s*/, "<").replace(/\s*\>/, ">");
        this.group = group.replace(/\(\s*/, "(").replace(/\s*\)/, ")");
        this.tag = tag;
        this.channel = channel
            .replace(/\{\s*/, "{")
            .replace(/\s*\}/, "}")
            .replace(/\s*,\s*/, ", ");
        this.comment = comment ? comment : "";
    }
}
module.exports = Item;
//# sourceMappingURL=item.js.map