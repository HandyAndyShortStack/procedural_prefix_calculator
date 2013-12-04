function parsePrefix(input) {
  var result = '';
  var arr = [];

  input.split('').map(function(item, index) {
    var visitFunc;
    var value = item;

    if (isNaN(parseInt(value))) {
      visitFunc = function(direction) {
        if (this.visits === 1) {
          result += '(';
          return this.goForward();
        } else if (this.visits === 2) {
          result += this.value;
          return this.goForward();
        } else if (this.visits === 3) {
          result += ')';
          return this.goBack();
        } else {
          return this[direction]();
        }
      };
    } else {
      visitFunc = function(direction) {
        if (this.visits === 1) {
          result += this.value;
          return this.goBack();
        } else {
          return this[direction]();
        }
      }
    }

    arr.push({
      index: index,
      value: value,
      visits: 0,
      visit: function(direction) {
        this.visits += 1;
        return visitFunc.call(this, direction);
      },
      goForward: function() {
        return arr[this.index + 1].visit('goForward');
      },
      goBack: function() {
        return arr[this.index - 1].visit('goBack');
      }
    });

    arr[-1] = {
      visit: function() {
        return result;
      }
    };
  });
  
  return arr[0].visit('goForward');
}
