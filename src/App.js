import { useState } from 'react'
import './App.css'
import { Toaster, toast } from 'sonner'

function App() {
  const [password, setPassword] = useState('');
  const [passwordRequest, setPasswordRequest] = useState({
    length: 12,
    lowercase:true,
    uppercase:true,
    numbers:true,
    specialChars:true
  })

  const generatePassword = async () => {
    try{
      const response = await fetch('http://localhost:8080/api/password/generate', {
        method: 'POST',
        headers: {
          'Content-Type':'application/json',
        },
        body: JSON.stringify(passwordRequest),
      });

      if(response.ok){
        const generatePassword = await response.text();
        setPassword(generatePassword);
      }
      else{
        console.error('Failed to generate password');
      }
    }
    catch(error){
      console.error('Error fetching data: ', error);
    }
  }

  return (
    <div className="App  p-8 ">
      <div className="text-3xl font-bold mb-4">
        Password Generator
      </div>
      
      <div>
        <label>Password Length:</label>
        <input
          type="number"
          value={passwordRequest.length}
          className="rounded-lg border border-gray-300 p-1"
          onChange={(e) => setPasswordRequest({ ...passwordRequest, length: Math.max(1, parseInt(e.target.value)) })}
        />
      </div>
      <div className="flex my-4">
      <div className="mx-4">
        <label className='mr-3'>Include Uppercase:</label>
        <input
          type="checkbox"
          checked={passwordRequest.uppercase}
          onChange={() => setPasswordRequest({ ...passwordRequest, uppercase: !passwordRequest.uppercase })}
        />
      </div>
      <div className="mx-4">
        <label className='mr-3'>Include Lowercase:</label>
        <input
          type="checkbox"
          checked={passwordRequest.lowercase}
          onChange={() => setPasswordRequest({ ...passwordRequest, lowercase: !passwordRequest.lowercase })}
        />
      </div>
      <div className="mx-4">
        <label className='mr-3'>Include Numbers:</label>
        <input
          type="checkbox"
          checked={passwordRequest.numbers}
          onChange={() => setPasswordRequest({ ...passwordRequest, numbers: !passwordRequest.numbers })}
        />
      </div>
      <div className="mx-4">
        <label className='mr-3'>Include Special Characters:</label>
        <input
          type="checkbox"
          checked={passwordRequest.specialChars}
          onChange={() => setPasswordRequest({ ...passwordRequest, specialChars: !passwordRequest.specialChars })}
        />
      </div>
      </div>
      
      <button onClick={generatePassword}>Generate Password</button>
      <div className=' my-4 border rounded-lg'>
      {password && (
        <div className='my-4'>
          <h2>Generated Password:</h2>
          <div className='my-4'>
        <div>
          <span className='bg-indigo-500 p-2 rounded'>{password}</span>
        </div>
      </div>
          <Toaster richColors position="bottom-center" />
          <button onClick={() => navigator.clipboard.writeText(password) && toast.success('Password copied to clipboard!')}>Copy to Clipboard</button>
        </div>
      )}
    </div>
    </div>
  );
}

export default App
