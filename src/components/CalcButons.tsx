import { useRef, useState } from "react"

export function CalcButtons() {
    let convertedScreenNumber = useRef(0);
    let firstNumber = useRef(0);
    let chosenModifier = useRef('');
    let [screenNumber, setNumber] = useState('0');
    let result = useRef(0)
    const [state, setState] = useState({
        divi: 'calcButton',
        mul: 'calcButton',
        add: 'calcButton',
        sub: 'calcButton',
    });

    const updateScreen = () => {
        setNumber(screenNumber);
        
        return (
            <div className="calcScreen">
                <p>{screenNumber}</p>
            </div>
        )
    }

    const AddToScreenNumber = (n: string) => {
        if (screenNumber === '0')
            screenNumber = n;
        else
            screenNumber += n;
        updateScreen();
    }

    const OperatorModifier = (str: string) => {
        firstNumber.current = parseFloat(screenNumber);
        chosenModifier.current = str;
        ClearAll();
    }

    const ClearAll = () => { 
        if (screenNumber = '')
            firstNumber.current = 0
        else
            screenNumber = "0"; 
        updateScreen()
    }

    const SignedNumber = () => {
        screenNumber = screenNumber[0] == '-' ? screenNumber.slice(1) : '-' + screenNumber;
        updateScreen()
    }

    const Equals = () => {
        convertedScreenNumber.current = parseFloat(screenNumber);

        switch(chosenModifier.current){
            case '+':
                result.current = firstNumber.current + convertedScreenNumber.current;
                break;
            case '-':
                result.current = firstNumber.current - convertedScreenNumber.current;
                break;
            case '*':
                result.current = firstNumber.current * convertedScreenNumber.current;
                break;
            case '÷':
                result.current = firstNumber.current / convertedScreenNumber.current;
                break;
            default:
                console.log("Uh this isn't right")
        }

        screenNumber = ''+result.current;
        
        setState({...state, 
            divi: 'calcButton',
            mul: 'calcButton',
            add: 'calcButton',
            sub: 'calcButton'})
        updateScreen()
    }

    const ActiveState = (s:String) => {
        switch(s){
            case 'divi':
                if (state.divi === 'calcButton')
                    setState({...state, 
                            divi: 'calcButton active',
                            mul: 'calcButton',
                            add: 'calcButton',
                            sub: 'calcButton'})
                else
                    setState({...state, divi: 'calcButton'})
                break;
            case 'mul':
                if (state.mul === 'calcButton')
                    setState({...state, 
                        divi: 'calcButton',
                        mul: 'calcButton active',
                        add: 'calcButton',
                        sub: 'calcButton'})
                else   
                    setState({...state, mul: 'calcButton'})
                break;
            case 'add':
                if (state.add === 'calcButton')
                    setState({...state,
                        divi: 'calcButton',
                        mul: 'calcButton',
                        add: 'calcButton active',
                        sub: 'calcButton'})
                else 
                    setState({...state, add: 'calcButton'})
                break;
            case 'sub':
                if (state.sub === 'calcButton')
                        setState({...state,
                            divi: 'calcButton',
                            mul: 'calcButton',
                            add: 'calcButton',
                            sub: 'calcButton active'})
                else   
                    setState({...state, sub: 'calcButton'})
            
        }
    }

    return(
        <>
        <div className="calcScreen">
            <p>{screenNumber}</p>
        </div>
        <table>
            <thead>
            <tr>
                <td><button className="calcButton" onClick={() => AddToScreenNumber('1')}>1</button></td>
                <td><button className="calcButton" onClick={() => AddToScreenNumber('2')}>2</button></td>
                <td><button className="calcButton" onClick={() => AddToScreenNumber('3')}>3</button></td>
                <td><button className={state.divi} onClick={() => {OperatorModifier('÷'); ActiveState('divi');}}>÷</button></td>
            </tr>
            <tr>
                <td><button className="calcButton" onClick={() => AddToScreenNumber('4')}>4</button></td>
                <td><button className="calcButton" onClick={() => AddToScreenNumber('5')}>5</button></td>
                <td><button className="calcButton" onClick={() => AddToScreenNumber('6')}>6</button></td>
                <td><button className={state.mul} onClick={() => {OperatorModifier('*'); ActiveState('mul');}}>*</button></td>
            </tr>
            <tr>
                <td><button className="calcButton" onClick={() => AddToScreenNumber('7')}>7</button></td>
                <td><button className="calcButton" onClick={() => AddToScreenNumber('8')}>8</button></td>
                <td><button className="calcButton" onClick={() => AddToScreenNumber('9')}>9</button></td>
                <td><button className={state.add} onClick={() => {OperatorModifier('+'); ActiveState('add');}}>+</button></td>
            </tr>
            <tr>
                <td><button className="calcButton" onClick={() => AddToScreenNumber('.')}>.</button></td>
                <td><button className="calcButton" onClick={() => AddToScreenNumber('0')}>0</button></td>
                <td><button className="calcButton" onClick={() => AddToScreenNumber('1')}>%</button></td>
                <td><button className={state.sub} onClick={() => {OperatorModifier('-'); ActiveState('sub');}}>-</button></td>
            </tr>
            <tr>
                <td><button className="calcButton" onClick={SignedNumber}>+/-</button></td>
                <td><button className="calcButton" onClick={ClearAll}>c</button></td>
                <td><button className="calcButton"></button></td>
                <td><button className="calcButton" onClick={Equals}>=</button></td>
            </tr>
            </thead>
        </table>
        </>
    )
}