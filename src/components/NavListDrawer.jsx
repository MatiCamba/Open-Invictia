import { Avatar, Box, Divider, List, ListItem, ListItemButton, ListItemIcon } from "@mui/material"
import { useAuth } from "../context/AuthContext";
import logoutIcon from "../assets/logout.svg"
import rightIcon from "../assets/right.svg"
import wliftingIcon from "../assets/lifting.svg"
import leaderboard from "../assets/leaderboard.png"
import { Link } from "react-router-dom";
export const NavListDrawer = ({name, photoURL}) => {

    const auth = useAuth()
    const handleLogout = () => {
        auth.logout()
    }

  return (
        <Box sx={{width: '19rem'}}>
            <nav>
                <List>
                    <ListItem disablePadding >
                        <Link to="/account">
                            <ListItemButton>
                                <Avatar 
                                    src={photoURL}
                                    sx={{
                                        width: '2.8rem',
                                        height: '2.8rem',
                                        marginRight: '0.5rem',
                                        marginLeft: '0.1rem',
                                    }}

                                />
                                <p className="list-title">{name}</p>
                                <ListItemIcon>
                                    <img src={rightIcon} className="right-icon"/>
                                </ListItemIcon>
                            </ListItemButton>
                        </Link>
                    </ListItem>
                    <Divider/>
                    <Link to="/crossfit-open">
                        <ListItem sx={{marginTop: '1rem'}}>
                                <ListItemIcon>
                                    <div className="icon-container">
                                        <img src={wliftingIcon} className="list-icon"/>
                                    </div>
                                </ListItemIcon>
                                <p className="list-title">CrossFit Open 2024</p>
                                <ListItemIcon>
                                        <img src={rightIcon} className="right-icon"/>
                                </ListItemIcon>
                        </ListItem>
                    </Link>
                    <Link to="/crossfit-Leaderboard">
                        <ListItem sx={{marginTop: '1rem'}}>
                                <ListItemIcon>
                                    <div className="icon-container">
                                        <img src={leaderboard} className="list-icon"/>
                                    </div>
                                </ListItemIcon>
                                <p className="list-title">Tabla de Posiciones</p>
                                <ListItemIcon>
                                        <img src={rightIcon} className="right-icon"/>
                                </ListItemIcon>
                        </ListItem>
                    </Link>
                </List>
            </nav>

            <Divider/>

            <List>
                <ListItem>
                    <ListItemButton onClick={handleLogout}>
                        <ListItemIcon>
                            <img src={logoutIcon} className="nav-icon"/>
                        </ListItemIcon>
                        <p className="list-title">Cerrar sesión</p>
                    </ListItemButton>
                </ListItem>
            </List>

        </Box>
    )
}
