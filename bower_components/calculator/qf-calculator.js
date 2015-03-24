(function(){
  //naive sanitization, would normally use a library
  function sanitizeString(str){
    str = str.replace(/[A-Za-z]/g, "");
    str = str.replace("√", "Math.sqrt")
    return str.trim();
  }

  Polymer({
    // These default values are overridden
    // by the user's attribute values.
    theme: "light",
    equation: 0,
    isDone: true,
    mem: 0,
    calc: function(e){
      var val;
      if (typeof e == 'number'){
        val = e;
      }
      else{
        val = e.path[0].attributes.label.nodeValue.toString();
      }
      //if we haven't submitted, and a number is pressed, add element.
      if (this.isDone == false && val >= 0){
        this.equation += val;
      }
      //if a number is pressed, add element and reset submitted.
      else if (val >=0){
        this.isDone = false;
        this.equation = val;
      }
      //if we have submitted, and a symbol is pressed, add element.
      else if (this.equation != 0){
        this.isDone = false;
        this.equation += val;
      }
    },
    equal: function(){
      //make sure you can't submit twice, then sanitize and eval
      if (!this.isDone){
        this.isDone = true;
        var eq = sanitizeString(this.equation);
        this.equation = eval(eq);
      }
    },
    clear: function(){
      this.equation = 0;
      this.isDone = true;
    },
    back: function(){
      var str = this.equation;
      str = str.substring(0, str.length - 1);
      this.equation = str;
    },
    addMem: function(){
      //parse equation, check for NaN, save
      var num = parseInt(this.equation, 10);
      if (typeof num == 'number' && num){
        this.mem = num;
      }
    },
    subMem: function(){
      this.mem = 0;
    },
    recMem: function(){
      this.calc(this.mem);
    },
  });
})();
