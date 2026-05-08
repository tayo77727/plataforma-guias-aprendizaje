/* === APRENDIZAJE GUIADO LOGIC === */

document.addEventListener('DOMContentLoaded', () => {
    initTabs();
    initFlashcards();
    initQuizzes();
});

// Tab System
function initTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.dataset.tab;
            
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            btn.classList.add('active');
            document.getElementById(target).classList.add('active');
        });
    });
}

// Flashcard Flip
function initFlashcards() {
    const flashcards = document.querySelectorAll('.flashcard');
    flashcards.forEach(card => {
        card.addEventListener('click', () => {
            card.classList.toggle('flipped');
        });
    });
}

// Quiz Logic
const quizzes = {
    guia1: [
        { q: "¿Cuál es el comando para importar todas las funciones de la librería microbit?", a: ["import microbit", "from microbit import *", "load microbit", "include microbit"], c: 1 },
        { q: "¿Qué comando se usa para mostrar un texto en desplazamiento horizontal?", a: ["display.show()", "display.scroll()", "display.write()", "print()"], c: 1 },
        { q: "¿Cómo se crea un bucle que se repite para siempre?", a: ["for i in range(10):", "repeat:", "while True:", "loop forever:"], c: 2 },
        { q: "¿Qué función se usa para pausar el programa en milisegundos?", a: ["wait()", "sleep()", "delay()", "stop()"], c: 1 },
        { q: "¿Cuál es la sintaxis correcta para mostrar el ícono de un corazón?", a: ["display.show(Image.HEART)", "display.heart()", "image(HEART)", "show.HEART"], c: 0 },
        { q: "¿Por qué es importante la precisión en el código escrito?", a: ["Porque se ve mejor", "Porque el hardware es sensible", "Porque la sintaxis es estricta", "No es importante"], c: 2 },
        { q: "¿Cómo se escribe el ícono de un corazón pequeño?", a: ["Image.HEART_LITTLE", "Image.SMALL_HEART", "Image.HEART_SMALL", "Image.MINI_HEART"], c: 2 },
        { q: "¿Qué pasa si escribes Display.Scroll con D mayúscula?", a: ["Funciona igual", "Python lo corrige", "Da error de sintaxis", "Depende del navegador"], c: 2 },
        { q: "¿Cuál es el propósito de while True:?", a: ["Ejecutar una vez", "Bucle infinito", "Comparar valores", "Detener el código"], c: 1 },
        { q: "¿Qué herramienta online se recomienda para programar Micro:bit en Python?", a: ["MakeCode", "python.microbit.org", "Arduino IDE", "VS Code"], c: 1 }
    ],
    guia3: [
        { q: "¿Qué es un Dataset?", a: ["Un tipo de cable", "Conjunto de datos históricos", "Un motor de búsqueda", "Una marca de IA"], c: 1 },
        { q: "¿En qué dos partes se divide generalmente un dataset?", a: ["Inicio y Fin", "Hardware y Software", "Entrenamiento y Prueba", "Input y Output"], c: 2 },
        { q: "¿Qué porcentaje del dataset se recomienda usualmente para entrenamiento?", a: ["10%", "50%", "80%", "100%"], c: 2 },
        { q: "¿Qué es el Overfitting (Sobreajuste)?", a: ["IA que no sabe nada", "IA que memoriza en lugar de aprender", "IA muy rápida", "IA que usa mucha energía"], c: 1 },
        { q: "¿Qué mide la Precisión?", a: ["La velocidad", "Qué tan cerca está la IA de la verdad", "El peso de los datos", "La memoria usada"], c: 1 },
        { q: "¿Qué define la Tasa de Aprendizaje (Learning Rate)?", a: ["El precio de la IA", "Qué tan rápido ajusta los parámetros", "La edad de la IA", "El número de usuarios"], c: 1 },
        { q: "¿Qué es una Época (Epoch)?", a: ["Un año de IA", "Una vuelta completa al dataset", "Una falla del sistema", "Un tipo de algoritmo"], c: 1 },
        { q: "¿Para qué sirve la Función de Pérdida (Loss Function)?", a: ["Para borrar datos", "Para medir el error del modelo", "Para ahorrar energía", "Para aumentar la velocidad"], c: 1 },
        { q: "¿Qué ventaja tiene el entrenamiento en la nube?", a: ["Es más barato", "Usa IA satelital", "Mayor potencia de procesamiento", "No necesita internet"], c: 2 },
        { q: "¿Qué es la Sensibilidad (Recall)?", a: ["Capacidad de encontrar todos los casos reales positivos", "Qué tan amable es la IA", "La resolución de pantalla", "El volumen del sonido"], c: 0 }
    ]
};

