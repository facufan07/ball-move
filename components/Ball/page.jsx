"use client"
import { useEffect, useRef, useState } from "react";
import "./style.scss";

export default function Ball(){
    const [position, setPosition] = useState({x: 0, y: 0});
    const [isDragging, setIsDragging] = useState(false);
    const offset = useRef({x: 0, y: 0})

    useEffect(() => {
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp)

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        }
    }, [isDragging])

    function handleMouseDown(e){
        setIsDragging(true);

        offset.current = {
            x:e.clientX - position.x,
            y:e.clientY - position.y       
        }
    }

    function handleMouseUp(){
        setIsDragging(false);
    }

    function handleMouseMove(e){
        if (isDragging){
            setPosition({
                x: e.clientX - offset.current.x,
                y: e.clientY - offset.current.y
            })
        }
    }

    return(
        <div 
        className="ball"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        style={{
            position:"absolute",
            transform: `translate(${position.x}px, ${position.y}px)`,
            cursor: isDragging ? "grabbing" : "grab",
            transition: isDragging ? "none" : "transform 10s ease"
        }}
        ></div>
    )
}