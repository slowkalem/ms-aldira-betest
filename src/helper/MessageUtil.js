const MessageList = [];
MessageList["not.found.in.master"] = "{0}: {1} is not registered";
MessageList["found.duplicate"] = "duplicate data founded {0} : [{1}]";
MessageList["found.duplicate.entry"] =
  "Cannot add {0}, data has been registered";
MessageList["not.found"] = "Data Not Found";
MessageList["found"] = "Data Founded";
MessageList["create"] = "{0} data succesfully created";
MessageList["update"] = "{0} data succesfully edited";
MessageList["delete"] = "{0} data succesfully deleted";
MessageList["created"] = "Data succesfully created";
MessageList["updated"] = "Data succesfully edited";
MessageList["deleted"] = "Data succesfully deleted";
MessageList["not.access"] = "You have no access!";

String.prototype.format = function (args) {
  var str = this;
  return str.replace(String.prototype.format.regex, function (item) {
    var intVal = parseInt(item.substring(1, item.length - 1));
    var replace;
    if (intVal >= 0) {
      replace = args[intVal];
    } else if (intVal === -1) {
      replace = "{";
    } else if (intVal === -2) {
      replace = "}";
    } else {
      replace = "";
    }
    return replace;
  });
};
String.prototype.format.regex = new RegExp("{-?[0-9]+}", "g");

const GetMsg = (code, ...param) => {
  return MessageList[code].format(param);
};

module.exports = { GetMsg };
