import React, { use, useEffect, useState } from "react";

const Body = () => {
  const [input, setInput] = useState("");
  const [n7, setn7] = useState(0);
  const [n8, setn8] = useState(0);
  const [n9, setn9] = useState(0);
  const [n4, setn4] = useState(0);
  const [n5, setn5] = useState(0);
  const [n6, setn6] = useState(0);
  const [n1, setn1] = useState(0);
  const [n2, setn2] = useState(0);
  const [n3, setn3] = useState(0);
  const [n0, setn0] = useState(0);

  const [add, setAdd] = useState("");
  const [sub, setSub] = useState("");
  const [mul, setMul] = useState("");
  const [div, setDiv] = useState("");
  const [mod, setMod] = useState("");

  function infixToPostfix(expression) {
    const output = [];
    const stack = [];
    const precedence = (op) => {
      if (op === "+" || op === "-") return 1;
      if (op === "*" || op === "/" || op === "%") return 2;
      return 0;
    };
    const isOperator = (token) => ["+", "-", "*", "/", "%"].includes(token);
    const tokens = expression.match(/(\d+\.?\d*|\+|\-|\*|\/|%|\(|\))/g);

    for (let token of tokens) {
      if (!isNaN(token)) {
        output.push(token);
      } else if (isOperator(token)) {
        while (
          stack.length &&
          isOperator(stack[stack.length - 1]) &&
          precedence(stack[stack.length - 1]) >= precedence(token)
        ) {
          output.push(stack.pop());
        }
        stack.push(token);
      } else if (token === "(") {
        stack.push(token);
      } else if (token === ")") {
        while (stack.length && stack[stack.length - 1] !== "(") {
          output.push(stack.pop());
        }
        stack.pop();
      }
    }
    while (stack.length) {
      output.push(stack.pop());
    }
    return output;
  }

  function evaluate(str) {
    const postfix = infixToPostfix(str);
    const stack = [];
    for (let token of postfix) {
      if (!isNaN(token)) {
        stack.push(parseFloat(token));
      } else {
        const b = stack.pop();
        const a = stack.pop();
        switch (token) {
          case "+":
            stack.push(a + b);
            break;
          case "-":
            stack.push(a - b);
            break;
          case "*":
            stack.push(a * b);
            break;
          case "/":
            stack.push(a / b);
            break;
          case "%":
            stack.push(a % b);
            break;
        }
      }
    }
    return stack[0];
  }

  function appendToInput(char) {
    const isDigit = !isNaN(char) && char !== " ";
    const operators = ["+", "-", "*", "/", "%"];

    if (input === "") {
      if (char === "-" || char === "(" || isDigit || char === ".") {
        setInput(char);
      }
      return;
    }

    const lastChar = input[input.length - 1];
    if (operators.includes(lastChar) && operators.includes(char)) {
      if (char === "-" && !operators.includes(lastChar)) {
        setInput(input + char);
      } else {
        setInput(input.slice(0, -1) + char);
      }
      return;
    }
    if (char === ".") {
      const parts = input.split(/[\+\-\*\/\%]/);
      const lastNumber = parts[parts.length - 1];
      if (lastNumber.includes(".")) return;
    }

    setInput(input + char);
  }

  useEffect(() => {
    const handleKeyPress = (event) => {
      const { key } = event;
      if(event.ctrlKey && key === "Backspace"){
          setInput("");
          return ;
      }
      const validKeys = ["0","1","2","3","4","5","6","7","8","9","+","-","*","/","%",".","Enter","Backspace","Escape"];
      if (validKeys.includes(key)) {
        event.preventDefault();
        if (key === "Enter") {
          try {
            const result = evaluate(input);
            setInput(result.toString());
          } catch (error) {
            setInput(" Error");
          }
        } else if (key === "Backspace") {
          setInput(input.slice(0, -1));
        } else if(key === "Escape"){
          setInput("");
        } else {
          appendToInput(key);
        }
      }      
    }
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    }
  },[input]);

  return (
    <div className="border-2 w-[400px] h-96 border-black m-auto rounded-lg flex flex-col p-3 justify-center">
      <div className="border-2 h-10 mt-2 flex p-1 text-center justify-end text-2xl rounded font-mono">
        {input === "" ? 0 : input}
      </div>
      <div className="grid grid-cols-4 gap-2 mt-4">
        <button
          className="bg-gray-300 p-3 rounded-lg"
          onClick={() => {
            setInput("");
          }}
        >
          AC
        </button>
        <button
          className="bg-gray-300 p-3 rounded-lg"
          value={"D"}
          onClick={() => {
            setInput(input.slice(0, -1));
          }}
        >
          D
        </button>
        <button
          className="bg-gray-300 p-3 rounded-lg"
          value={"%"}
          onClick={(e) => {
            setMod(e.target.value);
            appendToInput(e.target.value);
          }}
        >
          %
        </button>
        <button
          className="bg-orange-400 p-3 rounded-lg"
          value={"/"}
          onClick={(e) => {
            setDiv(e.target.value);
            appendToInput(e.target.value);
          }}
        >
          /
        </button>
        <button
          value={7}
          className="bg-gray-300 p-3 rounded-lg"
          onClick={(e) => {
            setn7(Number(e.target.value));
            appendToInput(e.target.value);
          }}
        >
          7
        </button>
        <button
          value={8}
          className="bg-gray-300 p-3 rounded-lg"
          onClick={(e) => {
            setn8(Number(e.target.value));
            appendToInput(e.target.value);
          }}
        >
          8
        </button>
        <button
          value={9}
          className="bg-gray-300 p-3 rounded-lg"
          onClick={(e) => {
            setn9(Number(e.target.value));
            appendToInput(e.target.value);
          }}
        >
          9
        </button>
        <button
          value={"*"}
          className="bg-orange-400 p-3 rounded-lg"
          onClick={(e) => {
            setMul(e.target.value);
            appendToInput(e.target.value);
          }}
        >
          *
        </button>
        <button
          value={4}
          className="bg-gray-300 p-3 rounded-lg"
          onClick={(e) => {
            setn4(Number(e.target.value));
            appendToInput(e.target.value);
          }}
        >
          4
        </button>
        <button
          value={5}
          className="bg-gray-300 p-3 rounded-lg"
          onClick={(e) => {
            setn5(Number(e.target.value));
            appendToInput(e.target.value);
          }}
        >
          5
        </button>
        <button
          value={6}
          className="bg-gray-300 p-3 rounded-lg"
          onClick={(e) => {
            setn6(Number(e.target.value));
            appendToInput(e.target.value);
          }}
        >
          6
        </button>
        <button
          value={"-"}
          className="bg-orange-400 p-3 rounded-lg"
          onClick={(e) => {
            setSub(e.target.value);
            appendToInput(e.target.value);
          }}
        >
          -
        </button>
        <button
          value={1}
          className="bg-gray-300 p-3 rounded-lg"
          onClick={(e) => {
            setn1(Number(e.target.value));
            appendToInput(e.target.value);
          }}
        >
          1
        </button>
        <button
          value={2}
          className="bg-gray-300 p-3 rounded-lg"
          onClick={(e) => {
            setn2(Number(e.target.value));
            appendToInput(e.target.value);
          }}
        >
          2
        </button>
        <button
          value={3}
          className="bg-gray-300 p-3 rounded-lg"
          onClick={(e) => {
            setn3(Number(e.target.value));
            appendToInput(e.target.value);
          }}
        >
          3
        </button>
        <button
          value={"+"}
          className="bg-orange-400 p-3 rounded-lg"
          onClick={(e) => {
            setAdd(e.target.value);
            appendToInput(e.target.value);
          }}
        >
          +
        </button>
        <button
          value={0}
          className="bg-gray-300 p-3 rounded-lg col-span-2"
          onClick={(e) => {
            setn0(Number(e.target.value));
            appendToInput(e.target.value);
          }}
        >
          0
        </button>
        <button
          value={"."}
          className="bg-gray-300 p-3 rounded-lg"
          onClick={(e) => {
            appendToInput(e.target.value);
          }}
        >
          .
        </button>
        <button
          value={"="}
          className="bg-orange-400 p-3 rounded-lg"
          onClick={() => {
            try {
              const result = evaluate(input);
              setInput(result);
            } catch (error) {
              setInput(" Error");
            }
          }}
        >
          =
        </button>
      </div>
    </div>
  );
};
export default Body;