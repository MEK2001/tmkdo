'use client'
import { useState, useEffect } from 'react'

interface PerformanceInfo {
  canHandle3D: boolean
  preferReducedMotion: boolean
  deviceMemory: number | null
  hardwareConcurrency: number
  connectionSpeed: 'slow' | 'medium' | 'fast'
}

export function usePerformanceDetection(): PerformanceInfo {
  const [performanceInfo, setPerformanceInfo] = useState<PerformanceInfo>({
    canHandle3D: true,
    preferReducedMotion: false,
    deviceMemory: null,
    hardwareConcurrency: 4,
    connectionSpeed: 'fast',
  })

  useEffect(() => {
    // Check for reduced motion preference (accessibility)
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // Get device memory (if available)
    // @ts-ignore
    const deviceMemory = navigator.deviceMemory || null

    // Get CPU cores
    const hardwareConcurrency = navigator.hardwareConcurrency || 4

    // Check connection speed
    // @ts-ignore
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection
    let connectionSpeed: 'slow' | 'medium' | 'fast' = 'fast'
    
    if (connection) {
      const effectiveType = connection.effectiveType
      if (effectiveType === 'slow-2g' || effectiveType === '2g') {
        connectionSpeed = 'slow'
      } else if (effectiveType === '3g') {
        connectionSpeed = 'medium'
      }
    }

    // Determine if device can handle 3D
    // Low-end devices: < 4GB RAM, < 4 CPU cores, or slow connection
    const canHandle3D = 
      !prefersReducedMotion &&
      (deviceMemory === null || deviceMemory >= 4) &&
      hardwareConcurrency >= 4 &&
      connectionSpeed !== 'slow'

    setPerformanceInfo({
      canHandle3D,
      preferReducedMotion: prefersReducedMotion,
      deviceMemory,
      hardwareConcurrency,
      connectionSpeed,
    })
  }, [])

  return performanceInfo
}
