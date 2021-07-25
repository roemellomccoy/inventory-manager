import { useEffect, useState } from 'react'

function Legs(){
  const [legs, setLegs] = useState([])
  const [name, setName] = useState([])
  const [weight, setWeight] = useState('Light')
  const [rating, setRating] = useState([])
  let url = 'https://inventory-server-ram.herokuapp.com/legs'

  useEffect(() =>
    getLegs(), []
  )

  async function getLegs(){
    await fetch(url)
    .then(res => res.json())
    .then(res => setLegs(res))
  }

  function setArmor(e){
    localStorage.setItem('legId', e.target.id)
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
      {legs.map(leg =>
        <div className='row'>
          <div className='item'>{leg.name}</div>
          <div className='item'>{leg.weight}</div>
          <div className='item'>{leg.armor}</div>
          <div className='item'><button id={leg.id} onClick={setArmor}>Add to character</button></div>
          <div className='item'><button id={leg.id} onClick={deleteArmor}>Delete</button></div>
        </div>
      )}
      <form onSubmit={addNewArmor} className='form'>
        <label for='addLeg'>Armor Name: </label>
        <input type='text' name='addLeg' onChange={changeName} /><br />
        <label for='weight'>Armor Weight: </label>
        <select name='weight' onChange={changeWeight}>
          <option value="Light">Light</option>
          <option value="Medium">Medium</option>
          <option value="Heavy">Heavy</option>
        </select>
        <br />
        <label for='armorRating'>Armor Rating: </label>
        <input type='text' name='armorRating' onChange={changeRating} /><br/>
        <button type='submit'>Add New Armor</button>
      </form>
    </div>
  )
}

export default Legs;