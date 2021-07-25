import { useEffect, useState } from 'react'

function Home() {
  const [helmets, setHelmets] = useState([])
  const [chests, setChests] = useState([])
  const [arms, setArms] = useState([])
  const [legs, setLegs] = useState([])
  const [name, setName] = useState([])
  let totalArmor = 0;
  let totalWeight = 0;
  let weight = 'Light'

  useEffect(() => {
    getHelmets()
    getChests()
    getArms()
    getLegs()
    getName()
  }, [])

  async function getName() {
    await fetch('https://inventory-server-ram.herokuapp.com/')
    .then(res => res.json())
    .then(res => setName(res.name))
  }

  async function getHelmets() {
    let url = 'https://inventory-server-ram.herokuapp.com/helmets'
    await fetch(url)
      .then(res => res.json())
      .then(res => setHelmets(res))
  }

  async function getChests() {
    let url = 'https://inventory-server-ram.herokuapp.com/chests'
    await fetch(url)
      .then(res => res.json())
      .then(res => setChests(res))
  }

  async function getArms() {
    let url = 'https://inventory-server-ram.herokuapp.com/arms'
    await fetch(url)
      .then(res => res.json())
      .then(res => setArms(res))
  }

  async function getLegs() {
    let url = 'https://inventory-server-ram.herokuapp.com/legs'
    await fetch(url)
      .then(res => res.json())
      .then(res => setLegs(res))
  }

  function addArmor(value){
    totalArmor += value;
  }

  function determineWeight(weight){
    if(weight === 'Light'){
      totalWeight += 1;
    }else if(weight === 'Medium'){
      totalWeight += 2;
    } else {
      totalWeight += 3;
    }
    setWeight();
  }

  function setWeight(){
    if(totalWeight <= 4){
      weight = 'Light'
    } else if(totalWeight > 4 && totalWeight <= 9){
      weight = 'Medium'
    } else {
      weight = 'Heavy'
    }
  }

  function changeName(e){
    setName(e.target.value);
  }

  function submitName(e){
    e.preventDefault()
    console.log(name)
    fetch('https://inventory-server-ram.herokuapp.com/', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ newName: name })
    })
  }



  return (
    <div>
      <h1>Your Character</h1>
      <form onSubmit={submitName} style={{position: "relative", left: "20px"}}>
        Hello, <input type='text' name='name' value={name} onChange={changeName} style={{width:"100px"}}/>
        <button type='submit' className='item'>Change Name</button>
      </form>
      <div className='display'>
      {helmets.map(helmet => {
        if(helmet.id == localStorage.getItem('helmetId')){
          addArmor(helmet.armor)
          determineWeight(helmet.weight)
          return(
            <div className='row'>
              <div className='item'>Helmet:</div>
              <div className='item'>{helmet.name}</div>
            </div>
          )
        }
      })}
      {chests.map(chest => {
        if(chest.id == localStorage.getItem('chestId')){
          addArmor(chest.armor)
          determineWeight(chest.weight)
          return(
            <div className='row'>
              <div className='item'>Chest: </div>
              <div className='item'>{chest.name}</div>
            </div>
          )
        }
      })}
      {arms.map(arm => {
        if(arm.id == localStorage.getItem('armId')){
          addArmor(arm.armor)
          determineWeight(arm.weight)
          return(
            <div className='row'>
              <div className='item'>Arms: </div>
              <div className='item'>{arm.name}</div>
            </div>
          )
        }
      })}
      {legs.map(leg => {
        if(leg.id == localStorage.getItem('legId')){
          addArmor(leg.armor)
          determineWeight(leg.weight)
          return(
            <div className='row'>
              <div className='item'>Legs: </div>
              <div className='item'>{leg.name}</div>
            </div>
          )
        }
      })}
      </div>
      <div style={{margin: "20px"}}>Total Armor: {totalArmor}</div>
      <div>Weight Class: {weight}</div>
    </div >
  )
}

export default Home;