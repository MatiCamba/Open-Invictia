import { useState, useEffect } from 'react';

export const useWodReps = (users, wod) => {
    const [scoresRep, setScoresRep] = useState({});
    
        useEffect(() => {
        let wodReps = users.map((user) => {
            let repetitions = user[wod] ? parseInt(user[wod]) : 0;
            return { email: user.email, reps: repetitions };
        });
    
        // Filtrar usuarios que no ingresaron repeticiones
        let noRepUsers = wodReps.filter((wodRep) => wodRep.reps === 0);
        wodReps = wodReps.filter((wodRep) => wodRep.reps !== 0);
    
        let newScores = {};
        let currentScore = 1; // Iniciar el puntaje desde 1
    
        if (wodReps.length > 0) {
            // Ordenar las repeticiones en orden descendente
            wodReps.sort((a, b) => b.reps - a.reps);
    
            // Asignar los puntajes en orden ascendente
            for (let i = 0; i < wodReps.length; i++) {
            if (!newScores[wodReps[i].email]) {
                newScores[wodReps[i].email] = {};
            }
            newScores[wodReps[i].email][wod] = currentScore;
            currentScore++; // Incrementar el puntaje para cada usuario, incluso si las repeticiones son iguales
            }
        }
    
        // Asignar el puntaje más alto (la cantidad de usuarios) a los usuarios que no ingresaron repeticiones
        noRepUsers.forEach((user) => {
            if (!newScores[user.email]) {
            newScores[user.email] = {};
            }
            newScores[user.email][wod] = users.length; // Asignar el puntaje más alto a los usuarios que no ingresaron repeticiones
        });
    
        setScoresRep(newScores);
        }, [users]);
    
        return scoresRep;
    }
