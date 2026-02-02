'use client'
import { useDeviceDetection } from '@/hooks/useDeviceDetection'
import { usePerformanceDetection } from '@/hooks/usePerformanceDetection'
import styles from './DeviceDebugger.module.css'

export default function DeviceDebugger() {
  const device = useDeviceDetection()
  const performance = usePerformanceDetection()

  // Only show in development
  if (process.env.NODE_ENV !== 'development') return null

  return (
    <div className={styles.debugger}>
      <h3>🔍 Device Detection Debug</h3>
      <div className={styles.info}>
        <p><strong>Device Type:</strong> {device.deviceType}</p>
        <p><strong>Screen:</strong> {device.screenWidth} x {device.screenHeight}</p>
        <p><strong>Touch:</strong> {device.isTouchDevice ? 'Yes' : 'No'}</p>
        <p><strong>Mobile:</strong> {device.isMobile ? 'Yes' : 'No'}</p>
        <p><strong>Tablet:</strong> {device.isTablet ? 'Yes' : 'No'}</p>
        <p><strong>Desktop:</strong> {device.isDesktop ? 'Yes' : 'No'}</p>
        <hr />
        <p><strong>Can Handle 3D:</strong> {performance.canHandle3D ? 'Yes' : 'No'}</p>
        <p><strong>CPU Cores:</strong> {performance.hardwareConcurrency}</p>
        <p><strong>RAM:</strong> {performance.deviceMemory || 'Unknown'} GB</p>
        <p><strong>Connection:</strong> {performance.connectionSpeed}</p>
        <p><strong>Reduced Motion:</strong> {performance.preferReducedMotion ? 'Yes' : 'No'}</p>
      </div>
    </div>
  )
}
