import { useState, useEffect } from 'react'

function Arms(){
  const [arms, setArms] = useState([])
  const [name, setName] = useState([])
  const [weight, setWeight] = useState('Light')
  const [rating, setRating] = useState([])
  let url = 'https://inventory-server-ram.herokuapp.com/arms'

  useEffect(() =>
    getArms(), []
  )

  async function getArms(){
    await fetch(url)
    .then(res => res.json())
    .then(res => setArms(res))
  }

  function setArmor(e){
    localStorage.setItem('armId', e.target.id)
  }

  async function deleteArmor(e) {
    await fetch(url, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: e.target.id })
    })
    window.location.reload()
  }

  function changeName(e) {
    setName(e.target.value)
  }

  function changeWeight(e) {
    setWeight(e.target.value)
  }

  function changeRating(e) {
    setRating(e.target.value)
  }

  async function addNewArmor(e) {
    e.preventDefault()
    if (name === '' || weight === '' || rating === '') {
      alert('Input name, weight, and rating')
    } else {
      await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name, weight: weight, rating: rating })
      })
      window.location.reload()
    }
  }

  return (
    <div>
    <div className='row' style={{marginBottom: '30px'}}>
      <div className='item'>ArmorName</div>
      <div className='item'>Armor Weight</div>
      <div className='item'>Armor Rating</div>
      <div className='item'>Add to Character</div>
      <div className='item'>Delete Armor</div>
    </div>
      {arms.map(arm =>
        <div className='row'>
          <div className='item'>{arm.name}</div>
          <div className='item'>{arm.weight}</div>
          <div className='item'>{arm.armor}</div>
          <div className='item'><button id={arm.id} onClick={setArmor}>Add to Character</button></div>
          <div className='item'><button id={arm.id} onClick={deleteArmor}>Delete</button></div>
        </div>
      )}
      <form onSubmit={addNewArmor} className='form'>
        <label for='addArm'>Armor Name: </label>
        <input type='text' name='addArm' onChange={changeName} /><br />
        <label for='weight'>Armor Weight: </label>
        <select name='weight' onChange={changeWeight}>
          <option value="Light">Light</option>
          <option value="Medium">Medium</option>
          <option value="Heavy">Heavy</option>
        </select><br />
        <label for='armorRating'>Armor Rating: </label>
        <input type='text' name='armorRating' onChange={changeRating} /><br/>
        <button type='submit'>Add New Armor</button>
      </form>
    </div>
  )
}

export default Arms;