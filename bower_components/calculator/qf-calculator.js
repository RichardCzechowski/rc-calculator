(function(){
  function sanitizeString(str){
    str = str.replace(/[A-Za-z]/g, "");
    str = str.replace("√", "Math.sqrt")
    return str.trim();
  }
  Polymer({
    // These default values are overridden
    // by the user's attribute values.
    theme: "light",
    value: "42",
    equation: 0,
    isDone: true,
    calc: function(e, source, detail){
      var val = e.path[0].attributes.label.nodeValue.toString();
      console.log(e.path[0].attributes.label.nodeValue);
      if (this.isDone == false && val >= 0){
        this.equation += val;
      }
      else if (val >=0){
        this.isDone = false;
        this.equation = val;
      }
      else if (this.equation != 0){
        this.equation += val;
      }
    },
    equal: function(e, source, detail){
      if (!this.isDone){
        this.isDone = true;
        var eq = sanitizeString(this.equation);
        this.equation = eval(eq);
      }
    },
    clear: function(e, source, detail){
      this.equation = 0;
      this.isDone = true;
    }

  });
})();
