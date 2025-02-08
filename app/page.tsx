"use client"

import { useState, useEffect, useRef, Suspense } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useAnimation, useScroll, useTransform } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, useTexture, Sphere } from "@react-three/drei"
import type * as THREE from "three"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Line, Pie, Doughnut } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement)

const temperatureData = {
  labels: ["1880", "1900", "1920", "1940", "1960", "1980", "2000", "2020"],
  datasets: [
    {
      label: "Global Temperature Anomaly (°C)",
      data: [-0.16, -0.08, -0.27, 0.12, 0.03, 0.26, 0.4, 0.98],
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
  ],
}

const emissionsData = {
  labels: ["Carbon Dioxide", "Methane", "Nitrous Oxide", "F-gases"],
  datasets: [
    {
      data: [76, 16, 6, 2],
      backgroundColor: [
        "rgba(255, 99, 132, 0.8)",
        "rgba(54, 162, 235, 0.8)",
        "rgba(255, 206, 86, 0.8)",
        "rgba(75, 192, 192, 0.8)",
      ],
      borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)", "rgba(255, 206, 86, 1)", "rgba(75, 192, 192, 1)"],
      borderWidth: 1,
    },
  ],
}

const ImpactData = {
  labels: ["Renewable Energy", "Reforestation", "Sustainable Agriculture", "Green Transportation"],
  datasets: [
    {
      data: [30, 25, 20, 25],
      backgroundColor: [
        "rgba(255, 99, 132, 0.8)",
        "rgba(75, 192, 192, 0.8)",
        "rgba(255, 206, 86, 0.8)",
        "rgba(54, 162, 235, 0.8)",
      ],
      borderColor: ["rgba(255, 99, 132, 1)", "rgba(75, 192, 192, 1)", "rgba(255, 206, 86, 1)", "rgba(54, 162, 235, 1)"],
      borderWidth: 1,
    },
  ],
}

function EarthGlobe() {
  const meshRef = useRef<THREE.Mesh>(null)
  const [colorMap] = useTexture(["/placeholder.svg?height=1024&width=2048"])

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002
    }
  })

  return (
    <Sphere args={[1, 32, 32]} ref={meshRef}>
      <meshStandardMaterial map={colorMap} />
    </Sphere>
  )
}

function AnimatedCounter({ value, duration = 2 }: { value: number; duration?: number }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let start = 0
    const end = value
    const totalMilSecDur = duration * 1000
    let timer: NodeJS.Timeout

    const animateCounter = (timestamp: number) => {
      const progress = Math.min((timestamp - start) / totalMilSecDur, 1)
      setCount(Math.floor(progress * end))

      if (progress < 1) {
        timer = setTimeout(() => requestAnimationFrame(animateCounter), 1000 / 60)
      }
    }

    requestAnimationFrame((timestamp) => {
      start = timestamp
      animateCounter(timestamp)
    })

    return () => clearTimeout(timer)
  }, [value, duration])

  return <span>{count}</span>
}

export default function Home() {
  const controls = useAnimation()
  const [ref, inView] = useInView()
  const { scrollYProgress } = useScroll()
  const yPosAnim = useTransform(scrollYProgress, [0, 0.2, 1], [0, -50, -150])

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [controls, inView])

  return (
    <div className="relative">
      <section className="relative h-screen flex items-center justify-center text-center text-white overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1611273426858-450e7f08d904?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
          alt="Melting iceberg representing climate change"
          layout="fill"
          objectFit="cover"
          quality={100}
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <motion.div
          className="relative z-10 max-w-4xl mx-auto px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-5xl sm:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
            Climate Action Hub
          </h1>
          <p className="text-xl sm:text-2xl mb-8 max-w-2xl mx-auto">
            Empowering individuals and communities to take urgent action against climate change.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg" className="bg-green-500 hover:bg-green-600">
              <Link href="/about">Learn More</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="text-white border-white hover:bg-white hover:text-green-600"
            >
              <Link href="/contact">Get Involved</Link>
            </Button>
          </div>
        </motion.div>
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
        >
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </motion.div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-semibold mb-12 text-center">Climate Crisis at a Glance</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Global Temperature Rise</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video">
                  <Line
                    data={temperatureData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: {
                          position: "top" as const,
                        },
                        title: {
                          display: true,
                          text: "Global Temperature Anomaly (1880-2020)",
                        },
                      },
                    }}
                  />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Greenhouse Gas Emissions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-square max-w-md mx-auto">
                  <Pie
                    data={emissionsData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: {
                          position: "top" as const,
                        },
                        title: {
                          display: true,
                          text: "Global Greenhouse Gas Emissions by Type",
                        },
                      },
                    }}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-semibold mb-12 text-center">Our Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="aspect-square max-w-md mx-auto">
              <Doughnut
                data={ImpactData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: "bottom" as const,
                    },
                    title: {
                      display: true,
                      text: "Areas of Impact",
                    },
                  },
                }}
              />
            </div>
            <div>
              <motion.div
                ref={ref}
                initial="hidden"
                animate={controls}
                variants={{
                  visible: { opacity: 1, y: 0 },
                  hidden: { opacity: 0, y: 20 },
                }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Card className="mb-4">
                  <CardHeader>
                    <CardTitle className="text-4xl font-bold text-green-600">
                      <AnimatedCounter value={1000} /> +
                    </CardTitle>
                    <CardDescription>Trees Planted</CardDescription>
                  </CardHeader>
                </Card>
                <Card className="mb-4">
                  <CardHeader>
                    <CardTitle className="text-4xl font-bold text-blue-600">
                      <AnimatedCounter value={500} /> kW
                    </CardTitle>
                    <CardDescription>Solar Power Installed</CardDescription>
                  </CardHeader>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-4xl font-bold text-yellow-600">
                      <AnimatedCounter value={10000} /> +
                    </CardTitle>
                    <CardDescription>Students Educated</CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-green-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-semibold mb-12 text-center">Interactive Earth Model</h2>
          <div className="aspect-square max-w-2xl mx-auto">
            <Canvas camera={{ position: [0, 0, 2.5], fov: 45 }}>
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} />
              <Suspense fallback={null}>
                <EarthGlobe />
              </Suspense>
              <OrbitControls
                enableZoom={false}
                enablePan={false}
                rotateSpeed={0.5}
                minPolarAngle={Math.PI / 2}
                maxPolarAngle={Math.PI / 2}
              />
            </Canvas>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-semibold mb-12 text-center">Founder's Message</h2>
          <Card className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900 dark:to-blue-900">
            <CardHeader>
              <div className="flex items-center gap-4">
                <Image
                  src="/placeholder.svg?height=100&width=100"
                  alt="Dr. Emily Green"
                  width={100}
                  height={100}
                  className="rounded-full"
                />
                <div>
                  <CardTitle>Dr. Emily Green</CardTitle>
                  <CardDescription>Founder & Executive Director</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="italic">
                "Climate change is the defining issue of our time. At Climate Action Hub, we believe that by working
                together, we can create a sustainable future for generations to come. Our mission is to empower
                individuals and communities with the knowledge and tools they need to make a real difference. Join us in
                this crucial fight against climate change – every action counts!"
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}

