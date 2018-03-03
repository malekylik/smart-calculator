class SmartCalculator {
  constructor(initialValue) {
    this.initialValue = initialValue;
    this.values =[];
    this.values.push(initialValue);

    this.priority = {
      '+':1,
      '-':1,
      '*':2,
      '/':2,
      '^':3
    };

    this.operation = [];
  }

  add(number) {
    this.values.push(number);
    this.operation.push('+');
    return this;
  }
  
  subtract(number) {
    this.values.push(number);
    this.operation.push('-');
    return this;
  }

  multiply(number) {
    this.values.push(number);
    this.operation.push('*');
    return this;
  }

  devide(number) {
    this.values.push(number);
    this.operation.push('/');
    return this;
  }

  pow(number) {
    this.values.push(number);
    this.operation.push('^');
    return this;
  }

  toString(){
    return this.valueOf() +'';
  }

  valueOf(){
    let tempExpression = [];
    let stack = [];

    tempExpression.push(this.values[0]);
  
    for(let i = 0; i < this.operation.length; i++){
      if(stack.length == 0){
        stack.push(this.operation[i]);
      }else{
        if(this.operation[i] != '^' || stack[stack.length - 1] != '^'){
      if(this.priority[this.operation[i]] <= this.priority[stack[stack.length - 1]]){
        while(this.priority[this.operation[i]] <= this.priority[stack[stack.length - 1]]){
          tempExpression.push(stack.pop());
        }
        stack.push(this.operation[i]);
      }
      else{
        stack.push(this.operation[i]);
      }
    }      else{
      stack.push(this.operation[i]);
    }
  }
      tempExpression.push(this.values[i + 1]);
    }

    let temp;
    while(temp = stack.pop()){
      tempExpression.push(temp)
    }

    for(let i = 0; i < tempExpression.length; i++){
      if(tempExpression[i] == '+'){
        stack.push(stack.pop() + stack.pop());
        continue;
      }

      if(tempExpression[i] == '-'){
        let v1 = stack.pop();
        let v2 = stack.pop();
        stack.push(v2 - v1);
        continue;
      }


      if(tempExpression[i] == '*'){
        stack.push(stack.pop() * stack.pop());
        continue;
      }

      if(tempExpression[i] == '/'){
        let v1 = stack.pop();
        let v2 = stack.pop();
        stack.push(v2 / v1);
        continue;

      }

      if(tempExpression[i] == '^'){
        let v1 = stack.pop();
        let v2 = stack.pop();
        stack.push(Math.pow(v2,v1));
        continue;
      }

      stack.push(tempExpression[i]);
    }
  
    return stack.pop();
  }


}


module.exports = SmartCalculator;
