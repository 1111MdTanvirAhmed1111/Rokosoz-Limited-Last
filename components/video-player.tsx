"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Play, Pause, Volume2, VolumeX, ArrowLeft } from "lucide-react"

interface VideoPlayerProps {
  videoUrl: string
  title: string
  onClose: () => void
}

export default function VideoPlayer({ videoUrl, title, onClose }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime)
      const currentProgress = (video.currentTime / video.duration) * 100
      setProgress(currentProgress)
    }

    const handleVideoEnd = () => {
      setIsPlaying(false)
    }

    const handleLoadedMetadata = () => {
      setDuration(video.duration)
    }

    video.addEventListener("timeupdate", handleTimeUpdate)
    video.addEventListener("ended", handleVideoEnd)
    video.addEventListener("loadedmetadata", handleLoadedMetadata)

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate)
      video.removeEventListener("ended", handleVideoEnd)
      video.removeEventListener("loadedmetadata", handleLoadedMetadata)
    }
  }, [])

  const togglePlay = () => {
    const video = videoRef.current
    if (!video) return

    if (isPlaying) {
      video.pause()
    } else {
      video.play()
    }
    setIsPlaying(!isPlaying)
  }

  const toggleMute = () => {
    const video = videoRef.current
    if (!video) return

    video.muted = !video.muted
    setIsMuted(!isMuted)
  }

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const video = videoRef.current
    if (!video) return

    const progressBar = e.currentTarget
    const rect = progressBar.getBoundingClientRect()
    const clickPosition = (e.clientX - rect.left) / rect.width

    video.currentTime = clickPosition * video.duration
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      <div className="relative w-full h-full">
        {/* Video */}
        <div className="absolute inset-0">
          <video ref={videoRef} src={videoUrl} className="w-full h-full object-contain" autoPlay onClick={togglePlay}>
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Back button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-20 flex items-center"
          aria-label="Back"
        >
          <ArrowLeft size={20} className="mr-2" />
          <span className="text-sm uppercase tracking-wider">BACK</span>
        </button>

        {/* Video title */}
        <div className="absolute bottom-16 left-6 flex items-center z-20">
          <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
          <h3 className="text-white text-sm uppercase tracking-wider">{title}</h3>
        </div>

        {/* Video Controls */}
        <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-4 z-20">
          {/* Progress Bar */}
          <div className="w-full h-1 bg-white/30 mb-4 cursor-pointer" onClick={handleProgressClick}>
            <div className="h-full bg-white" style={{ width: `${progress}%` }}></div>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <button
                onClick={togglePlay}
                className="text-white hover:text-gray-300 transition-colors"
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? <Pause size={24} /> : <Play size={24} />}
              </button>

              <button
                onClick={toggleMute}
                className="text-white hover:text-gray-300 transition-colors"
                aria-label={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
              </button>
            </div>

            <div className="text-white text-sm">
              {formatTime(currentTime)} / {formatTime(duration)}
            </div>
          </div>
        </div>

        {/* Play/Pause overlay */}
        <div className="absolute inset-0 flex items-center justify-center z-10 cursor-pointer" onClick={togglePlay}>
          {!isPlaying && (
            <div className="bg-white/20 rounded-full p-6">
              <Play size={48} className="text-white" />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
