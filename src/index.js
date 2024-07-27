document.addEventListener('DOMContentLoaded', () => {
function fetchDogs(){ 
fetch('http://localhost:3000/dogs')
.then(res=>res.json())
.then(data=>{
    console.log(data);
    data.forEach(dog=>{ 
        const table=document.getElementById('table-body')
        const row=document.createElement('tr')
    row.innerHTML +=`
  <td>Dog ${dog.name}</td>
  <td>${dog.breed}</td>
  <td>${dog.sex}</td>
  <td><button onclick="editDog(${dog.id})">Edit</button></td>`;
table.append(row)


})

}).catch(error=>console.error('error fetching dog',error))
}
fetchDogs()

window.editDog=function(id){
    fetch(`http://localhost:3000/dogs/${id}`)
    .then(res=>res.json())
    .then(dog=>{
        console.log(dog)
        document.getElementById('dog-id').value=dog.id
        document.getElementById('dog-name').value=dog.name
        document.getElementById('dog-breed').value=dog.breed
        document.getElementById('dog-sex').value=dog.sex


    }).catch(error=>console.error('error fetching dog',error))
}

const form=document.getElementById('dog-form')
form.addEventListener('submit',(e)=>{
    e.preventDefault()
    const id=document.getElementById('dog-id').value
    const updatedDog={
        name:document.getElementById('dog-name').value,
        breed: document.getElementById('dog-breed').value,
        sex:document.getElementById('dog-sex').value
    }

    fetch(`http://localhost:3000/dogs/${id}`,{
        method:'PATCH',
        headers:{
            'Content-Type':'application/json',
            'Accept':'application/json'
        },
        body:JSON.stringify(updatedDog)
    }).then(res=>res.json())
    .then(()=>{
        fetchDogs()
        form.reset()
    }).catch(error=>console.error('error updating dog',error))
})

})