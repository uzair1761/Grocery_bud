import React, { useState, useEffect } from 'react'
import List from './List'
import Alert from './Alert'



const GetlocalStorage =() =>{
  let list =localStorage.getItem('list');
  if(list){
    return JSON.parse(localStorage.getItem('list'))
  }
  else {
    return []
  }
}


function App() {
  const [name,setname] =useState('');
  const [list,setlist] =useState(GetlocalStorage());
  const [isediting ,setisediting] =useState(false)
  const [editid,seteditid] =useState(null)
  const [alert ,setalert] =useState({show : '' ,msg :' ', type :''})


  const  handleSubmit=(e)=>{
    e.preventDefault()
   if(!name){
    //display alert
    showAlert(true ,'please enter something','danger')
   }
   else if( name && isediting) {
    setlist(list.map((item)=>{
      if( item.id === editid){
        return {...item ,title:name}
      }
      return item
    }))
    setname('')
    seteditid(null)
    setisediting(null)
    showAlert(true,'success','value')
 
   }
   else {
    showAlert(true ,'item added to the List' ,'success')
    const newItem ={id :new Date ().getTime().toString() ,
    title :name }
    setlist([...list , newItem ])
    setname('')
   }
  
  }
  const showAlert =(show =false ,msg ='' ,type ='')=>{
  setalert({show,type ,msg})
  }

  const Clearlist =()=>{
    showAlert(true ,'item removed from the list','danger')
    setlist([])
  }

  const removeIndi =(id)=>{
    setlist(list.filter(item=> item.id !== id))

  }
  const editItem= (id)=>{
    const specificItem = list.find((item)=> item.id === id)
    setisediting(true)
    seteditid(id)
    setname(specificItem.title)

  }

  useEffect(()=>{
    localStorage.setItem('list', JSON.stringify(list))
  },[list])
  return <section className='section-center'>
<form className='grocery-form' onSubmit={handleSubmit}>
  {alert.show && <Alert {...alert} removeAlert ={showAlert} list={list}/>}
  <h3> grocerry bud
    </h3> 
     <div className='form-control'>
   <input type='text' className='grocery' placeholder='egg' value={name} onChange={(e)=>setname(e.target.value)}></input>
   <button  className='submit-btn' type='submit'>
    {isediting ?'edit ' :'submit' }
  
   </button>
<h3></h3>
  </div>

</form>
{list.length > 0  && <div className='grocery-center'>
<List  items={list} removeIndi={removeIndi} editItem={editItem} />
<button className='clear-btn' onClick={Clearlist}>clear item</button>

    </div> }
  

  </section>
}

export default App
