var courseAPI='http://localhost:3000/course';
var listCourse=document.querySelector('#list-course');

function start(){
    getAPI(function(course){
        renderCourse(course)
    });
    handleCreateCourse();
}
start()
function getAPI(results){
    fetch(courseAPI)
    .then(function(response){
        return response.json();
    })
    .then(results)
}
function renderCourse(course){
    var html = course.map(function(course){
        return`
        <li>
            <h3>${course.name}</h3>
            <p>${course.description}</p>
            <button onclick="deleteCourse(${course.id})">xoa</button>
            <button onclick="fixCourse() onclick">sua</button>
        </li>
        `
    })
    listCourse.innerHTML=html.join('')
}
function handleCreateCourse() {
    var createBtn = document.querySelector('.btn')
    createBtn.onclick = function() {
        var name= document.querySelector('input[name="name"]').value;
        var description= document.querySelector('input[name="description"]').value        
        var formData = {
            name: name,
            description: description
        }
        createCourse(formData,function(){
            start()
        })
    }  
}
function createCourse(data,callback) {
    var option = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
        body: JSON.stringify(data)
    }
    fetch(courseAPI,option)
    .then(response => {response.json()})
    .then(callback)
}
function deleteCourse(id) {
    var option = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
    }
    fetch(courseAPI+'/'+id,option)
    .then(response => {response.json()})
    .then(function(response){
        start()
    })
}
var a=document.querySelector