'use client'
import { useState, useEffect } from 'react'

interface DeviceInfo {
  isMobile: boolean
  isTablet: boolean
  isDesktop: boolean
  isTouchDevice: boolean
  screenWidth: number
  screenHeight: number
  deviceType: 'mobile' | 'tablet' | 'desktop'
}

export function useDeviceDetection(): DeviceInfo {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    isTouchDevice: false,
    screenWidth: 1920,
    screenHeight: 1080,
    deviceType: 'desktop',
  })

  useEffect(() => {
    const detectDevice = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      
      // Detect touch capability
      const isTouchDevice = 
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        // @ts-ignore
        navigator.msMaxTouchPoints > 0

      // Screen size breakpoints
      const isMobile = width < 768
      const isTablet = width >= 768 && width < 1024
      const isDesktop = width >= 1024

      // User agent detection (backup method)
      const userAgent = navigator.userAgent.toLowerCase()
      const isMobileUA = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent)
      const isTabletUA = /ipad|android(?!.*mobile)/i.test(userAgent)

      // Combine methods for better accuracy
      const finalIsMobile = isMobile || (isMobileUA && width < 768)
      const finalIsTablet = (isTablet || isTabletUA) && !finalIsMobile
      const finalIsDesktop = isDesktop && !finalIsMobile && !finalIsTablet

      // Determine device type
      let deviceType: 'mobile' | 'tablet' | 'desktop' = 'desktop'
      if (finalIsMobile) deviceType = 'mobile'
      else if (finalIsTablet) deviceType = 'tablet'

      setDeviceInfo({
        isMobile: finalIsMobile,
        isTablet: finalIsTablet,
        isDesktop: finalIsDesktop,
        isTouchDevice,
        screenWidth: width,
        screenHeight: height,
        deviceType,
      })
    }

    // Initial detection
    detectDevice()

    // Re-detect on window resize (for orientation changes, responsive testing)
    let timeoutId: NodeJS.Timeout
    const handleResize = () => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(detectDevice, 150) // Debounce
    }

    window.addEventListener('resize', handleResize)
    
    // Also detect on orientation change
    window.addEventListener('orientationchange', detectDevice)

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('orientationchange', detectDevice)
      clearTimeout(timeoutId)
    }
  }, [])

  return deviceInfo
}
