import React from "react";
import Company from "./Company";
import { Switch, Route, useHistory } from 'react-router-dom'
const Home = () => {
    let history = useHistory()

  const companies = [
    {
      id: 1,
      name: "Test 1",
      owner: "Ivan",
    },
    {
      id: 2,
      name: "Test 2",
      owner: "Petr",
    },
    {
      id: 3,
      name: "Test 3",
      owner: "Kolya",
    },
  ];

  const goToCompany = (index) => {
    history.push(`home/${companies[index].id}`)
  }

  return (
  <div> 
      <h1>Home</h1>
      {
          companies.map((value,index)=><div key={`company-${index}`} onClick={()=>goToCompany()}>
              <p>{value.name}</p>
              <span>{value.owner}</span>
          </div>)
      } 
      <Switch>
       <Route path='/home/:id'>
           <Company name='test'/>
       </Route>
   
     </Switch>
  </div>
  )
};

export default Home;
