function arithmeticHandle(op1,op2,handle) {
  switch (handle) {
    case '+' :
      return parseFloat(op1)+parseFloat(op2)
    case '-' :
      return parseFloat(op1)-parseFloat(op2)
    case '*' :
      return parseFloat(op1)*parseFloat(op2)
    case '/' :
      return parseFloat(op1)/parseFloat(op2)
    default:
      return 0
  }
}

function afterCalculate(payload) {
  const { dataNumber, isCalculate } = payload.state
  const { setSubCount, setIsCalculate } = payload.setState
  if(dataNumber.length===0 && isCalculate===true){
    setSubCount('')
    setIsCalculate(false)
  }
}

function handleNumber(number, payload) {
  const { count } = payload.state
  const { setCount } = payload.setState
  afterCalculate(payload)
  if(count===0) {
    setCount(`${number}`)
  }else{
    setCount(`${count}${number}`)  
  }
}

function handleClear(payload) {
  const { 
    setCount, 
    setSubCount, 
    setDataNumber, 
    setDataHandle, 
    setIsCalculate 
  } = payload.setState
  setCount(0)
  setSubCount('')
  setDataNumber([])
  setDataHandle([])
  setIsCalculate(false)
}

function handleBackOne(payload) {
  const { count } = payload.state
  const { setCount } = payload.setState
  if(count.length===1){
    setCount(0)
  }else{
    count === 0 ? setCount(0) : setCount(count.slice(0,-1))
  }
}

function handlePlus(payload) {
  const { count, subCount, dataNumber, dataHandle } = payload.state
  const { setCount, setSubCount, setDataNumber, setDataHandle } = payload.setState
  if(subCount===''){
    setSubCount(`${count}+`)
    setDataNumber([{number: count}])
    setDataHandle([{handle: `+`}])
  }else{
    setSubCount(`${subCount}${count}+`)
    setDataNumber([...dataNumber, {number: count}])
    setDataHandle([...dataHandle, {handle: `+`}])
  }
  afterCalculate(payload)
  setCount(0)
}

function handleMinus(payload) {
  const { count, subCount, dataNumber, dataHandle } = payload.state
  const { setCount, setSubCount, setDataNumber, setDataHandle } = payload.setState
  if(subCount===''){
    setSubCount(`${count}-`)
    setDataNumber([{number: count}])
    setDataHandle([{handle: `-`}])
  }else{
    setSubCount(`${subCount}${count}-`)
    setDataNumber([...dataNumber, {number: count}])
    setDataHandle([...dataHandle, {handle: `-`}])
  }
  afterCalculate(payload)
  setCount(0)
}

function handleMultiple(payload) {
  const { count, subCount, dataNumber, dataHandle } = payload.state
  const { setCount, setSubCount, setDataNumber, setDataHandle } = payload.setState
  if(subCount===''){
    setSubCount(`${count}x`)
    setDataNumber([{number: count}])
    setDataHandle([{handle: `*`}])
  }else{
    setSubCount(`${subCount}${count}x`)
    setDataNumber([...dataNumber, {number: count}])
    setDataHandle([...dataHandle, {handle: `*`}])
  }
  afterCalculate(payload)
  setCount(0)
}

function handleDivider(payload) {
  const { count, subCount, dataNumber, dataHandle } = payload.state
  const { setCount, setSubCount, setDataNumber, setDataHandle } = payload.setState
  if(subCount===''){
    setSubCount(`${count}/`)
    setDataNumber([{number: count}])
    setDataHandle([{handle: `/`}])
  }else{
    setSubCount(`${subCount}${count}/`)
    setDataNumber([...dataNumber, {number: count}])
    setDataHandle([...dataHandle, {handle: `/`}])
  }
  setCount(0)
}

function swapArray(array, lastIndex) {
  let temp = array[0];

  array[0] = array[lastIndex];
  array[lastIndex] = temp;
}

async function calculate(payload) {
  const { dataNumber, dataHandle } = payload.state
  const { setCount, setSubCount, setDataNumber, setDataHandle } = payload.setState
  let value=0
  
  await swapArray(dataNumber, dataNumber.length-1)
  await swapArray(dataHandle, dataHandle.length-1)
  
  for(let i=0; i<dataNumber.length; i++) {
    let j=i-1
    if(j===-1){
      value= dataNumber[i].number
    }else{
      value= arithmeticHandle(value,dataNumber[i].number,dataHandle[j].handle)
    }
  }
  setCount(0)
  setSubCount(value)
  setDataNumber([])
  setDataHandle([])
}

function handleCount(payload) {
  const { count, subCount, dataNumber } = payload.state
  const { setSubCount, setDataNumber, setIsCalculate } = payload.setState
  if(subCount!==''){
    setSubCount(`${subCount}${count}`)
    setDataNumber([...dataNumber, {number: count}])
    setIsCalculate(true)
  }
}

export {
  handleNumber, 
  handleClear, 
  handleBackOne,
  handlePlus,
  handleMinus,
  handleMultiple,
  handleDivider,
  calculate,
  handleCount
}