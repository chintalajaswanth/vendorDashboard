import React from 'react'

const NavBar = ({showLoginHandler,showRegisterHandler,showLogout,logoutHandler}) => {

  const getFirmName=localStorage.getItem('firmName')


  //  console.log(showLoginHandler);
    console.log(showRegisterHandler);
  return (
    <div className='NavSection'>
        <div className='company'>
            Vendor DashBoard
        </div>
        <div className='firmName'>
          <h4>Firm Name: {getFirmName}</h4>
        </div>
        <div className='userAuth'>
{!showLogout ?
<>   <span onClick={showLoginHandler}>Login</span>/
<span onClick={showRegisterHandler}>Register</span>
</>:<> <span onClick={logoutHandler}>Logout</span>       </>}
         
           
        </div>
        </div>
  )
}

export default NavBar