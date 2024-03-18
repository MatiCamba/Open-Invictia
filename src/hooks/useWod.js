import { useState } from "react";
import { useEffect } from "react";

export const useWod = (users, wod) => {
    const [scores, setScores] = useState({});

    useEffect(() => {
        let timeScores = [];
        let repScores = [];
        let noScoreUsers = [];
    
        users.forEach((user) => {
            let score;
            if (user[wod] && user[wod].includes(':')) { // Si el puntaje es de tipo tiempo
            let timeParts = user[wod].split(":");
            score = parseInt(timeParts[0]) * 60 + parseInt(timeParts[1]); // Convertir a segundos
            timeScores.push({ email: user.email, score });
            } else if (user[wod]) { // Si el puntaje es de tipo repeticiones
            score = parseInt(user[wod])
            repScores.push({ email: user.email, score });
            } else { // Si el usuario no ingresó un puntaje
            noScoreUsers.push({ email: user.email });
            }
        });
    
        // Ordenar los puntajes de tiempo en orden ascendente y los de repeticiones en orden descendente
        timeScores.sort((a, b) => a.score - b.score);
        repScores.sort((a, b) => b.score - a.score);
    
        // Combinar las listas de puntajes de tiempo y repeticiones
        let userScores = timeScores.concat(repScores);
    
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
