import { useState , useCallback, useEffect, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

function App() {
  const [length, setLength] = useState(8)
  const [useNumber, setuseNumber] = useState(false);
  const [useSpcharacter , setusSpcharacter] = useState(false);
  const [password , setPassword] = useState("")
  const passwordRef = useRef(null)

  const passwordGenrator = useCallback(()=>{
      
    let str= 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    if(useNumber) str += '1234567890'
    if(useSpcharacter) str += '!@#$%*'
    let pass = ''

    for(let i=0; i<length; i++){   
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass)
    
  }, [length, useNumber, useSpcharacter, setPassword])

  const copyToClipBorad = useCallback(()=>{
    passwordRef.current?.select()
    navigator.clipboard.writeText(password)
  }, [password])


  useEffect( ()=>{passwordGenrator()},[length,useNumber, useSpcharacter, passwordGenrator])

  return (
    <>
        <div className="w-full max-w-xl mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-700 text-orange-500">
            <div className='justify-center text-teal-50 text-xl text-center ml-4 mt-4'>Password Genrator</div>      
            <div className="flex rounded-lg overflow-hidden mb-4 mx-3">
             <input
                type="text"
                value={password}
                className="outline-none w-3/4 py-2 px-3 mt-4 rounded-l-md"
                placeholder="Password"
                readOnly
                ref={passwordRef}
              />
              <button
                  onClick= {copyToClipBorad}
                  type="button"
                  className=" rounded-l-none rounded-r-lg bg-blue-400 px-8 py-0 text-sm font-semibold text-white shadow-sm hover:bg-blue-400/80  mt-4"
                >
                 copy  
              </button>
            </div>
            <div className='flex  rounded-lg overflow-hidden mb-4'>

                <div className=' flex items-center gap-x-2 mx-3'>
                  <input 
                  type="range"
                  min ={6}
                  max ={100}
                  value={length} 
                  className='cursor-pointer'
                  onChange={(e)=>{setLength(e.target.value)}}
                  />
                  <label className='text-orange-500'>Length: {length}</label>
                </div>
                <div className='flex  gap-x-2 mx-3'>
                  <input 
                    type="checkbox"
                    defaultChecked = {useNumber}
                    id='characterInput'
                    onChange={()=>{
                      setuseNumber((prev)=> !prev)
                    }}
                  />
                  <label className='text-orange-500 gap-x-2'>Number</label>
                </div>
                <div className='flex gap-x-2 mx-3'>
                  <input 
                    type="checkbox"
                    defaultChecked = {useSpcharacter}
                    id='characterInput'
                    onChange={()=>{
                      setusSpcharacter((prev)=> !prev)
                    }}
                  />
                  <label className='text-orange-500 gap-x-2'>Character</label>
                </div>
            </div>
            <div className='flex justify-center'>
                <button 
                  onClick={passwordGenrator} 
                  className='bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 my-3'>
                  Generate Password
                </button>
                </div>
        </div>    
    </>
  )
}

export default App
