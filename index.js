let taskArray
let index
let {numb,array} = localStorageGETALL()
if(numb)
{
    index = numb
}
else
{
    index = 0
}
if(array && array.length > 0)
{
    taskArray = array
    circleByArray(taskArray)
}
else
{
    taskArray = []
    index = 0
}

document.querySelector('.newTask').addEventListener('click', openModalTaskWindow)
document.querySelector('.sort').addEventListener('click', sortTasks(taskArray))

function sortTasks(array)
{
    let newArray = []
    let sorted = true
    return ()=>
    {
        for(let i = 0;i<array.length;i++)
        {
            newArray.push(array[i])
        }
        let reversed = newArray.reverse()
        if(sorted)
        {
        circleByArray(reversed,true)
        newArray = []
        sorted = false
        }
        else{
        circleByArray(array,false)
        newArray = []
        sorted = true
        }
        
    }
    
}
function circleByArray(array, forLocalIn = false )
{
    
    if(document.querySelector('.tableBody'))
    {
        console.log(document.querySelector('.tableBody'))
        document.querySelector('.tableBody').remove()
    }

    for(let i = 0; i < array.length; i++)
    {
        let specialItem = array[i]
        let checkedColorAccent = specialItem.checked

        let task = specialItem.task
        let message = specialItem.message
        
        let span = document.createElement('span')
        span.className = 'oval'
        span.innerHTML = `<span class="oval1"></span>`
        span.dataset.changeColorId = specialItem.id

        let input = document.createElement('input')
        input.setAttribute('type','checkbox')
        input.className = 'check'
        input.addEventListener('change',()=>{ 
         
            if(!event.target.checked)
            {
            // span.querySelector('.oval1').style.display = 'block'
            // tr.style.backgroundColor = 'rgb(0, 192, 83)'
            // checkedColor(array,span.dataset.changeColorId,true)
            // localStorageFunc(index, array) 
            // console.log(event.target.checked)
            span.querySelector('.oval1').style.display = 'none'
            tr.style.backgroundColor = 'white'
            checkedColor(array,span.dataset.changeColorId,false)
            if(forLocalIn)
            {
            localStorageFunc(index, array.reverse())
            }
            else{
            localStorageFunc(index, array) 
            }
            }
            else
            {
                span.querySelector('.oval1').style.display = 'block'
                tr.style.backgroundColor = 'rgb(0, 192, 83)'
                checkedColor(array,span.dataset.changeColorId,true)
                if(forLocalIn)
            {
            localStorageFunc(index, array.reverse())
            }
            else{
            localStorageFunc(index, array) 
            }
            // span.querySelector('.oval1').style.display = 'none'
            // tr.style.backgroundColor = 'white'
            // checkedColor(array,span.dataset.changeColorId,false)
            // localStorageFunc(index, array) 
            }
        })
        let btnDelete = document.createElement('button')
        btnDelete.textContent = '✖️ Delete'
        btnDelete.className = 'settings'
        btnDelete.addEventListener('click',()=>
        {
      
            for(let i = 0 ; i < array.length;i++)
            {
                console.log(+array[i].id)
                console.log(+tr.dataset.id)
               if(+array[i].id === +tr.dataset.id)
               {
                array.splice(i, 1)
                for(let j =0 ; j < taskArray.length; j++)
                {
                    if( +taskArray[j].id === +tr.dataset.id)
                    {
                    taskArray.splice(j,1)
                    }
                }
               } 
            }
            tr.remove()
            localStorageFunc(index, taskArray)
            checkArrayLength()
        })
    
        let btnInfo = document.createElement('button')
        btnInfo.textContent = '🛡️ Info'
        btnInfo.className = 'settings'
        btnInfo.addEventListener('click',openInfoWindow(task,message))
    
        let btnChange = document.createElement('button')
        btnChange.textContent = '🔧 Edit'
        btnChange.className = 'settings'
        btnChange.addEventListener('click', openModalChangeWindow(specialItem.id,task,message))
    
        let tr = document.createElement('tr')
       
        tr.dataset.id = specialItem.id
    
        tr.innerHTML = `
                  <td>
                    <p class='taskInformation'>${task}</p>
                  </td>
                  <td class='messageInformation'>${message}</td>
                  <td class='btnTD'>
                  </td>
        `
        tr.querySelector('.btnTD').append(btnInfo)
        tr.querySelector('.btnTD').append(btnChange)
        tr.querySelector('.btnTD').append(btnDelete)
        tr.querySelector('td').prepend(span)
        tr.querySelector('td').prepend(input)


        if(!document.querySelector('.table'))
        {
            renderTable()
        }
        if(document.querySelector('.tableBody'))
        {
            document.querySelector('.tableBody').append(tr)
        }else{
            let elem = document.createElement('tbody')
            elem.className = 'tableBody'
            document.querySelector('.table').append(elem)
            document.querySelector('.tableBody').append(tr)
        }
        if(checkedColorAccent)
        {
            // console.log(document.querySelectorAll('.check'))
            // document.querySelector('.check')
            input.checked = true
            span.querySelector('.oval1').style.display = 'block'
            tr.style.backgroundColor = 'rgb(0, 192, 83)'
        }else
        {
            // document.querySelector('.check').checked = false
            span.querySelector('.oval1').style.display = 'none'
            tr.style.backgroundColor = 'white'
        }
        // else
        // {
        //     document.querySelector('.check').checked = false
        //     span.querySelector('.oval1').style.display = 'none'
        //     tr.style.backgroundColor = 'white'
        // }
    }
   
    console.log(array)
      
}
function addTask()
{
    let task = document.querySelector('#task').value
    let message = document.querySelector('#comment').value
    document.querySelector('.modal').remove()
    if(task.length === 0)
    {
        return
    }
    
    let span = document.createElement('span')
    span.className = 'oval'
    span.innerHTML = `<span class="oval1"></span>`
    span.dataset.changeColorId = index

    let input = document.createElement('input')
    input.setAttribute('type','checkbox')
    input.className = 'check'
    input.addEventListener('change',()=>{ 
        if(event.target.checked)
        {
        span.querySelector('.oval1').style.display = 'block'
        tr.style.backgroundColor = 'rgb(0, 192, 83)'
        checkedColor(taskArray,span.dataset.changeColorId,true)
        localStorageFunc(index, taskArray) 
        }
        else
        {
        span.querySelector('.oval1').style.display = 'none'
        tr.style.backgroundColor = 'white'
        checkedColor(taskArray,span.dataset.changeColorId,false)
        localStorageFunc(index, taskArray) 
        }
    })
    let btnDelete = document.createElement('button')
    btnDelete.textContent = '✖️ Delete'
    btnDelete.className = 'settings'
    btnDelete.addEventListener('click',()=>
    {
        for(let i = 0 ; i < taskArray.length;i++)
            {
               if(+taskArray[i].id === +tr.dataset.id)
               {
                taskArray.splice(i, 1)
               } 
            }
            tr.remove()
            localStorageFunc(index, taskArray)
            checkArrayLength()
    })

    let btnInfo = document.createElement('button')
    btnInfo.textContent = '🛡️ Info'
    btnInfo.className = 'settings'
    btnInfo.addEventListener('click',openInfoWindow(task,message))

    let btnChange = document.createElement('button')
    btnChange.textContent = '🔧 Edit'
    btnChange.className = 'settings'
    btnChange.addEventListener('click',openModalChangeWindow(index,task,message))

    let tr = document.createElement('tr')
   
    tr.dataset.id = index

    tr.innerHTML = `
              <td>
                <p class='taskInformation'>${task}</p>
              </td>
              <td class='messageInformation'>${message}</td>
              <td class='btnTD'>
              </td>
    `
    tr.querySelector('.btnTD').append(btnInfo)
    tr.querySelector('.btnTD').append(btnChange)
    tr.querySelector('.btnTD').append(btnDelete)
    tr.querySelector('td').prepend(span)
    tr.querySelector('td').prepend(input)
    if(!document.querySelector('.table'))
        {
            renderTable()
        }
    if(document.querySelector('.tableBody'))
        {
            document.querySelector('.tableBody').append(tr)
        }else{
            let elem = document.createElement('tbody')
            elem.className = 'tableBody'
            document.querySelector('.table').append(elem)
            document.querySelector('.tableBody').append(tr)
        }
    taskArray.push({id:tr.dataset.id,task,message})
    index++
    localStorageFunc(index, taskArray)   
}
function checkedColor(array,index,constantValue)
    {
        if(constantValue)
        {
        if(array.length > 0)
        {
        for(let i = 0; i <array.length;i++)
        {   
            console.log(+array[i].id)
            console.log(index)
            if(+array[i].id === +index)
            {
                array[i].checked = true
            }
        }
        }
        }else
        {console.log('test')
            if(array.length > 0)
            {
            for(let i = 0; i <array.length;i++)
            {
                if(+array[i].id === +index)
                {
                    array[i].checked = false
                }
            }
            }
        }
}
function localStorageGETALL()
{
    let arr = JSON.parse(localStorage.getItem('tasks'))
    let index =localStorage.getItem('index')
    return {numb:index,array:arr}
}
function localStorageFunc(index,array)
{
    localStorage.setItem('tasks',JSON.stringify(array))
    localStorage.setItem('index',`${index}`)
}
function openInfoWindow(task,message)
{
    return()=>
    {
        let span = document.createElement('span')
    span.className = 'close-window'
    span.textContent = 'X'
    span.addEventListener('click', ()=>
    {
        document.querySelector('.modal').remove()
    })

    let div = document.createElement('div')
    div.className = 'modal'
    div.addEventListener('click',()=>
    {
        if(event.target.className === 'modal')
        {
        document.querySelector('.modal').remove()
        }
    })

    div.innerHTML = `
    <div class="modal-window">
    <h2 class="modal-title">Task: ${task}</h2>
    <p>Comment: ${message}</p>
  </div>
    `
    div.querySelector('.modal-title').append(span)
    document.querySelector('body').append(div)
    }
}
function openModalTaskWindow()
{
    let span = document.createElement('span')
    span.className = 'close-window'
    span.textContent = 'X'
    span.addEventListener('click', ()=>
    {
        document.querySelector('.modal').remove()
    })

    let textarea1 = document.createElement('textarea')
    textarea1.setAttribute('id','task')
    textarea1.setAttribute('cols','30')
    textarea1.setAttribute('rows','10')
   
    let textarea2 = document.createElement('textarea')
    textarea2.setAttribute('id','comment')
    textarea2.setAttribute('cols','30')
    textarea2.setAttribute('rows','10')

    let btn = document.createElement('button')
    btn.className = 'newTask-modal'
    btn.textContent = 'Add'
    btn.addEventListener('click', addTask)


    let div = document.createElement('div')
    div.className = 'modal'
    div.addEventListener('click',()=>
    {
        if(event.target.className === 'modal')
        {
        document.querySelector('.modal').remove()
        }
    })

    div.innerHTML = `
    <div class="modal-window">
    <h2 class="modal-title">Ad New Task</h2>
    
    <label for="task" class="label">Write task</label>
    
    <label for="comment" class="label">Add comment</label>
    
  </div>
    `
    div.querySelector('.label').append(textarea1)
    div.querySelector('.modal-window').append(textarea2)
    div.querySelector('.modal-window').append(btn)
    div.querySelector('.modal-title').append(span)
    document.querySelector('body').append(div)
}
function openModalChangeWindow(index, task, message)
{
   return ()=>
   {console.log(index)
    let task
    let message

    let span = document.createElement('span')
    span.className = 'close-window'
    span.textContent = 'X'
    span.addEventListener('click', ()=>
    {
        document.querySelector('.modal').remove()
    })

    for(let i = 0 ; i < taskArray.length;i++)
                {
                   if(+taskArray[i].id === +index)
                   {
                    task = taskArray[i].task 
                    message = taskArray[i].message 
                   } 
                }


    let textarea1 = document.createElement('textarea')
    textarea1.setAttribute('id','task')
    textarea1.setAttribute('cols','30')
    textarea1.setAttribute('rows','10')
    textarea1.value = task
   
    let textarea2 = document.createElement('textarea')
    textarea2.setAttribute('id','comment')
    textarea2.setAttribute('cols','30')
    textarea2.setAttribute('rows','10')
    textarea2.value = message

    let btn = document.createElement('button')
    btn.className = 'newTask-modal'
    btn.textContent = 'Change'
    btn.addEventListener('click', changeTR(index))


    let div = document.createElement('div')
    div.className = 'modal'
    div.addEventListener('click',()=>
    {
        if(event.target.className === 'modal')
        {
        document.querySelector('.modal').remove()
        }
    })

    div.innerHTML = `
    <div class="modal-window">
    <h2 class="modal-title">Task</h2>
    
    <label for="task" class="label">Change task</label>
    
    <label for="comment" class="label">Change comment</label>
    
  </div>
    `
    div.querySelector('.label').append(textarea1)
    div.querySelector('.modal-window').append(textarea2)
    div.querySelector('.modal-window').append(btn)
    div.querySelector('.modal-title').append(span)
    document.querySelector('body').append(div)
   }
}
function changeTR(index)
{
    return()=>
    {console.log(index)
        let task = document.querySelector('#task').value
        let message = document.querySelector('#comment').value

        let arr = document.querySelectorAll('tr')
 
        for(let i = 1 ; i < arr.length;i++)
        {
            let item = arr[i]
     
            if(+item.dataset.id === +index)
            {
                item.querySelector('.taskInformation').innerHTML = task
                item.querySelector('.messageInformation').innerHTML = message
                for(let i = 0 ; i < taskArray.length;i++)
                {
                   if(+taskArray[i].id === + item.dataset.id)
                   {
                    taskArray[i].task = task
                    taskArray[i].message = message
                   } 
                }
                console.log(taskArray)
                localStorageFunc(index, taskArray)
                
            }
        }
        document.querySelector('.modal').remove()
    }
}
function renderTable()
{
    document.querySelector('.textBeforeTable').remove()
    let table = document.createElement('table')
    table.className = 'table'
    table.innerHTML = `
    <th>Task</th>
    <th>Comment</th>
    <th>Settings</th>
    <tbody class="tableBody">
    </tbody>
    `
    document.querySelector('.content').append(table)
}
function checkArrayLength()
{
    if(taskArray.length === 0)
    {
    document.querySelector('.table').remove()
    let div = document.createElement('div')
    div.className = 'textBeforeTable'
    div.innerHTML = `
    <div class="blockedText">
            <svg class='img' viewBox="0 0 24 24" fill="darkgreen" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M6.46967 10.0303C6.17678 9.73744 6.17678 9.26256 6.46967 8.96967L11.4697 3.96967C11.7626 3.67678 12.2374 3.67678 12.5303 3.96967L17.5303 8.96967C17.8232 9.26256 17.8232 9.73744 17.5303 10.0303C17.2374 10.3232 16.7626 10.3232 16.4697 10.0303L12 5.56066L7.53033 10.0303C7.23744 10.3232 6.76256 10.3232 6.46967 10.0303Z" fill="darkgreen"></path> <g opacity="0.5"> <path d="M11.25 14.5C11.25 15.4534 11.5298 16.8667 12.3913 18.0632C13.2804 19.298 14.7556 20.25 17 20.25C17.4142 20.25 17.75 19.9142 17.75 19.5C17.75 19.0858 17.4142 18.75 17 18.75C15.2444 18.75 14.2196 18.0353 13.6087 17.1868C12.9702 16.3 12.75 15.2133 12.75 14.5L12.75 6.31066L12 5.56066L11.25 6.31066V14.5Z" fill="darkgreen"></path> <path d="M11.8023 3.77639C11.9568 3.73435 12.122 3.74254 12.2722 3.80095C12.1879 3.76805 12.096 3.75 12 3.75C11.9316 3.75 11.8653 3.75919 11.8023 3.77639Z" fill="darkgreen"></path> </g> </g></svg>
            <p>Add new Task</p>
          </div>
    `
    document.querySelector('.content').append(div)
    }

   
}