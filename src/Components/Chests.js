import { useState, useEffect } from 'react'

function Chests() {
  const [chests, setChests] = useState([])
  const [name, setName] = useState([])
  const [weight, setWeight] = useState('Light')
  const [rating, setRating] = useState([])
  const url = 'https://inventory-server-ram.herokuapp.com/chests'

  useEffect(() =>
    getChests(), []
  )

  async function getChests() {
    await fetch(url)
      .then(res => res.json())
      .then(res => setChests(res))
  }

  function setArmor(e) {
    localStorage.setItem('chestId', e.target.id)
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
      {chests.map(chest =>
        <div className='row'>
          <div className='item'>{chest.name}</div>
          <div className='item'>{chest.weight}</div>
          <div className='item'>{chest.armor}</div>
          <div className='item'><button id={chest.id} onClick={setArmor}>Add to Character</button></div>
          <div className='item'><button id={chest.id} onClick={deleteArmor}>Delete</button></div>
        </div>
      )}
      <form onSubmit={addNewArmor} className='form'>
        <label for='addChest'>Armor Name: </label>
        <input type='text' name='addChest' onChange={changeName} /><br />
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

export default Chests;