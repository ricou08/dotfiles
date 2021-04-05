"use strict";
class Channel {
    /**
     *
     * Example for a Channel definition
     * Thing <binding_id>:<type_id>:<thing_id> "Label" @ "Location" [ <parameters> ]
     *
     * @param line
     * @param leadingWhiteSpace
     * @param type
     * @param name
     * @param label
     * @param icon
     * @param group
     * @param tag
     * @param channel
     * @param comment
     */
    constructor(line, leadingWhiteSpace, keyword_id, type_id, channel_id, label, parameters, comment) {
        this.line = line;
        this.leadingWhiteSpace = leadingWhiteSpace;
        this.keyword_id = keyword_id;
        this.type_id = type_id;
        this.channel_id = channel_id;
        this.label = label;
        this.parameters = parameters;
        this.comment = comment ? comment : "";
    }
}
module.exports = Channel;
//# sourceMappingURL=channel.js.map