import React, { useState, useEffect } from 'react'
import {
  handleNumber, 
  handleClear, 
  handleBackOne,
  handlePlus,
  handleMinus,
  handleMultiple,
  handleDivider,
  handleCount,
  calculate
} from './handle'
import './style.css'

function Calculator() {
  const [count, setCount] = useState(0)
  const [subCount, setSubCount] = useState('')
  const [dataNumber, setDataNumber] = useState([])
  const [dataHandle, setDataHandle] = useState([])
  const [isCalculate, setIsCalculate] = useState(false)

  const payload = {
    state: {
      count: count,
      subCount: subCount,
      dataNumber: dataNumber,
      dataHandle: dataHandle,
      isCalculate: isCalculate
    },
    setState: {
      setCount: setCount,
      setSubCount: setSubCount,
      setDataNumber: setDataNumber,
      setDataHandle: setDataHandle,
      setIsCalculate: setIsCalculate
    }
  }
  
  useEffect(() => {
    if(isCalculate===true){
      calculate(payload)
    }
  }, [isCalculate])

  return (
    <div className="container">
      <div className="header">
        <div className="title">
          Calculator Online
        </div>
      </div>
      <div className="content">
        <div className="contentBox">
          <div className="boxChild" />
          <div className="subTitle">
            Enter Number
          </div>
          <div className="contentBody">
            <div className="boxSide1" onClick={()=>handleClear(payload)}>C</div>
            <div className="boxMain">{count}</div>
            <div className="boxSide2" onClick={()=>handleBackOne(payload)}>{`<`}</div>
          </div>
        </div>
      </div>
      <div className="subCount">{subCount}</div>
      <div className="component">
        <div className="button" onClick={()=>handleNumber(1, payload)}>1</div>
        <div className="button" onClick={()=>handleNumber(2, payload)}>2</div>
        <div className="button" onClick={()=>handleNumber(3, payload)}>3</div>
        <div className="button" onClick={()=>handlePlus(payload)}>+</div>
        <div className="button" onClick={()=>handleNumber(4, payload)}>4</div>
        <div className="button" onClick={()=>handleNumber(5, payload)}>5</div>
        <div className="button" onClick={()=>handleNumber(6, payload)}>6</div>
        <div className="button" onClick={()=>handleMinus(payload)}>-</div>
        <div className="button" onClick={()=>handleNumber(7, payload)}>7</div>
        <div className="button" onClick={()=>handleNumber(8, payload)}>8</div>
        <div className="button" onClick={()=>handleNumber(9, payload)}>9</div>
        <div className="button" onClick={()=>handleMultiple(payload)}>x</div>
        <div className="button" onClick={()=>handleNumber(`.`, payload)}>.</div>
        <div className="button" onClick={()=>handleNumber(0, payload)}>0</div>
        <div className="buttonCount" onClick={()=>handleCount(payload)}>=</div>
        <div className="button" onClick={()=>handleDivider(payload)}>/</div>
      </div>
    </div>
  )
}

export default Calculator