import { useCallback, useEffect, useRef, useState } from "react";
import ReactCanvasConfetti from "react-canvas-confetti";

function getAnimationSettings(angle: number, originX: number) {
    return {
        particleCount: 4,
        angle,
        spread: 90,
        origin: { x: originX },
        colors: ["#d27800", "#f5a623", "#f8c471", "#ffffff", "#8cbe3f "],
    };
}

export const Confetti = ({ show, setShow }: { show: boolean, setShow: (state: boolean) => void }) => {
    const refAnimationInstance = useRef<confetti.CreateTypes | null>();
    const [intervalId, setIntervalId] = useState<any>();
    const getInstance = useCallback((instance: confetti.CreateTypes | null) => {
        refAnimationInstance.current = instance;
    }, []);

    const nextTickAnimation = useCallback(() => {
        if (refAnimationInstance.current) {
            refAnimationInstance.current(getAnimationSettings(60, 0));
            refAnimationInstance.current(getAnimationSettings(120, 1));
        }
    }, []);

    const startAnimation = useCallback(() => {
        if (!intervalId) {
            setIntervalId(setInterval(nextTickAnimation, 16));
        }
    }, [nextTickAnimation, intervalId]);

    useEffect(() => {
        return () => {
            clearInterval(intervalId);
        };
    }, [intervalId]);


    const pauseAnimation = useCallback(() => {
        clearInterval(intervalId);
        setIntervalId(null);
        setShow(false);
    }, [intervalId]);

    useEffect(() => {
        if (intervalId) {
            setTimeout(() => {
                pauseAnimation();
            }, 5000);
        }
    }, [intervalId]);

    return <ReactCanvasConfetti
        refConfetti={getInstance}
        style={{
            position: "fixed",
            pointerEvents: "none",
            width: "100%",
            height: "100%",
            top: 0,
            left: 0,
            zIndex: 100,
        }}
    />
}