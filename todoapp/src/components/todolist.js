import {React,useState,useEffect} from "react";
import ReactDOM from "react-dom";
import "../css/todolist.css"
import logo from "../static/logo.png"
import { useParams } from 'react-router-dom';
import axios from "axios"
import Design from "./design";
export default function ToDoList(){


    const [tasks,SetTasks] = useState([])
    const { user } = useParams();
    useEffect(() => {
        console.log("hello")
        
        axios.get("http://localhost:5000/getTasks?user="+user)
        .then(response => {
           if(response.data == 404){
             window.location.href="/"
           }
           else
          {
             SetTasks(response.data)
          }
          
        })
        .catch(error => {
          console.error('Error:', error);
        });
      }, []);

      function deleteTask(index){
        console.log(index)
        let task = document.getElementById(index)?document.getElementById(index).innerHTML:""
        document.getElementById(index).style.textDecoration="none";
        document.querySelectorAll(".checkbox-cross")[index].style.display = "none";
        if( document.querySelectorAll("#tick")[index].checked)document.querySelectorAll(".checkbox-dot")[index].style.display = "block";
        document.querySelectorAll("#tick")[index].style.display = "block";

        axios.post("http://localhost:5000/deleteTask?user="+user, {task:task})
        .then(response=>{
            
            SetTasks(response.data)
        }

        )
        .catch(error => {
            console.error('Error:', error);
          }

        )

        
      }
      function line(index){
        document.getElementById(index).style.textDecoration="line-through"
        document.querySelectorAll("#tick")[index].style.display = "none";
        document.querySelectorAll(".checkbox-cross")[index].style.display = "block";
        document.querySelectorAll(".checkbox-dot")[index].style.display = "none";
      }
      function addTask(){
        let task = document.getElementById("task").value
        axios.post("http://localhost:5000/addTask?user="+user, {task:task})
        .then(response=>{
          document.getElementById("task").value=""
            SetTasks(response.data)
        }

        )
        .catch(error => {
            console.error('Error:', error);
          }

        )

        
      }
      
     


   
    return(
        <div className="cont">
          <Design/>

             <div className="shadow todo-block">
                <img className="logo" src={logo}></img>
                <div className="m addTask">
                    <input id="task" className="taskbar" name="task" placeholder="Enter Task "></input>
                    <button onClick={addTask} className="add">Add</button>
                </div>
                
                     { tasks.length===0?
                       (<div className="m task-div">No Tasks Currently</div>)
                       :
                       tasks.map((item,index) => (
                        <div className="task-block">
                        <div className="buttons">
                          <input id="tick" type="radio" ></input>
                          <span  className="checkbox-dot"><i class="fa-solid fa-circle-check"></i></span>
                          <span className="checkbox-cross"><i class="fa-solid fa-xmark"></i></span>
                        </div>
                            <div id={index} className="h10">
                              {item}
                              </div>
                           
                            <button onClick={()=>{line(index);setTimeout(()=>{deleteTask(index)},500)}} id="delete" className="task-button"><i class="fa-solid fa-xmark"></i></button>
                                
                           
                        </div>
                      ))
                     }
                       
                </div>
                
                
        </div>
    )


}