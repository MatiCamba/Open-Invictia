
import { Visibility, VisibilityOff } from "@mui/icons-material"
import { Box,  FormControl,  IconButton,  InputAdornment,  InputLabel,  OutlinedInput,  TextField } from "@mui/material"
import { useState } from "react"
import { useStyles } from "../hooks/useStyles"
import google from "../assets/g-logo.png"
import { useAuth } from "../context/AuthContext"
import svgLogin from "../assets/login.svg"
export const Login = () => {
    
    const auth = useAuth()
    const [passwRegister, setPasswRegister] = useState("")
    const [register, setRegister] = useState(true)

    const [email, setEmail] = useState("")

    const [error, setError] = useState({
        error: false,
        message: "",
    })

    const [showPassword, setShowPassword] = useState(false);

    const { CssButton } = useStyles()

    const validateEmail = (email) => {
        const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        return regex.test(email)
    }

    const onSubmit = (e) => {
        e.preventDefault()
        if (register === false) {
            auth.login(email, passwRegister)
        } else{
            auth.register(email, passwRegister)
        }

        if (!validateEmail(email)) {
            setError({
                error: true,
                message: "Ingrese un correo electrónico válido.",
            })
            return
        }
    
    }

    const handleGoogle = (e) => {
        e.preventDefault()
        auth.loginWithGoogle()
    }

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
            <div className="container-login">
                
                <Box 
                    component="form" 
                    onSubmit={onSubmit} 
                    sx={{ 
                        display: "flex", 
                        flexDirection: "column", 
                        gap: "2rem", 
                        padding: "10%", 
                        backgroundColor: "white", 
                        borderRadius: "1.5rem",
                        width: "80%",
                        margin: "auto",
                        paddingTop: "15%",
                        position: "relative"
                    }}
                >
                    <div className="container-formL">
                        <img src={svgLogin} alt="login" className="svg-login" />
                        <h1 className='title-form'>{register ? 'Registrarse' : 'Iniciar sesión'}</h1>
                    </div>

                    <TextField
                        required
                        label="Correo electrónico"
                        type="email"
                        id="email"
                        variant="outlined"
                        size="small"
                        helperText= {error.message}
                        error= {error.error}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete="off"
                    />

                    <FormControl 
                        required 
                        variant="outlined" 
                        >
                        <InputLabel htmlFor="password" size="small">Contraseña</InputLabel>    
                        <OutlinedInput
                            size='small'
                            value={passwRegister}
                            onChange={(e) => setPasswRegister(e.target.value)}
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
                            label="Contraseña"
                        />
                    </FormControl>
                    <CssButton 
                        type="submit" 
                        variant="contained"
                        sx={{mt: 2, bgcolor: "#0d1641", color: "white"}}
                    >
                        {register ? 'Registrarme' : 'Ingresar'}
                    </CssButton>
                    <button onClick={(e) => handleGoogle(e)} className='btn-google'>
                        <img src={google} className='g-logo'/>
                        <p className='p-google'>Ingresa con Google</p>
                    </button>
                    <button type='button' className='btn-transparent' onClick={() => setRegister(!register) }>
                        {register ? '¿Ya tenés una cuenta? Inicia sesión' : '¿Todavia no tenés cuenta? Registrate' }
                    </button>
                </Box>
            </div>
    )
}
