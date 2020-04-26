import React from 'react'

import { Confirm, Modal } from 'react-async-popup'
import 'react-async-popup/dist/index.css'

let showAlert
let showModal
Confirm.new().then(({ show }) => {
  showAlert = show
})

function alertbody({ cancel, success }) {
  return (
    <div>
      <h1> Are you a good boy </h1>
    </div>
  )
}

function alertFooter({ cancel, success }) {
  return (
    <div>
      <button onClick={success}> yes</button>
      <button onClick={cancel}> no </button>
    </div>
  )
}

Modal.new().then(({ show }) => {
  showModal = show
})

export default function App() {
  const toggleAlert = async () => {
    const isSuccess = await showAlert({
      heading : 'Confirm',
      body: () => 'Are you sure you want to delete your account ?'
    })
    console.log(' alert is done ', isSuccess)
  }

  const toggleAlert2 = async () => {
    const isSuccess = await showAlert({ body: alertbody, footer: alertFooter })
    const secondResult = await showAlert({ body: () => <h1> why ? </h1> })
    console.log(' use said ', isSuccess, secondResult)
  }

  const openModal = async () => {
    const name = await showModal({
      heading: 'Hi this is modal',
      body: <ModalBody />,
      footer: null
    })
    console.log(' use entered name is ', name)
  }

  return (
    <div className='App'>
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <button onClick={toggleAlert}> Delete account Confirm </button>
      <button onClick={toggleAlert2}> SHOW Confirm 2 </button>
      <hr />
      <button onClick={openModal}> show modal </button>
    </div>
  )
}

const ModalBody = ({ success, cancel }) => {
  const onSubmit = (e) => {
    e.preventDefault()
    const { value: name } = e.target.elements['name-input']
    success(name)
  }
  return (
    <div>
      <form onSubmit={onSubmit}>
        <h6> Enter your name </h6>
        <input name='name-input' type='text' />
        <br />
        <button type='submit'> Confirm </button>
        <button type='button' onClick={cancel}>
          {' '}
          Close{' '}
        </button>
      </form>
    </div>
  )
}