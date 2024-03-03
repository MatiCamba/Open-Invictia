import { useState } from 'react';
import { TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const MaxRepCalculator = () => {
  const [maxRep, setMaxRep] = useState(0);

  const handleInputChange = (event) => {
    setMaxRep(event.target.value);
  };

  return (
    <> 
      <TextField 
            type="number" 
            value={maxRep} 
            onChange={handleInputChange} 
            label="Repetición Máxima"
            sx={{marginTop: '5rem', marginX: '2rem', marginBottom:'2rem'}} />
      <TableContainer component={Paper}>
        <Table sx={{width:'90%', margin: '0 auto'}}>
          <TableHead>
            <TableRow>
              <TableCell sx={{color: 'white'}}>Porcentaje</TableCell>
              <TableCell sx={{color: 'white'}}>Valor</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.from({ length: 11 }, (_, i) => (i + 10) * 5).map((percentage) => (
              <TableRow key={percentage}>
                <TableCell>{percentage}%</TableCell>
                <TableCell>{(maxRep * percentage / 100).toFixed(1)}K</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default MaxRepCalculator;