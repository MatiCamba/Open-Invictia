import { Box, Button, Typography } from "@mui/material"
import { Link } from "react-router-dom"

export const Home = () => {
    

    return (
        <Box sx={{paddingTop: '3rem'}}>
            <Box sx={{ width:'100%'}}>
                <div className="home-container">
                    <p className="p-home">
                        CF OPEN 24
                    </p>
                    <p className="p-home2">
                        | en Invictia
                    </p>
                    <Link to="/crossfit-open">
                        <button className="btn-home">
                            Ver más
                        </button>
                    </Link>
                </div>
            </Box>
            
        </Box>
    )
}
