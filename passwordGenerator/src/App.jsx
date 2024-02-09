import { useState, useCallback,useEffect,useRef } from 'react'


function App() {
  const [length, setLength] = useState(8)
  const [number,setNumber]=useState(false)
  const [char,setChar]=useState(false)
  const [password,setPassword]=useState(false)
  const [isClicked, setIsClicked] = useState(false);



  const passwordRef=useRef(null);
  
  const passwordGenerator=useCallback(()=>{
    let pass=""
    let str="QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm"
    if(number){
     str+="1234567890"
    }
    if(char){
      str+="!@#$%^&*())_"
    }
    for(let i=0;i<length;i++){
      let x = Math.trunc(Math.random() * str.length);
      pass+=str[x];
    }
    setPassword(pass)
  },[length,number,char,setPassword])

  const copyPasswordToClipBoard=useCallback(()=>{
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
    setIsClicked(true);

    // Reset the click effect after a certain delay
    setTimeout(() => {
      setIsClicked(false);
    }, 200); // Adjust the delay as needed
  },[password])

 useEffect(()=>{passwordGenerator()},[length,number,char,passwordGenerator])
  return (
    <>
     <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-1 my-8 text-orange-500 bg-gray-700'>
      <h1 className='text-white text-center my-4 mx-3'>Password generator</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-r'>
      <input type="text" 
      value={password}
      className='outline-none w-full py-1 px-3'
      placeholder='Password'
      readOnly
      ref={passwordRef}
      />
      <button  onClick={copyPasswordToClipBoard}
            className={`outline-none px-3 py-0.5 ${
              isClicked ? 'bg-grey-700 text-white' : 'bg-blue-700 text-white'
            }`}>
        copy
      </button>
      </div>
      <div className='flex text-sm gap-x-2'>
        <div className='dlex item-center gap-x-1'>
          <input type="range" 
          min={6}
          max={100}
          value={length}
          className='cursor-pointer'
          onChange={(e)=>{setLength(e.target.value)}}/>
          <label >Length:{length}</label>
          
        </div>
        <div className=' flex items-center gap-x-1'>
          <input type="checkbox"
          defaultChecked={number}
          id='numberInput'
          onChange={()=>{
            setNumber((prev)=>!prev);
          }}
           />
           <label htmlFor='number'>Number</label>
           
        </div>
        <div className=' flex items-center gap-x-1'>
          <input type="checkbox"
          defaultChecked={char}
          id='charInput'
          onChange={()=>{
            setChar((prev)=>!prev);
          }}
           />
           <label htmlFor='number'>Char</label>
           
        </div>
      </div>
     </div>
    </>
  )
}

export default App
