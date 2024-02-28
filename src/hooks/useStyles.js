import { Autocomplete, Button, FormControl, IconButton, TextField, styled } from "@mui/material";

export const useStyles = () => {

        const CssTextField = styled(TextField)({
    '& label.Mui-focused': {
        color: '#4652d8',
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: '#4652d8',
    },
    '& .MuiOutlinedInput-root': {
        '&:hover fieldset': {
            borderColor: '#4652d8',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#4652d8', // Puedes intentar comentar o quitar esta línea para ver si soluciona el problema de enfoque
            borderWidth: 1, // Añade o ajusta el ancho del borde para enfocado
        },
    },
});

        const CssAutocomplete = styled(Autocomplete)({
            '& label.Mui-focused': {
                color: '#4652d8',
            },
            '& .MuiInput-underline:after': {
                borderBottomColor: '#4652d8',
            },
            '& .MuiOutlinedInput-root': {
                '&:hover fieldset': {
                    borderColor: '#4652d8',
                },
                '&.Mui-focused fieldset': {
                    borderColor: '#4652d8',
                },
            },
        });

        const CssFormControl = styled(FormControl)({
            '& label.Mui-focused': {
                color: '#4652d8',
            },
            '& .MuiInput-underline:after': {
                borderBottomColor: '#4652d8',
            },
            '& .MuiOutlinedInput-root': {
                '&:hover fieldset': {
                    borderColor: '#4652d8',
                },
                '&.Mui-focused fieldset': {
                    borderColor: '#4652d8',
                },
            },
        });

        const CssButton = styled(Button)({
            '&:hover': {
                backgroundColor: '#0d1641',
            }
        })

        const CssIconButton = styled(IconButton)({
            color: '#4652d8',
        })

    return {
        CssAutocomplete,
        CssButton,
        CssFormControl,
        CssTextField,
        CssIconButton
    }
}