function initQuizzes() {
    document.querySelectorAll('.btn-start-quiz').forEach(btn => {
        btn.addEventListener('click', () => {
            const quizId = btn.dataset.quiz;
            startQuiz(quizId);
        });
    });
}

function startQuiz(id) {
    const quizData = quizzes[id];
    let currentIdx = 0;
    let score = 0;

    const quizWrapper = document.querySelector(`.quiz-container[data-id="${id}"]`);
    const questionArea = quizWrapper.querySelector('.question-area');
    
    function renderQuestion() {
        const q = quizData[currentIdx];
        questionArea.innerHTML = `
            <div class="question-card active">
                <p class="question-text">${currentIdx + 1}. ${q.q}</p>
                <div class="options-grid">
                    ${q.a.map((opt, i) => `
                        <div class="option-item" data-idx="${i}">
                            <i class="ph ph-circle"></i>
                            <span>${opt}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;

        const options = questionArea.querySelectorAll('.option-item');
        options.forEach(opt => {
            opt.addEventListener('click', () => {
                const selected = parseInt(opt.dataset.idx);
                if (selected === q.c) {
                    opt.classList.add('correct');
                    opt.querySelector('i').className = 'ph-bold ph-check-circle';
                    score++;
                } else {
                    opt.classList.add('wrong');
                    opt.querySelector('i').className = 'ph-bold ph-x-circle';
                    options[q.c].classList.add('correct');
                    options[q.c].querySelector('i').className = 'ph-bold ph-check-circle';
                }
                
                // Disable all options
                options.forEach(o => o.style.pointerEvents = 'none');

                setTimeout(() => {
                    currentIdx++;
                    if (currentIdx < quizData.length) {
                        renderQuestion();
                        updateProgress();
                    } else {
                        showResults();
                    }
                }, 1500);
            });
        });
    }

    function updateProgress() {
        const progress = quizWrapper.querySelector('.quiz-progress-fill');
        const text = quizWrapper.querySelector('.quiz-progress-text');
        const percent = (currentIdx / quizData.length) * 100;
        if(progress) progress.style.width = `${percent}%`;
        if(text) text.innerText = `Pregunta ${currentIdx + 1} de ${quizData.length}`;
    }

    function showResults() {
        const percent = (score / quizData.length) * 100;
        questionArea.innerHTML = `
            <div class="quiz-results" style="text-align:center; padding: 2rem;">
                <i class="ph-bold ph-trophy" style="font-size: 4rem; color: var(--color-accent-orange); margin-bottom: 1rem; display: block;"></i>
                <h2>¡Quiz Completado!</h2>
                <p style="font-size: 1.5rem; margin: 1rem 0;">Tu puntaje: <strong>${score} / ${quizData.length}</strong> (${percent}%)</p>
                <p>${percent >= 70 ? '¡Excelente trabajo! Has dominado este tema.' : 'Sigue practicando, ¡tú puedes mejorar!'}</p>
                <button class="btn btn--primary" style="margin-top: 2rem;" onclick="location.reload()">Finalizar</button>
            </div>
        `;
        
        // Update global progress if needed
        if (typeof updateGlobalProgress === 'function') {
             // Logic to mark quiz as completed
        }
    }

    // Hide start screen and show quiz area
    quizWrapper.querySelector('.quiz-start-screen').style.display = 'none';
    quizWrapper.querySelector('.quiz-active-screen').style.display = 'block';
    renderQuestion();
    updateProgress();
}
