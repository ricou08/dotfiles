"use strict";
class Bridge {
    /**
     *
     * Example for a thing definition
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
    constructor(line, leadingWhiteSpace, binding_id, type_id, thing_id, label, location, parameters, things, comment) {
        this.line = line;
        this.leadingWhiteSpace = leadingWhiteSpace;
        this.binding_id = binding_id;
        this.type_id = type_id;
        this.thing_id = thing_id;
        this.label = label;
        this.location = location;
        this.parameters = parameters;
        this.things = things;
        this.comment = comment ? comment : "";
    }
}
module.exports = Bridge;
//# sourceMappingURL=bridge.js.map