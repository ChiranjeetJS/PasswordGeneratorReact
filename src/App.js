import logo from './logo.svg';
import './App.css';
import { useState,useCallback, useEffect, useRef } from 'react';

function App() {
  const [length,setLength] = useState(8)
  const [isNumberAllowed,setNumberAllowed] = useState(false)
  const [CharAllowed,setCharAllowed] = useState(false)
  const[password,setPassword]  = useState("")
  const passwordGenerator = useCallback(() =>{
    let pass = "";
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    if(isNumberAllowed){
      str += "0123456789"
    }
    if(CharAllowed){
      str += "!@#$%^&**()_+"
    }
    for(let  i=0;i<length;i++){
      let pos = Math.floor(Math.random() * str.length);
      pass += str.charAt(pos)

    }
    console.log('password = ',pass);
    setPassword(pass)
  },[length,isNumberAllowed,CharAllowed,setPassword])
  useEffect(() => {passwordGenerator()},[isNumberAllowed,CharAllowed,length])
 const passwordRef = useRef(null);
 const copyPasswordtoClip = useCallback(() => {
   passwordRef.current?.select()
    console.log(passwordRef)
  window.navigator.clipboard.writeText(passwordRef.current.value)
 },setPassword)

  return (
    <>
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-700'>
    <h1 className='text-2xl text-center text-white my-3'>Password Generator</h1>

      <div className='className="flex shadow rounded-lg overflow-hidden mb-4"'>
        <input type='text' value={password} className='outline-none w-full py-1 px-3 my-4' readOnly placeholder='password' ref={passwordRef}/>
        <button className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0' onClick={copyPasswordtoClip}>Copy</button>
      </div>
      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input type='range' min={6} max={50} value={length} className='cursor-pointer'
          onChange={(event) => {setLength(event.target.value)}}
          />
          <label>length: {length}</label>

        </div>
        <div>
        <input type='checkbox' defaultChecked = {isNumberAllowed} id = "numberInput" onChange={() =>setNumberAllowed((prev) => !prev)}/>
        <label htmlFor='numberInput'>Numbers</label>

        <input type='checkbox' defaultChecked = {CharAllowed} id = "charInput" onChange={() =>setCharAllowed((prev) => !prev)}/>
        <label htmlFor='charInput'>Characters</label>

        </div>

      </div>
    </div>
    </>
  );
}

export default App;
