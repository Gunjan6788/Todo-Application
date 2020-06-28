import React from "react"
import {Route,Switch} from "react-router-dom"
import Home from  "../RouterComponents/Home"
import Edit from  "../RouterComponents/Edit"
import Todo from  "../RouterComponents/Todo"



export default function PublicRouter(){
    return(
       <Switch>
          <Route exact path  = "/" render = {()=><Home/>}></Route>
          <Route exact path  = "/todo" render = {()=><Todo/>}></Route>
          <Route exact path  = "/todo/edit/:id" render = {(props)=><Edit{...props}/>}></Route>
       </Switch> 

    )
}