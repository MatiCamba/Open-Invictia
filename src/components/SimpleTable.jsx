import { useState, useMemo, useEffect } from "react";
import { categories } from "../data/dataAutocomplete.js";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useWodTimes } from "../hooks/useWodTimes.js";
import { useWodReps } from "../hooks/useWodReps.js";

export const SimpleTable = ({ users }) => {
  const [filteringGender, setFilteringGender] = useState("");
  const [filteringCategory, setFilteringCategory] = useState("");
  const [expanded, setExpanded] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const scoresTime = useWodTimes(users); //hook para traer los scores por tiempo
  const scoresRep = useWodReps(users); //hook para traer los scores por repeticiones

  const data = useMemo(() => {
    return users
      .filter((user) => {
        let matches = true;
  
        if (filteringGender) {
          matches = matches && user.genero === filteringGender;
        }
  
        if (filteringCategory) {
          matches = matches && user.categoria === filteringCategory;
        }
  
        // Nueva condición de filtrado para la búsqueda por nombre
        if (searchValue) {
          matches = matches && user.nombre.includes(searchValue);
        }
  
        return matches;
      })
      .sort((a, b) => {
        // Ordenar por la suma de puntajes de menor a mayor
        const scoreTimeA = scoresTime[a.email] ? scoresTime[a.email]["WOD 24.1"] : Infinity;
        const scoreRepsA = scoresRep[a.email] ? scoresRep[a.email]["WOD 24.2"] : Infinity;
        const scoreTimeB = scoresTime[b.email] ? scoresTime[b.email]["WOD 24.1"] : Infinity;
        const scoreRepsB = scoresRep[b.email] ? scoresRep[b.email]["WOD 24.2"] : Infinity;
        return (scoreTimeA + scoreRepsA) - (scoreTimeB + scoreRepsB);
      })
      .map((user, index) => ({ ...user, order: index + 1 })); // Agrega un número de orden a cada usuario
  }, [users, filteringGender, filteringCategory, searchValue, scoresTime, scoresRep]); // Agrega scoresTime y scoresReps a las dependencias



  return (
    <div style={{ marginTop: "80px" }}>
      <Typography
        variant="h2"
        style={{
          color: "#0d1641",
          fontWeight: "bold",
          fontSize: "1.5rem",
          marginLeft: "1rem",
        }}
      >
        Buscador
      </Typography>
      <TextField
        size="small"
        style={{ width: "92%", margin: "4%" }}
        label="Buscar por nombre" // Cambia el label a "Buscar por nombre"
        value={searchValue} // Usa searchValue como el valor
        onChange={(e) => setSearchValue(e.target.value)} // Actualiza searchValue cuando el usuario escribe
      />
      <br />
      <Typography
        variant="h2"
        style={{
          color: "#0d1641",
          fontWeight: "bold",
          fontSize: "1.5rem",
          marginLeft: "1rem",
        }}
      >
        Filtros
      </Typography>
      <Box sx={{display:'flex'}}>
        <FormControl style={{ width: "60%", marginLeft: "20px", marginTop: '15px'}}>
          <InputLabel size="small">Género</InputLabel>
          <Select
            size="small"
            value={filteringGender}
            onChange={(e) => setFilteringGender(e.target.value)}
          >
            <MenuItem value="">
              <em>Todas</em>
            </MenuItem>
            <MenuItem value="Masculino">Masculino</MenuItem>
            <MenuItem value="Femenino">Femenino</MenuItem>
          </Select>
        </FormControl>
        <FormControl style={{ width: "80%", marginRight: "20px", marginTop: '15px', marginLeft:'5px' }}>
          <InputLabel size="small">Categoría</InputLabel>
          <Select
            size="small"
            value={filteringCategory}
            onChange={(e) => setFilteringCategory(e.target.value)}
          >
            <MenuItem value="">
              <em>Todas</em>
            </MenuItem>
            {categories.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Typography
        variant="h2"
        style={{
          color: "#0d1641",
          fontWeight: "bold",
          fontSize: "1.5rem",
          marginLeft: "1rem",
          marginBottom: "1rem",
          marginTop: "1.5rem",
        }}
      >
        Tabla de Posiciones
      </Typography>

      <TableContainer
        component={Paper}
        style={{ width: "90%", margin: "0 auto" }}
      >
        <Table>
          <TableHead style={{ backgroundColor: "#0d1641" }}>
            <TableRow>
              <TableCell style={{ color: "white", fontSize: "1.2rem" }}>
                Atletas
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Accordion
                    expanded={expanded === row.nombre}
                    onChange={(event, isExpanded) =>
                      setExpanded(isExpanded ? row.nombre : false)
                    }
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1bh-content"
                      id="panel1bh-header"
                    >
                      
                      <img
                        src={row.photoURL}
                        alt={row.nombre}
                        style={{
                          width: "50px",
                          height: "50px",
                          marginRight: "10px",
                        }}
                      />{" "}
                      {/* Añade la imagen del avatar aquí */}
                      <Typography
                        variant="p"
                        style={{
                          color: "#0d1641",
                          fontWeight: "bold",
                          fontSize: "1rem",
                          marginRight: "0.5rem",
                        }}
                      >
                        {row.order} {/* Muestra el número de orden aquí */}
                      </Typography>
                      <Typography
                        variant="p"
                        style={{
                          color: "#0d1641",
                          fontWeight: "bold",
                          fontSize: "1rem",
                          display: "flex"
                        }}
                      >                  
                          {row.nombre}
                          <p> ( </p>
                        {scoresTime[row.email] && scoresTime[row.email]["WOD 24.1"] && scoresRep[row.email] && scoresRep[row.email]["WOD 24.2"] 
                          ? scoresTime[row.email]["WOD 24.1"] + scoresRep[row.email]["WOD 24.2"]
                          : scoresTime[row.email] && scoresTime[row.email]["WOD 24.1"] 
                          ? scoresTime[row.email]["WOD 24.1"] 
                          : scoresRep[row.email] && scoresRep[row.email]["WOD 24.2"] 
                          ? scoresRep[row.email]["WOD 24.2"] 
                          : "N/A"} {" "}{" "}  
                        <p> ) </p>   
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>
                        24.1: {row["WOD 24.1"]} - Puntaje:{" "}
                        {scoresTime[row.email] ? scoresTime[row.email]["WOD 24.1"] : "N/A"}
                      </Typography>
                      <Typography>
                        24.2: {row["WOD 24.2"]} - Puntaje:{" "}
                        {scoresRep[row.email] ? scoresRep[row.email]["WOD 24.2"] : "N/A"}
                      </Typography>
                      <Typography>24.3: {row["WOD 24.3"]}</Typography>
                    </AccordionDetails>
                  </Accordion>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
