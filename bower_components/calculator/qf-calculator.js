(function(){
  //naive sanitization, would normally use a library
  function sanitizeString(str){
    if (typeof str != 'string'){
      str = str.toString();
    }
    str = str.replace(/[A-Za-z\~`!@#$%^&_=}{:;'"<,.>?|]/g, "");
    str = str.replace("√", "Math.sqrt")
    return str.trim();
  }

  Polymer({
    // These default values are overridden
    // by the user's attribute values.
    theme: "light",
    buttons: [
      [
      {val: "addMem", label: "M+"},
      {val: "subMem", label: "M-"},
      {val: "recMem", label: "MR"},
      {val: "back", label: "back"} ],
      [
        {val: "calc", label: "("},
        {val: "calc", label: ")"},
        {val: "clear", label: "clear"},
        {val: "calc", label: "√("} ],
        [
          {val: "calc", label: "7"},
          {val: "calc", label: "8"},
          {val: "calc", label: "9"},
          {val: "calc", label: "*"} ],
          [
            {val: "calc", label: "4"},
            {val: "calc", label: "5"},
            {val: "calc", label: "6"},
            {val: "calc", label: "/"} ],
            [
              {val: "calc", label: "1"},
              {val: "calc", label: "2"},
              {val: "calc", label: "3"},
              {val: "calc", label: "-"} ],
              [
                {val: "calc", label: "0"},
                {val: "calc", label: "."},
                {val: "equal", label: "="},
                {val: "calc", label: "+"} ]
    ],
    equation: '',
    isDone: true,
    mem: 0,
    enter: function(e){
      //check for enter- equal
      if (e.keyCode == 13 && !this.isDone){
        this.equal();
      }
      //check for change from input box
      else if (e.keyCode != 13){
        this.isDone = false;
      }
    },
    calc: function(e){
      console.log(e);
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
      if (this.equation != 0){
        this.isDone = true;
        var eq = sanitizeString(this.equation);
        this.equation = eval(eq);
      }
    },
    clear: function(){
      this.equation = '';
      this.isDone = true;
    },
    back: function(){
      var str = this.equation.toString();
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
    doAction: function(e) {
      var func = e.path[0].attributes.value['value'];
      this[func](e);
    }
  });
})();
