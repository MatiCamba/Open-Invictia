import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { AccordionDetails, AccordionSummary, Accordion, Box } from '@mui/material';
export const AccordionOpen = ({header, details}) => {
    return (
        <Box>
            <Accordion sx={{fontFamily:'Roboto, sans-serif', width:'90%', marginBottom:'5%', marginTop:'5%'}}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx={{color: 'white'}} />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                    sx={{fontWeight: 'bold', backgroundColor: '#0d1641', color: 'white', borderRadius: '0.2rem'}}
                >
                    {header}
                </AccordionSummary>
                <AccordionDetails>
                    <img src={details} alt="" className='img-wod' />
                </AccordionDetails>
            </Accordion>
        </Box>
    )
}
