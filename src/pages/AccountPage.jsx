import {
  Autocomplete,
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
} from "@mui/material";
import { Link } from "react-router-dom";
import editIcon from "../assets/edit.svg";
import { useEffect, useState } from "react";
import { auth, db } from "../firebase/config";
import { updateEmail, updateProfile } from "firebase/auth";
import { useSnackbar } from "notistack";
import editWhite from "../assets/editw.svg";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import { uploadFile } from "../firebase/config";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { genders, categories } from "../data/dataAutocomplete";
import correctIcon from "../assets/correct.svg";


export const AccountPage = ({ name, email, photoURL }) => {
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [openImg, setOpenImg] = useState(false);
  const [openAge, setOpenAge] = useState(false);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [category, setCategory] = useState("");
  const [genderSelected, setGenderSelected] = useState(false);
  const [categorySelected, setCategorySelected] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [file, setFile] = useState(null);
  const [error, setError] = useState({
    error: false,
    message: "",
  });

  const user = auth.currentUser;

  useEffect(() => {
    if (user) {
      const docRef = doc(db, "usuarios", user.uid);
      getDoc(docRef).then((docSnap) => {
        if (docSnap.exists()) {
          setAge(docSnap.data().edad);
          setGender(docSnap.data().genero);
          setCategory(docSnap.data().categoria);
        }
      });
    }
  }, [auth]);

  const docRef = doc(db, "usuarios", user.uid);
  getDoc(docRef).then((docSnap) => {
    console.log(docSnap.data());
  });

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  const { enqueueSnackbar } = useSnackbar();

  const onSubmitName = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(user, {
        displayName: newName,
      });
      enqueueSnackbar("Información actualizada", {
        variant: "success",
      });

      if (user) {
        const docRef = doc(db, "usuarios", user.uid);
        await setDoc(
          docRef,
          {
            nombre: newName,
          },
          { merge: true }
        );
      }
    } catch (error) {
      enqueueSnackbar("No se pudo actualizar la información", {
        variant: "error",
      });
    }
    setOpen(false);
  };

  const validateEmail = (email) => {
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return regex.test(email);
  };

  const onSubmitEmail = (e) => {
    e.preventDefault();
    updateEmail(user, newEmail)
      .then(() => {
        enqueueSnackbar("Información actualizada", {
          variant: "success",
        });
      })
      .catch((error) => {
        enqueueSnackbar("No se pudo actualizar la información", {
          variant: "error",
        });
      });
    setOpen2(false);
    if (!validateEmail(email)) {
      setError({
        error: true,
        message: "Ingrese un correo electrónico válido.",
      });
      return;
    }
  };

  const onSubmitAge = async (e) => {
    e.preventDefault();
    if (user) {
      const docRef = doc(db, "usuarios", user.uid);
      await setDoc(
        docRef,
        {
          edad: age,
        },
        { merge: true }
      );
    }
    setOpenAge(false);
  };

  const onSubmitGender = async (e) => {
    e.preventDefault();
    if (user) {
      const docRef = doc(db, "usuarios", user.uid);
      await setDoc(
        docRef,
        {
          genero: gender,
        },
        { merge: true }
      );
      setGenderSelected(true);
    }
  };

  const onSubmitCategory = async (e) => {
    e.preventDefault();
    if (user) {
      const docRef = doc(db, "usuarios", user.uid);
      await setDoc(
        docRef,
        {
          categoria: category,
        },
        { merge: true }
      );
      setCategorySelected(true);
    }
  };

  const handleFileChange = (e) => {
    const [file] = e.target.files;
    const uploadedFile = e.target.files[0];
    setFile(uploadedFile);

    const SIZE_50MB = 50 * 1024 * 1024;
    const isValidSize = file.size < SIZE_50MB;
    const isNameOfOneImageRegex = /.(jpe?g|gif|png)$/i;
    const isValidType = isNameOfOneImageRegex.test(file.name);

    if (!isValidType)
      return enqueueSnackbar("Solo puedes subir imágenes", {
        variant: "error",
      });
    if (!isValidSize)
      return enqueueSnackbar("El archivo es demasiado grande.", {
        variant: "error",
      });

    const reader = new FileReader();
    reader.onloadend = () => {
      setSelectedFile(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleUpdateImg = async () => {
    if (!selectedFile) {
      return enqueueSnackbar("Debes seleccionar una imagen", {
        variant: "warning",
      });
    }
    try {
      const result = await uploadFile(file);
      console.log(result);
      try {
        await updateProfile(user, {
          photoURL: result,
        });
        enqueueSnackbar("Foto de perfil actualizada", {
          variant: "success",
        });
      } catch (error) {
        alert(error);
      }
      if (user) {
        const docRef = doc(db, "usuarios", user.uid);
        await setDoc(
          docRef,
          {
            photoURL: result,
          },
          { merge: true }
        );
      }
    } catch (error) {
      console.log(error);
    }
    setOpenImg(false);
  };

  return (
    <Box
      sx={{
        paddingTop: "25%",
        paddingLeft: "20%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box sx={{ display: "flex" }}>
        <Avatar
          sx={{ width: "10rem", height: "10rem", marginLeft: "2.5rem" }}
          src={photoURL}
        />
        <div className="editimg-container">
          <img
            src={editWhite}
            alt="edit"
            className="editimg-icon"
            onClick={() => setOpenImg(true)}
          />
        </div>
      </Box>
      <Dialog
        open={openImg}
        onClose={() => setOpenImg(false)}
        aria-describedby="dialog-description"
      >
        <DialogContent>
          <Avatar src={selectedFile} sx={{ width: "10rem", height: "10rem" }} />
          <Box sx={{ display: "flex" }}>
            <Button
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
            >
              Subir imagen
              <VisuallyHiddenInput
                type="file"
                accept=".png, .jpg, .jpeg, .gif"
                onChange={handleFileChange}
              />
            </Button>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenImg(false)} color="error" size="small">
            Cancelar
          </Button>
          <Button
            size="small"
            sx={{ marginRight: "0.5rem" }}
            onClick={handleUpdateImg}
          >
            Actualizar
          </Button>
        </DialogActions>
      </Dialog>

      <Box sx={{ display: "flex", marginLeft: "0.2rem", marginTop: "1.5rem" }}>
        <p className="account-title">Nombre y apellido:</p>
        <p className="account-text">{newName ? newName : name}</p>
        <img
          src={editIcon}
          alt="edit"
          className="edit-icon"
          onClick={() => setOpen(true)}
        />
      </Box>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-describedby="dialog-description"
        component="form"
        onSubmit={onSubmitName}
      >
        <DialogContent>
          <Box sx={{ display: "flex" }}>
            <p className="account-title">Nombre y apellido:</p>
            <TextField
              id="name"
              type="text"
              variant="outlined"
              size="small"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              autoComplete="off"
              sx={{ width: "11.5rem", marginLeft: "0.5rem" }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="error" size="small">
            Cancelar
          </Button>
          <Button size="small" sx={{ marginRight: "0.5rem" }} type="submit">
            Actualizar
          </Button>
        </DialogActions>
      </Dialog>

      <Box sx={{ display: "flex", marginLeft: "0.2rem", marginTop: "1.5rem" }}>
        <p className="account-title">Email:</p>
        <p className="account-text">{newEmail ? newEmail : email}</p>
        <img
          src={editIcon}
          alt="edit"
          className="edit-icon"
          onClick={() => setOpen2(true)}
        />
      </Box>

      <Dialog
        open={open2}
        onClose={() => setOpen2(false)}
        aria-describedby="dialog-description"
        component="form"
        onSubmit={onSubmitEmail}
      >
        <DialogContent>
          <Box sx={{ display: "flex" }}>
            <p className="account-title">Email:</p>
            <TextField
              type="email"
              id="email"
              variant="outlined"
              size="small"
              helperText={error.message}
              error={error.error}
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              autoComplete="off"
              sx={{ marginLeft: "0.5rem" }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen2(false)} color="error" size="small">
            Cancelar
          </Button>
          <Button size="small" sx={{ marginRight: "0.5rem" }} type="submit">
            Actualizar
          </Button>
        </DialogActions>
      </Dialog>

      <Box sx={{ display: "flex", marginLeft: "0.2rem", marginTop: "1.5rem" }}>
        <p className="account-title">Edad:</p>
        <p className="account-text">{age ? age : ""}</p>
        <img
          src={editIcon}
          alt="edit"
          className="edit-icon"
          onClick={() => setOpenAge(true)}
        />
      </Box>

      <Dialog
        open={openAge}
        onClose={() => setOpenAge(false)}
        aria-describedby="dialog-description"
        component="form"
        onSubmit={onSubmitAge}
      >
        <DialogContent>
          <Box sx={{ display: "flex" }}>
            <p className="account-title">Edad:</p>
            <TextField
              type="number"
              id="edad"
              variant="outlined"
              size="small"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              autoComplete="off"
              sx={{ marginLeft: "0.5rem" }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAge(false)} color="error" size="small">
            Cancelar
          </Button>
          <Button size="small" sx={{ marginRight: "0.5rem" }} type="submit">
            Actualizar
          </Button>
        </DialogActions>
      </Dialog>

      {genderSelected ? (
        <Box sx={{ display: "flex", marginTop: "1.5rem" }}>
          <p className="account-title">Género: </p>
          <p className="account-text">{gender}</p>
          <img
            src={editIcon}
            alt="edit"
            className="edit-icon"
            onClick={() => setGenderSelected(false)}
          />
        </Box>
      ) : (
        <Box
          sx={{ display: "flex", marginLeft: "0.2rem", marginTop: "1.5rem" }}
          component="form"
          onSubmit={onSubmitGender}
        >
          <p className="account-title">Género:</p>
          <Autocomplete
            size="small"
            isOptionEqualToValue={(option, value) =>
              option === value || (option === "" && value === "")
            }
            value={gender} 
            onChange={(event, newValue) => {
              setGender(newValue); 
            }}
            options={genders}
            renderInput={(params) => <TextField {...params} />}
            sx={{ marginLeft: "0.5rem", width: "10rem", marginRight: "0.5rem" }}
          />
          <Box
            sx={{
              width: "1.5rem",
              backgroundColor: "#1976d2",
              border: "none",
              height: "1.5rem",
              borderRadius: "20%",
              marginTop: "0.4rem",
              paddingTop: "0.2rem",
            }}
            component="button"
            type="submit"
          >
            <img src={correctIcon} className="correct-icon" />
          </Box>
        </Box>
      )}

      {categorySelected ? (
        <Box sx={{ display: "flex", marginTop: "1.5rem" }}>
          <p className="account-title">Categoría: </p>
          <p className="account-text">{category}</p>
          <img
            src={editIcon}
            alt="edit"
            className="edit-icon"
            onClick={() => setCategorySelected(false)}
          />
        </Box>
      ) : (
        <Box
          sx={{ display: "flex", marginLeft: "0.2rem", marginTop: "1.5rem" }}
          component="form"
          onSubmit={onSubmitCategory}
        >
          <p className="account-title">Categoría:</p>
          <Autocomplete
            size="small"
            isOptionEqualToValue={(option, value) => option === value}
            value={category} 
            onChange={(event, newValue) => {
              setCategory(newValue); 
            }}
            options={categories}
            renderInput={(params) => <TextField {...params} />}
            sx={{ marginLeft: "0.5rem", width: "10rem", marginRight: "0.5rem" }}
          />
          <Box
            sx={{
              width: "1.5rem",
              backgroundColor: "#1976d2",
              border: "none",
              height: "1.5rem",
              borderRadius: "20%",
              marginTop: "0.4rem",
              paddingTop: "0.2rem",
            }}
            component="button"
            type="submit"
          >
            <img src={correctIcon} className="correct-icon" />
          </Box>
        </Box>
      )}

      <Link to="/change-password">
        <Button
          size="small"
          variant="outlined"
          sx={{ width: "16rem", marginTop: "2rem" }}
        >
          Cambiar contraseña
        </Button>
      </Link>
    </Box>
  );
};
