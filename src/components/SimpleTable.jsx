import { useState, useMemo } from "react";
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
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export const SimpleTable = ({ users, photoURL }) => {
  const [filteringGender, setFilteringGender] = useState("");
  const [filteringCategory, setFilteringCategory] = useState("");
  /* const [filteringWod, setFilteringWod] = useState(""); */
  const [expanded, setExpanded] = useState(false);
  const [searchValue, setSearchValue] = useState(""); // Nuevo estado para el valor de búsqueda

  const data = useMemo(() => {
    return users.filter((user) => {
      let matches = true;

      if (filteringGender) {
        matches = matches && user.genero === filteringGender;
      }

      if (filteringCategory) {
        matches = matches && user.categoria === filteringCategory;
      }

      /* if (filteringWod) {
        matches = matches && user.wod === filteringWod;
      } */

      // Nueva condición de filtrado para la búsqueda por nombre
      if (searchValue) {
        matches = matches && user.nombre.includes(searchValue);
      }

      return matches;
    });
  }, [users, filteringGender, filteringCategory, searchValue]); // Agrega searchValue a las dependencias

  console.log(data)

  return (
    <div style={{ marginTop: '80px',  }}>
      <Typography variant="h2" style={{  
        color:'#0d1641', 
        fontWeight: 'bold', 
        fontSize: '2rem',
        marginLeft: '1rem'}}>
          Buscador
        </Typography>
      <TextField
        style={{ width: '80%', margin: '20px',  }}
        label="Buscar por nombre" // Cambia el label a "Buscar por nombre"
        value={searchValue} // Usa searchValue como el valor
        onChange={(e) => setSearchValue(e.target.value)} // Actualiza searchValue cuando el usuario escribe
      />
      <br />
      <Typography variant="h2" style={{  
        color:'#0d1641', 
        fontWeight: 'bold', 
        fontSize: '2rem',
        marginLeft: '1rem'}}>
          Filtros
        </Typography>
      <FormControl style={{ width: '80%', margin: '20px' }}>
        <InputLabel>Género</InputLabel>
        <Select
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
      <FormControl style={{ width: '80%', margin: '20px' }}>
        <InputLabel>Categoría</InputLabel>
        <Select
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
      {/* <FormControl style={{ width: '80%', margin: '20px',  }}>
        <InputLabel>Wod</InputLabel>
        <Select
          value={filteringWod}
          onChange={(e) => setFilteringWod(e.target.value)}
        >
          <MenuItem value="">
            <em>Todos</em>
          </MenuItem>
          <MenuItem value="24 1">24.1</MenuItem>
          <MenuItem value="24 2">24.2</MenuItem>
          <MenuItem value="24 3">24.3</MenuItem>
        </Select>
      </FormControl> */}

      <Typography variant="h2" style={{  
        color:'#0d1641', 
        fontWeight: 'bold', 
        fontSize: '2rem',
        marginLeft: '1rem',
        marginBottom: '1rem'}}>
          Tabla de Posiciones
        </Typography>

      <TableContainer component={Paper} style={{ width: '90%', margin: '0 auto' }}>
        <Table>
          <TableHead style={{ backgroundColor: '#0d1641' }}>
            <TableRow>
              <TableCell style={{ color: 'white', fontSize: '1.5rem' }}>Atleta</TableCell>
              {/* <TableCell style={{ color: 'white', fontSize: '1.5rem' }}>Categoría</TableCell>
              <TableCell style={{ color: 'white', fontSize: '1.5rem' }}>Género</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={`${row.nombre}-${index}`} > 
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
                        src={row.photoURL || photoURL}
                        alt={row.nombre}
                        style={{
                          width: "50px",
                          height: "50px",
                          marginRight: "10px",
                        }}
                      />{" "}
                      {/* Añade la imagen del avatar aquí */}
                      <Typography
                      variant="p" style={{  
                        color:'#0d1641', 
                        fontWeight: 'bold', 
                        fontSize: '1rem',
                        }}
                      >{row.nombre}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>
                        24.1: {row["24.1"]}
                      </Typography>
                      <Typography>
                        24.2: {row["24.2"]}
                      </Typography>
                      <Typography>
                        24.3: {row["24.3"]}
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                </TableCell>
                {/* <TableCell variant="p" style={{  
                        color:'#0d1641', 
                        fontSize: '.8rem',
                        }}>{row.categoria}
                </TableCell>
                <TableCell variant="p" style={{  
                        color:'#0d1641', 
                        fontSize: '.8rem',
                        }}
                >{row.genero}
                </TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
