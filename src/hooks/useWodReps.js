import { useState, useEffect } from 'react';

export const useWodReps = (users) => {
    const [scoresRep, setScoresRep] = useState({});

    useEffect(() => {
        let wodReps = users.map((user) => {
        let repetitions = user["WOD 24.2"] ? parseInt(user["WOD 24.2"]) : 0;
        return { email: user.email, reps: repetitions };
        });

        // Filtrar usuarios que no ingresaron repeticiones
        let noRepUsers = wodReps.filter((wodRep) => wodRep.reps === 0);
        wodReps = wodReps.filter((wodRep) => wodRep.reps !== 0);

        let newScores = {};
        let currentScore = wodReps.length + 1; // Iniciar el puntaje desde el número total de usuarios + 1

        if (wodReps.length > 0) {
        // Ordenar las repeticiones en orden descendente
        wodReps.sort((a, b) => b.reps - a.reps);

        // Asignar los puntajes en orden descendente
        for (let i = 0; i < wodReps.length; i++) {
            if (!newScores[wodReps[i].email]) {
            newScores[wodReps[i].email] = {};
            }
            newScores[wodReps[i].email]["WOD 24.2"] = currentScore;
            currentScore--; // Decrementar el puntaje para cada usuario, incluso si las repeticiones son iguales
        }
        }

        // Asignar el puntaje más bajo (1) a los usuarios que no ingresaron repeticiones
        noRepUsers.forEach((user) => {
        if (!newScores[user.email]) {
            newScores[user.email] = {};
        }
        newScores[user.email]["WOD 24.2"] = 1; // Asignar el puntaje más bajo a los usuarios que no ingresaron repeticiones
        });

        setScoresRep(newScores);
    }, [users]);

    return scoresRep;
}
