import { useState, useCallback } from 'react'


function App() {
  const [length, setLength] = useState(8)
  const [number,setNumber]=useState(false)
  const [char,setChar]=useState(false)
  const [password,setPassword]=useState(false)
  
  const passwordGenerator=useCallback(()=>{
    let pass=""
    let str="A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R,a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, and"
    if(number){
     str+="11234567890"
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
      />
      <button className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>
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
        
      </div>
     </div>
    </>
  )
}

export default App
