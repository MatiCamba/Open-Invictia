import { useState, useEffect } from 'react';

export const useWodTimes = (users, wod) => {
    const [scoresTime, setScoresTime] = useState({});
    
        useEffect(() => {
        let wodTimes = users.map((user) => {
            let timeParts = user[wod] ? user[wod].split(":") : ["999999", "0"];
            let timeInSeconds = parseInt(timeParts[0]) * 60 + parseInt(timeParts[1]);
            return { email: user.email, time: timeInSeconds };
        });
    
        // Filtrar usuarios que no ingresaron un tiempo
        let noTimeUsers = wodTimes.filter((wodTime) => wodTime.time === 999999*60);
        wodTimes = wodTimes.filter((wodTime) => wodTime.time !== 999999*60);
    
        let newScores = {};
        let currentScore = 1;
    
        if (wodTimes.length > 0) {
            // Ordenar los tiempos en orden ascendente
            wodTimes.sort((a, b) => a.time - b.time);
    
            // Asignar los puntajes en orden ascendente
            for (let i = 0; i < wodTimes.length; i++) {
            if (!newScores[wodTimes[i].email]) {
                newScores[wodTimes[i].email] = {};
            }
            newScores[wodTimes[i].email][wod] = currentScore;
            currentScore++; // Incrementar el puntaje para cada usuario, incluso si los tiempos son iguales
            }
        }
    
        // Asignar el puntaje más alto (último puntaje + 1) a los usuarios que no ingresaron un tiempo
        noTimeUsers.forEach((user) => {
            if (!newScores[user.email]) {
            newScores[user.email] = {};
            }
            newScores[user.email][wod] = currentScore;
            currentScore++; // Incrementar el puntaje para cada usuario que no ingresó un tiempo
        });
    
        setScoresTime(newScores);
        }, [users]);
    
        return scoresTime;
    }
