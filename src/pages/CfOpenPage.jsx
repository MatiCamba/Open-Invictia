import { Box } from "@mui/material"
import {  AccordionOpen } from "../components/AccordionOpen"
import wod1 from "../assets/24-1.jpg"
import wod2 from "../assets/24-2.jpg"
import wod3 from "../assets/24-3.jpg"
import wod211 from '../assets/wod211.png'

export const CfOpenPage = () => {
  return (
    <Box sx={{paddingTop: '5rem', paddingLeft:'10%'}}>
      <AccordionOpen header="WOD 24.1" details={[wod1, wod211]}/>
      <AccordionOpen header="WOD 24.2" details={wod2}/>
      <AccordionOpen header="WOD 24.3" details={wod3}/>
    </Box>
  )
}
