import { useState, useEffect } from "react";
import {
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Typography,
  Grid,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import CircularProgress from "@mui/material/CircularProgress";
import { green, red } from "@mui/material/colors";

export const Timer = () => {
  const [setup, setSetup] = useState(true);
  const [workPeriod, setWorkPeriod] = useState({ minutes: 0, seconds: 0 });
  const [restPeriod, setRestPeriod] = useState({ minutes: 0, seconds: 0 });
  const [rounds, setRounds] = useState(1);
  const [seconds, setSeconds] = useState(null);
  const [timerState, setTimerState] = useState("stopped");
  const [currentRound, setCurrentRound] = useState(1);
  const [isResting, setIsResting] = useState(false);

  const colorWork = green[800];
  const colorRest = red[800];

  useEffect(() => {
    let interval = null;
    if (timerState === "running" && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds - 1);
      }, 1000);
    } else if (seconds === 0) {
      if (currentRound < rounds) {
        setIsResting((isResting) => {
          const nextIsResting = !isResting;
          setSeconds(
            nextIsResting
              ? restPeriod.minutes * 60 + restPeriod.seconds
              : workPeriod.minutes * 60 + workPeriod.seconds
          );
          setCurrentRound(nextIsResting ? currentRound + 1 : currentRound);
          return nextIsResting;
        });
      } else {
        setTimerState("stopped");
      }
    } else if (timerState === "stopped") {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [
    timerState,
    seconds,
    currentRound,
    rounds,
    workPeriod.minutes,
    workPeriod.seconds,
    restPeriod.minutes,
    restPeriod.seconds,
  ]);

  const handlePeriodChange = (event, type, unit) => {
    if (type === "work") {
      setWorkPeriod({ ...workPeriod, [unit]: event.target.value });
    } else if (type === "rest") {
      setRestPeriod({ ...restPeriod, [unit]: event.target.value });
    }
  };

  const handleRoundChange = (event) => {
    setRounds(event.target.value);
  };

  const handleGetStarted = () => {
    setSetup(false);
    setSeconds(workPeriod.minutes * 60 + workPeriod.seconds);
  };

  const startOrStopTimer = () => {
    if (timerState !== "running") {
      setTimerState("running");
    } else {
      setTimerState("stopped");
    }
  };

  const resetTimer = () => {
    setTimerState("stopped");
    setSeconds(workPeriod.minutes * 60 + workPeriod.seconds);
    setCurrentRound(1);
    setIsResting(false);
  };

  const totalRounds = rounds; // Aquí, 'rounds' es el número total de rondas que el usuario ha seleccionado.
  const totalSeconds = workPeriod.minutes * 60 + workPeriod.seconds; // Aquí, 'workPeriod' es el tiempo total de trabajo que el usuario ha seleccionado.
  const progress = ((totalSeconds - seconds) / totalSeconds) * 100;
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return (
    <Box sx={{ marginTop: "5rem" }}>
      <Typography variant="h4" align="center">
        Timer
      </Typography>
      {setup ? (
        <Grid container spacing={2} direction="column" alignItems="center">
          <Grid item xs={12}>
            <Typography
              variant="h6"
              align="center"
              sx={{ marginBottom: "1rem" }}
            >
              Rondas
            </Typography>
            <FormControl sx={{ width: "100%" }}>
              <InputLabel htmlFor="rounds">Rondas</InputLabel>
              <Select id="rounds" value={rounds} onChange={handleRoundChange}>
                {Array.from({ length: 100 }, (_, i) => (
                  <MenuItem key={i + 1} value={i + 1}>
                    {i + 1}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Typography
              variant="h6"
              align="center"
              sx={{ marginBottom: "1rem" }}
            >
              Tiempo de Trabajo
            </Typography>
            <Grid container spacing={2} justifyContent="center">
              <Grid item xs={6}>
                <FormControl sx={{ width: "100%" }}>
                  <InputLabel htmlFor="work-minutes">Minutos</InputLabel>
                  <Select
                    id="work-minutes"
                    value={workPeriod.minutes}
                    onChange={(e) => handlePeriodChange(e, "work", "minutes")}
                  >
                    {Array.from({ length: 60 }, (_, i) => (
                      <MenuItem key={i} value={i}>
                        {i}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl sx={{ width: "100%" }}>
                  <InputLabel htmlFor="work-seconds">Segundos</InputLabel>
                  <Select
                    id="work-seconds"
                    value={workPeriod.seconds}
                    onChange={(e) => handlePeriodChange(e, "work", "seconds")}
                  >
                    {Array.from({ length: 60 }, (_, i) => (
                      <MenuItem key={i} value={i}>
                        {i}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Typography
              variant="h6"
              align="center"
              sx={{ marginBottom: "1rem" }}
            >
              Tiempo de Descanso
            </Typography>
            <Grid container spacing={2} justifyContent="center">
              <Grid item xs={6}>
                <FormControl sx={{ width: "100%" }}>
                  <InputLabel htmlFor="rest-minutes">Minutos</InputLabel>
                  <Select
                    id="rest-minutes"
                    value={restPeriod.minutes}
                    onChange={(e) => handlePeriodChange(e, "rest", "minutes")}
                  >
                    {Array.from({ length: 60 }, (_, i) => (
                      <MenuItem key={i} value={i}>
                        {i}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl sx={{ width: "90%" }}>
                  <InputLabel htmlFor="rest-seconds">Segundos</InputLabel>
                  <Select
                    id="rest-seconds"
                    value={restPeriod.seconds}
                    onChange={(e) => handlePeriodChange(e, "rest", "seconds")}
                  >
                    {Array.from({ length: 60 }, (_, i) => (
                      <MenuItem key={i} value={i}>
                        {i}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Button
              variant="contained"
              onClick={handleGetStarted}
              fullWidth
              size="large"
              color="success"
            >
              Start
            </Button>
          </Grid>
        </Grid>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <IconButton
            sx={{ marginLeft: "23rem" }}
            onClick={() => setSetup(true)}
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6">
            Ronda {currentRound} / {totalRounds}
          </Typography>
          <Typography variant="h6">{isResting ? "Rest" : "Work"}</Typography>
          <Box
            sx={{
              position: "relative",
              width: 200,
              height: 200,
            }}
          >
            <CircularProgress
              variant="determinate"
              value={100 - progress}
              style={{ color: isResting ? colorRest : colorWork }}
              size={200}
              thickness={2.2}
            />
            {!isNaN(seconds) ? (
              <Typography
                variant="h4"
                align="center"
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  color: isResting ? "red" : "green",
                }}
              >
                {`${minutes}:${remainingSeconds.toString().padStart(2, "0")}`}
              </Typography>
            ) : null}
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "50%",
              marginTop: "1rem",
            }}
          >
            <Button
              variant="outlined"
              onClick={startOrStopTimer}
              color="success"
            >
              {timerState !== "running" ? "Start" : "Pausa"}
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={resetTimer}
              color="error"
            >
              Reset
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};
