"use strict";
class Thing {
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
    constructor(range, leadingWhiteSpace, highestLengths, thing_type, binding_id, type_id, thing_id, label, location, parameters, comment) {
        this.range = range;
        this.leadingWhiteSpace = leadingWhiteSpace;
        this.highestLengths = highestLengths;
        this.thing_type = thing_type;
        this.binding_id = binding_id;
        this.type_id = type_id;
        this.thing_id = thing_id;
        this.label = label;
        this.location = location;
        this.parameters = parameters;
        this.comment = comment ? comment : "";
    }
}
module.exports = Thing;
//# sourceMappingURL=thing.js.map