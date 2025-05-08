"use client"

import { useCallback } from "react"
import { loadFull } from "tsparticles"
import Particles from "react-tsparticles"

const ParticleBackground = ({ variant = "default" }) => {
  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine)
  }, [])

  // Different particle configurations
  const getConfig = () => {
    switch (variant) {
      case "login":
        return loginConfig
      case "register":
        return registerConfig
      case "dashboard":
        return dashboardConfig
      default:
        return defaultConfig
    }
  }

  // Default configuration - floating bubbles with light blue theme
  const defaultConfig = {
    fullScreen: false,
    background: {
      color: {
        value: "transparent",
      },
    },
    fpsLimit: 120,
    particles: {
      number: {
        value: 50,
        density: {
          enable: true,
          value_area: 800,
        },
      },
      color: {
        value: ["#0ea5e9", "#7dd3fc", "#bae6fd"],
      },
      shape: {
        type: ["circle", "triangle"],
      },
      opacity: {
        value: 0.5,
        random: true,
      },
      size: {
        value: 5,
        random: true,
      },
      move: {
        enable: true,
        speed: 2,
        direction: "none",
        random: true,
        straight: false,
        outModes: {
          default: "bounce",
        },
        attract: {
          enable: false,
          rotateX: 600,
          rotateY: 1200,
        },
      },
    },
    interactivity: {
      detectsOn: "canvas",
      events: {
        onHover: {
          enable: true,
          mode: "bubble",
        },
        onClick: {
          enable: true,
          mode: "push",
        },
        resize: true,
      },
      modes: {
        grab: {
          distance: 400,
          links: {
            opacity: 1,
          },
        },
        bubble: {
          distance: 200,
          size: 15,
          duration: 2,
          opacity: 0.8,
        },
        repulse: {
          distance: 200,
          duration: 0.4,
        },
        push: {
          quantity: 4,
        },
        remove: {
          quantity: 2,
        },
      },
    },
    detectRetina: true,
  }

  // Login configuration - flowing waves
  const loginConfig = {
    fullScreen: false,
    background: {
      color: {
        value: "transparent",
      },
    },
    fpsLimit: 120,
    particles: {
      number: {
        value: 80,
        density: {
          enable: true,
          value_area: 800,
        },
      },
      color: {
        value: ["#0ea5e9", "#7dd3fc", "#38bdf8"],
      },
      shape: {
        type: "circle",
      },
      opacity: {
        value: 0.5,
        random: true,
      },
      size: {
        value: 3,
        random: true,
      },
      links: {
        enable: true,
        distance: 150,
        color: "#0ea5e9",
        opacity: 0.2,
        width: 1,
      },
      move: {
        enable: true,
        speed: 2,
        direction: "none",
        random: false,
        straight: false,
        outModes: {
          default: "out",
        },
        attract: {
          enable: false,
          rotateX: 600,
          rotateY: 1200,
        },
      },
    },
    interactivity: {
      detectsOn: "canvas",
      events: {
        onHover: {
          enable: true,
          mode: "grab",
        },
        onClick: {
          enable: true,
          mode: "push",
        },
        resize: true,
      },
      modes: {
        grab: {
          distance: 140,
          links: {
            opacity: 1,
          },
        },
        bubble: {
          distance: 400,
          size: 40,
          duration: 2,
          opacity: 8,
        },
        repulse: {
          distance: 200,
          duration: 0.4,
        },
        push: {
          quantity: 4,
        },
        remove: {
          quantity: 2,
        },
      },
    },
    detectRetina: true,
  }

  // Register configuration - floating polygons
  const registerConfig = {
    fullScreen: false,
    background: {
      color: {
        value: "transparent",
      },
    },
    fpsLimit: 120,
    particles: {
      number: {
        value: 30,
        density: {
          enable: true,
          value_area: 800,
        },
      },
      color: {
        value: ["#0ea5e9", "#0284c7", "#7dd3fc", "#bae6fd"],
      },
      shape: {
        type: ["polygon", "circle"],
        polygon: {
          sides: 5,
        },
      },
      opacity: {
        value: 0.3,
        random: true,
      },
      size: {
        value: 10,
        random: true,
      },
      links: {
        enable: true,
        distance: 150,
        color: "#0ea5e9",
        opacity: 0.2,
        width: 1,
      },
      move: {
        enable: true,
        speed: 1.5,
        direction: "none",
        random: true,
        straight: false,
        outModes: {
          default: "out",
        },
        attract: {
          enable: true,
          rotateX: 600,
          rotateY: 1200,
        },
      },
      rotate: {
        value: 0,
        random: true,
        direction: "clockwise",
        animation: {
          enable: true,
          speed: 5,
          sync: false,
        },
      },
    },
    interactivity: {
      detectsOn: "canvas",
      events: {
        onHover: {
          enable: true,
          mode: "repulse",
        },
        onClick: {
          enable: true,
          mode: "push",
        },
        resize: true,
      },
      modes: {
        grab: {
          distance: 400,
          links: {
            opacity: 1,
          },
        },
        bubble: {
          distance: 400,
          size: 40,
          duration: 2,
          opacity: 8,
        },
        repulse: {
          distance: 100,
          duration: 0.4,
        },
        push: {
          quantity: 4,
        },
        remove: {
          quantity: 2,
        },
      },
    },
    detectRetina: true,
  }

  // Dashboard configuration - subtle dots
  const dashboardConfig = {
    fullScreen: false,
    background: {
      color: {
        value: "transparent",
      },
    },
    fpsLimit: 120,
    particles: {
      number: {
        value: 80,
        density: {
          enable: true,
          value_area: 800,
        },
      },
      color: {
        value: ["#0ea5e9", "#7dd3fc", "#bae6fd"],
      },
      shape: {
        type: "circle",
      },
      opacity: {
        value: 0.2,
        random: true,
      },
      size: {
        value: 3,
        random: true,
      },
      links: {
        enable: true,
        distance: 150,
        color: "#0ea5e9",
        opacity: 0.1,
        width: 1,
      },
      move: {
        enable: true,
        speed: 0.8,
        direction: "none",
        random: true,
        straight: false,
        outModes: {
          default: "out",
        },
        attract: {
          enable: false,
          rotateX: 600,
          rotateY: 1200,
        },
      },
    },
    interactivity: {
      detectsOn: "canvas",
      events: {
        onHover: {
          enable: true,
          mode: "bubble",
        },
        onClick: {
          enable: true,
          mode: "push",
        },
        resize: true,
      },
      modes: {
        grab: {
          distance: 400,
          links: {
            opacity: 1,
          },
        },
        bubble: {
          distance: 100,
          size: 5,
          duration: 2,
          opacity: 0.3,
        },
        repulse: {
          distance: 200,
          duration: 0.4,
        },
        push: {
          quantity: 4,
        },
        remove: {
          quantity: 2,
        },
      },
    },
    detectRetina: true,
  }

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={getConfig()}
      className="absolute inset-0 z-0"
      style={{ position: "absolute", width: "100%", height: "100%" }}
    />
  )
}

export default ParticleBackground
