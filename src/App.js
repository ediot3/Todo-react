import './App.css';
import { useEffect, useState } from 'react';

const localItems=()=>{
  let data =localStorage.getItem('list') 
  console.log(data);
  return data? JSON.parse(data):[];
}

function App() {

  const [input, setInput] = useState('')
  const [task, setTask] = useState(localItems())

  //local storage
  
  useEffect(()=>{
    localStorage.setItem('list',JSON.stringify(task));
  },[task]);
  

  const events = (e) => {
    setInput(e.target.value)
  }

  //add todo

  const onAddClick = () => {
    // console.log(task);
    setTask([...task, { text: input, id: Date.now(), status: false }])
    setInput('')
  }

  //delete todo

  const onDeleteTask = (id) => {
    setTask([...task].filter((item) =>
      item.id !== id
    ))


  }

  //set task status

  const onTaskDone = (items) => {
    // console.log(items);
    return (e) => setTask(task.map((item) => {
      if (items.id === item.id) {
        items.status = e.target.checked;

      }
      return item;
    }))

   

  }
  

  //------------------------------------------------\\

  return (
    <>
      <div class="login-box">
        <h2>Todo</h2>

        <form>
          <div class="user-box">
            <input type="text" placeholder='enter the task' onChange={events} value={input} />

          </div>
          <div class="user-box">
            {task && task.length ? '' : 'no task'}


          </div>

          <a href="j" onClick={onAddClick}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>

            add
          </a>
          {/* display todo */}


          {task.map((item) => {
            return (
                <div>
                 
                <input className="check-box" type='checkbox' onChange={onTaskDone(item)} checked={item.status}></input>
                
                {/* <i class="fa-solid fa-check" ></i> */}
    
                <span className={item.status ? 'task-done' : ''} >{item.text} </span>
                <i class="fa-solid fa-trash" onClick={() => onDeleteTask(item.id)}></i>

                </div>
            )

          })


          }
          
        </form>
      </div>



    </>
  );
}

export default App;
