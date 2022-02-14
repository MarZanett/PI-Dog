import React from "react";

export default function Reload(){

    function handleClick(evt){
        evt.preventDefault();
        window.location.reload()
        
    }
  
    return (
  
      <div>
        <button onClick={(evt =>{handleClick(evt)})}>Reload Dogs</button>
        
      </div>
    );
}