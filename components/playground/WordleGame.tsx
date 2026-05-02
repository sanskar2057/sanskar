"use client";

import React, { useEffect, useMemo, useState } from "react";
import { RotateCcw } from "lucide-react";
import { wordleWords } from "./wordleWords";

const ROWS = 6;
const COLS = 5;

type TileStatus = "empty" | "correct" | "present" | "absent";

const createEmptyGrid = () =>
    Array.from({ length: ROWS }, () => Array.from({ length: COLS }, () => ""));

const createEmptyStatuses = () =>
    Array.from({ length: ROWS }, () =>
        Array.from({ length: COLS }, () => "empty" as TileStatus)
    );

export default function WordleGame() {
    const [secret, setSecret] = useState("");
    const [grid, setGrid] = useState(createEmptyGrid);
    const [statuses, setStatuses] = useState(createEmptyStatuses);
    const [currentRow, setCurrentRow] = useState(0);
    const [currentCol, setCurrentCol] = useState(0);
    const [message, setMessage] = useState("Guess the 5-letter tech word.");
    const [gameOver, setGameOver] = useState(false);

    const dictionary = useMemo(() => wordleWords, []);

    const resetGame = () => {
        const nextSecret = dictionary[Math.floor(Math.random() * dictionary.length)];

        setSecret(nextSecret);
        setGrid(createEmptyGrid());
        setStatuses(createEmptyStatuses());
        setCurrentRow(0);
        setCurrentCol(0);
        setMessage("Guess the 5-letter tech word.");
        setGameOver(false);
    };

    useEffect(() => {
        resetGame();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getCurrentWord = () => grid[currentRow].join("").toLowerCase();

    const addLetter = (letter: string) => {
        if (gameOver || currentCol >= COLS || currentRow >= ROWS) return;

        setGrid((prev) => {
            const next = prev.map((row) => [...row]);
            next[currentRow][currentCol] = letter.toLowerCase();
            return next;
        });

        setCurrentCol((prev) => prev + 1);
    };

    const removeLetter = () => {
        if (gameOver || currentCol === 0) return;

        setGrid((prev) => {
            const next = prev.map((row) => [...row]);
            next[currentRow][currentCol - 1] = "";
            return next;
        });

        setCurrentCol((prev) => prev - 1);
    };

    const evaluateGuess = (guess: string): TileStatus[] => {
        const result: TileStatus[] = Array(COLS).fill("absent");
        const secretLetters = secret.split("");
        const used = Array(COLS).fill(false);

        for (let i = 0; i < COLS; i++) {
            if (guess[i] === secretLetters[i]) {
                result[i] = "correct";
                used[i] = true;
            }
        }

        for (let i = 0; i < COLS; i++) {
            if (result[i] === "correct") continue;

            const foundIndex = secretLetters.findIndex(
                (letter, index) => letter === guess[i] && !used[index]
            );

            if (foundIndex !== -1) {
                result[i] = "present";
                used[foundIndex] = true;
            }
        }

        return result;
    };

    const submitGuess = () => {
        if (gameOver) return;

        if (currentCol !== COLS) {
            setMessage("Complete the word first.");
            return;
        }

        const guess = getCurrentWord();

        if (!dictionary.includes(guess)) {
            setMessage("Not in the word list.");
            return;
        }

        const result = evaluateGuess(guess);

        setStatuses((prev) => {
            const next = prev.map((row) => [...row]);
            next[currentRow] = result;
            return next;
        });

        if (guess === secret) {
            setMessage("Great job! You solved it.");
            setGameOver(true);
            return;
        }

        if (currentRow === ROWS - 1) {
            setMessage(`Game over. The word was ${secret.toUpperCase()}.`);
            setGameOver(true);
            return;
        }

        setCurrentRow((prev) => prev + 1);
        setCurrentCol(0);
        setMessage("Keep going.");
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Enter") {
                submitGuess();
                return;
            }

            if (e.key === "Backspace") {
                removeLetter();
                return;
            }

            if (/^[a-zA-Z]$/.test(e.key)) {
                addLetter(e.key);
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    });

    const keyboardRows = ["qwertyuiop", "asdfghjkl", "zxcvbnm"];

    const getKeyboardStatus = (letter: string): TileStatus => {
        let bestStatus: TileStatus = "empty";

        for (let row = 0; row < ROWS; row++) {
            for (let col = 0; col < COLS; col++) {
                if (grid[row][col] !== letter) continue;

                const status = statuses[row][col];

                if (status === "correct") return "correct";
                if (status === "present") bestStatus = "present";
                if (status === "absent" && bestStatus === "empty") bestStatus = "absent";
            }
        }

        return bestStatus;
    };

    const getKeyboardClass = (status: TileStatus) => {
        switch (status) {
            case "correct":
                return "bg-[#538d4e] border-[#538d4e] text-white";
            case "present":
                return "bg-[#b59f3b] border-[#b59f3b] text-white";
            case "absent":
                return "bg-[#3a3a3c] border-[#3a3a3c] text-white";
            default:
                return "bg-white/10 border-white/10 text-white hover:bg-[#C778DD]/30";
        }
    };

    const getTileClass = (status: TileStatus) => {
        switch (status) {
            case "correct":
                return "bg-[#538d4e] border-[#538d4e]";
            case "present":
                return "bg-[#b59f3b] border-[#b59f3b]";
            case "absent":
                return "bg-[#3a3a3c] border-[#3a3a3c]";
            default:
                return "bg-transparent border-[#3a3a3c]";
        }
    };

    return (
        <div className="text-center">
            <div className="flex items-center justify-between gap-4 mb-5 pr-10">
                <div className="text-left">
                    <h3 className="text-2xl font-bold">
                        <span className="text-[#C778DD]">#</span>wordle
                    </h3>
                    <p className="text-[#ABB2BF] text-xs sm:text-sm mt-1">{message}</p>
                </div>

                <button
                    onClick={resetGame}
                    className="w-10 h-10 rounded-xl bg-[#C778DD]/20 hover:bg-[#C778DD]/35 flex items-center justify-center transition-colors"
                    aria-label="Restart game"
                >
                    <RotateCcw className="w-5 h-5 text-[#C778DD]" />
                </button>
            </div>

            <div className="grid grid-rows-6 gap-2 place-items-center mb-6">
                {grid.map((row, rowIndex) => (
                    <div key={rowIndex} className="grid grid-cols-5 gap-2">
                        {row.map((letter, colIndex) => {
                            const status = statuses[rowIndex][colIndex];

                            return (
                                <div
                                    key={`${rowIndex}-${colIndex}`}
                                    className={`w-12 h-12 sm:w-14 sm:h-14 border-2 rounded-md grid place-items-center text-xl sm:text-2xl font-bold uppercase transition-all duration-500 ${getTileClass(status)
                                        } ${status !== "empty" ? "animate-[flip_0.45s_ease]" : ""
                                        }`}
                                    style={{ animationDelay: `${colIndex * 80}ms` }}
                                >
                                    {letter}
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>

            <div className="space-y-2">
                {keyboardRows.map((row) => (
                    <div key={row} className="flex justify-center gap-1 sm:gap-2">
                        {row.split("").map((key) => {
                            const keyStatus = getKeyboardStatus(key);

                            return (
                                <button
                                    key={key}
                                    onClick={() => addLetter(key)}
                                    disabled={gameOver}
                                    className={`h-11 min-w-8 sm:h-12 sm:min-w-11 rounded-lg border text-sm sm:text-base font-bold uppercase transition-all duration-300 disabled:opacity-60 ${getKeyboardClass(
                                        keyStatus
                                    )}`}
                                >
                                    {key}
                                </button>
                            );
                        })}
                    </div>
                ))}

                <div className="flex justify-center gap-2 pt-1">
                    <button
                        onClick={removeLetter}
                        disabled={gameOver}
                        className="h-9 px-4 rounded-md bg-white/10 hover:bg-[#C778DD]/30 text-white text-xs sm:text-sm transition-colors disabled:opacity-50"
                    >
                        Delete
                    </button>
                    <button
                        onClick={submitGuess}
                        disabled={gameOver}
                        className="h-9 px-4 rounded-md bg-[#C778DD] hover:bg-[#E0B7FF] text-white text-xs sm:text-sm transition-colors disabled:opacity-50"
                    >
                        Enter
                    </button>
                </div>
            </div>
        </div>
    );
}