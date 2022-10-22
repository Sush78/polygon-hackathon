import React from 'react'

export const Home = () => {
  const accountAddress = "0x11000001010011"
  const nickName = "Airline verification"
  return (
    <div>
        <h1>LOGO placeholder</h1>
        <div className='user-info'>
            <p>Account Address: {accountAddress}</p>
            <p>Nick Name: {nickName}</p>
        </div>
        <div className='request'>
            <h2>Access Request</h2>
            <div className='inputs'>
            <input
                placeholder="Requester ID"
                type="text"
                name="requester"
                value={value}
                onChange={(e) => handleChange(e, name)}
                className="input-text"
            />
            </div>
        </div>
    </div>
  )
}
