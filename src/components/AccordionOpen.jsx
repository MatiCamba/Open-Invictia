import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  AccordionDetails,
  AccordionSummary,
  Accordion,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography
} from "@mui/material";
import { doc, setDoc } from "firebase/firestore";
import { db, auth } from "../firebase/config";
import { useState } from "react";

export const AccordionOpen = ({ header, details, value, setValue }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const user = auth.currentUser;

  const handleSaveScore = async () => {
    if (user) {
      await setDoc(doc(db, "usuarios", user.uid), { [header]: value }, { merge: true });
      setDialogOpen(false);
    }
  };

  return (
    <Box>
      <Accordion
        sx={{
          fontFamily: "Roboto, sans-serif",
          width: "90%",
          marginBottom: "5%",
          marginTop: "5%",
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
          aria-controls="panel1-content"
          id="panel1-header"
          sx={{
            fontWeight: "bold",
            backgroundColor: "#0d1641",
            color: "white",
            borderRadius: "0.2rem",
          }}
        >
          {header}
        </AccordionSummary>
        <AccordionDetails sx={{ flexDirection: 'column' }}>
          {Array.isArray(details) ? (
            details.map((detail, index) => (
              <img className="img-wod" key={index} src={detail} alt="WOD" />
            ))
          ) : (
            <img className="img-wod" src={details} alt="WOD" />
          )}
          <Box sx={{display: 'flex', alignItems: 'center', marginTop: '1rem'}}>
            <Button variant="contained" onClick={() => setDialogOpen(true)}>
              Ingresar Score
            </Button>
            <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', marginLeft: '1rem' }}>
              {value}
            </Typography>
          </Box>
        </AccordionDetails>
      </Accordion>
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Ingrese su score</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="score"
            label="Score"
            type="text"
            fullWidth
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancelar</Button>
          <Button onClick={handleSaveScore}>Guardar</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};