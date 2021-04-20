import React from 'react'

type props={
    titleHeader: string
}

function Header({titleHeader}: props){
    return(
        <header>
            <h3>{titleHeader}</h3>
        </header>
    )
}

export default Header