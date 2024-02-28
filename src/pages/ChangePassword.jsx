import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Box, Button, FormControl, IconButton, InputAdornment, OutlinedInput, Typography } from "@mui/material"
import { useState } from "react"
import {  updatePassword } from "firebase/auth";
import { auth } from "../firebase/config";
import { Link,  useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

export const ChangePassword = () => {

    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false);
    const [isPasswordChanged, setIsPasswordChanged] = useState(false)
    
    const { enqueueSnackbar } = useSnackbar()

    const navigate = useNavigate()

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const user = auth.currentUser

    const changePassword = (password) => {
        updatePassword(user, password)
        .then(() => {
            enqueueSnackbar("Contraseña cambiada con éxito", {
                variant: "success",
            })
            setIsPasswordChanged(true)
            
        }).catch((error) => {
            enqueueSnackbar("Se requiere iniciar sesion nuevamente para esta acción", {
                variant: "error",
            })
        });
        if (isPasswordChanged) navigate('/account')
    }
    const onSubmit = (e) => {
        e.preventDefault()
        changePassword(password)
    }

    return (
        <Box sx={{paddingTop:'7rem'}}>
            <Typography sx={{marginLeft:'25%', marginBottom:'2rem'}} variant="h6">Cambiar Contraseña</Typography>
            <Box 
                component="form" 
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    marginLeft: '3%',
                    flexWrap: 'wrap',
                }}
                onSubmit={onSubmit}
            >
                <Box sx={{display:'flex'}}>
                    <p className="account-title">Nueva contraseña:</p>
                    <FormControl 
                            required 
                            variant="outlined" 
                            sx={{marginLeft:'1rem'}}
                            >   
                            <OutlinedInput
                                size='small'
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                id="password"
                                autoComplete="off"
                                type={showPassword ? 'text' : 'password'}
                                endAdornment= {
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                            size="small"
                                            color="primary"
                                        >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                    </Box>
                    
                    <Box sx={{display:'flex', gap:'1rem', marginTop:'2rem', marginLeft:'45%'}}>
                        <Link to="/account" className="links">
                            <Button
                                size="small" 
                                variant="contained"
                                color="error"  
                            >
                                
                                    Cancelar
                                
                            </Button>
                        </Link>
                        <Button
                            size="small"
                            variant="contained"
                            type="submit"
                        >
                            Actualizar
                        </Button>
                    </Box>
            </Box>
        </Box>
    )
}

