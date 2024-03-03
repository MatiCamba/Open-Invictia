
import { AppBar, Button, Drawer, IconButton, Toolbar, Typography } from "@mui/material"
import { NavListDrawer } from "./NavListDrawer"
import { useState } from "react"
import menu from "../assets/menu.svg"
import { Link } from "react-router-dom"

 
export const NavBar = ({user}) => {

    const [open, setOpen] = useState(false)

    const { displayName, photoURL } = user

    return (
        <>
            <AppBar position="fixed" sx={{backgroundColor: 'white'}}>
                <Toolbar>
                    <IconButton
                        onClick={() => setOpen(true)}
                    >
                        <img src={menu} alt="menu" className="menu-svg"/>
                    </IconButton> 
                    <Link to="/">
                        <Typography 
                            variant="h6" 
                            sx={{  
                                color:'#0d1641', 
                                fontWeight: 'bold', 
                                fontSize: '1.2rem'}}
                        > 
                        Invictia Open 
                        </Typography>
                    </Link>
                </Toolbar>
            </AppBar>

            <Drawer
                open={open}
                anchor="left"
                onClose={() => setOpen(false)}
            >               
                <NavListDrawer name={displayName} photoURL={photoURL} state={setOpen}/>
            </Drawer>
            
        </>
    )
}
 