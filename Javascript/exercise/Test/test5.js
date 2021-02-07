var theThing = null;var count=0;
var replaceThing = function () {
  var originalThing = theThing;
  var unused = function () {
    if (originalThing)
      console.log("hi");
  };
  theThing = {
    longStr: "1",
    someMethod: function () {
      console.log("asdfadf");
    }
  };
    console.log("new one",originalThing,"|",theThing);

};
setInterval(replaceThing, 100);