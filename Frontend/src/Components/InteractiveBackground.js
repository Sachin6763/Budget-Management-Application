import React, { useEffect } from "react";
import Matter from "matter-js";
import "../Css/InteractiveBackground.css";

const InteractiveBackground = () => {
  useEffect(() => {
    const engine = Matter.Engine.create();
    const render = Matter.Render.create({
      element: document.body,
      engine: engine,
      options: {
        width: window.innerWidth,
        height: window.innerHeight,
        wireframes: false,
        background: "transparent",
      },
    });

    const world = engine.world;
    const particles = [];

    for (let i = 0; i < 100; i++) {
      const particle = Matter.Bodies.circle(
        Matter.Common.random(0, window.innerWidth),
        Matter.Common.random(0, window.innerHeight),
        Matter.Common.random(5, 15),
        {
          frictionAir: 0.05,
          density: 0.0005,
          restitution: 0.8,
          render: {
            fillStyle: "#4e73df",
          },
        }
      );
      particles.push(particle);
    }

    Matter.World.add(world, particles);

    Matter.Engine.run(engine);
    Matter.Render.run(render);

    return () => {
      Matter.Render.stop(render);
      Matter.Engine.clear(engine);
    };
  }, []);
};

export default InteractiveBackground;
