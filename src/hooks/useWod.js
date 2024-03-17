import { useState } from "react";
import { useEffect } from "react";

export const useWod = (users, wod) => {
    const [scores, setScores] = useState({});
    
    useEffect(() => {
        let userScores = users.map((user) => {
            let score;
            if (user[wod] && user[wod].includes(':')) { // Si el puntaje es de tipo tiempo
            let timeParts = user[wod].split(":");
            score = parseInt(timeParts[0]) * 60 + parseInt(timeParts[1]); // Convertir a segundos
            } else { // Si el puntaje es de tipo repeticiones
            score = user[wod] ? parseInt(user[wod]) + 900 : 0; // Sumar 900 a las repeticiones
            }
            return { email: user.email, score };
        });
    
        // Filtrar usuarios que no ingresaron un puntaje
        let noScoreUsers = userScores.filter((userScore) => userScore.score === 0);
        userScores = userScores.filter((userScore) => userScore.score !== 0);
    
        // Ordenar los puntajes en orden ascendente
        userScores.sort((a, b) => a.score - b.score);
    
        let newScores = {};
        let currentScore = 1; // Iniciar el puntaje desde 1
    
        // Asignar los puntajes en orden ascendente
        userScores.forEach((userScore) => {
            newScores[userScore.email] = { [wod]: currentScore };
            currentScore++; // Incrementar el puntaje para cada usuario
        });
    
        // Asignar el puntaje más alto (la cantidad de usuarios) a los usuarios que no ingresaron un puntaje
        noScoreUsers.forEach((userScore) => {
            newScores[userScore.email] = { [wod]: users.length }; // Asignar el puntaje más alto a los usuarios que no ingresaron un puntaje
        });
    
        setScores(newScores);
        }, [users]);
    
        return scores;
    }
