import React from "react";
import ReactDOM from "react-dom";
import axios from "axios"
import "../css/home.css"
import logo from "../static/logo.png"
import Design from "./design";

export default function Home(){
  function addUser(){
        let user = document.getElementById("new_user").value

        let data ={
            user:user
        }
       axios.post("http://localhost:5000/createuser", data)
       .then(response => {
          if(response.data == 404){
            document.getElementById("new_error").innerHTML='<i class="fa-regular fa-circle-xmark"></i> User Already Exists'
          }
          else
          window.location.href="/ToDoList/"+response.data
         
       })
       .catch(error => {
         console.error('Error:', error);
       });
   };
   function SearchUser(){
    let user = document.getElementById("user").value

    let data ={
        user:user
    }
   axios.post("http://localhost:5000/displayuser", data)
   .then(response => {
      if(response.data == 404){
        document.getElementById("error_exist").innerHTML='<i class="fa-regular fa-circle-xmark"></i>User Doesnt Exist'
      }
      else
      window.location.href="/ToDoList/"+response.data
     
   })
   .catch(error => {
     console.error('Error:', error);
   });
};
  
    return(
        <div className="cont">
          <Design/>
             <div className="shadow user-block">
                 <div className="user-search">
                    <img className="logo" src={logo}></img>
                    <p className="descp">A ToDo  App is a kind of app that is generally used to maintain our day-to-day tasks or list everything that we have to do.</p>
                    <div className="user-log">
                           <input id="new_user" className="user" name="new_user" placeholder="Create User"></input>
                           <button onClick={addUser} className="search">Create user</button>
                           <p className="textFont" id="new_error"></p>
                    </div>
                    <div className="user-log">
                           <input id="user" className="user" name="ex_user" placeholder="Enter Username"></input>
                           <button onClick={SearchUser} className="search">Search user</button>
                           <p className="textFont" id="error_exist"></p>
                    </div>
                 </div>
             </div>
        </div>
    )


}