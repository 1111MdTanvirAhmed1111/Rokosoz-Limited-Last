"use client"

import type React from "react"
import { X, Play, Pause, Volume2, VolumeX, ArrowLeft } from "lucide-react"
import { useState, useRef, useEffect } from "react"
import { useIsMobile } from "@/hooks/use-mobile"
import { useLanguage } from "@/contexts/language-context"
import Image from "next/image"
import { Button } from '@/components/ui/button'

// Video data with manually set thumbnail images
const videoData = [

  {
    id: "video1",
    title: "R2D2_fenyelt2-HD",
    videoUrl: "https://res.cloudinary.com/du988zh3g/video/upload/f_auto:video/s1_scj9tz?_s=vp-2.6.0",
    thumbnailUrl: "Alukonighstahl.jpeg",
  },
    {
    id: "video2",
    title: "Triumph of the Body. Michelangelo and Sixteenth-Century Italian Draughtsmanship",
    videoUrl: "https://res.cloudinary.com/du988zh3g/video/upload/v1749112221/s2_lwaoxz.mp4",
    thumbnailUrl: "FineArts.jpeg",
  },
  {
    id: "video3",
    title: "A világ legjobb születésnapi ajándéka",
    videoUrl: "https://res.cloudinary.com/du988zh3g/video/upload/v1749112304/s3_f8tgm2.mp4",
    thumbnailUrl: "Alukonighstahl.jpeg",
  },
]

export default function HomeSection() {
  const isMobile = useIsMobile()
  const [activeVideo, setActiveVideo] = useState<string | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [showVideo, stShowVideo] = useState(false)
  const [progress, setProgress] = useState(0)
  const videoRef = useRef<HTMLVideoElement>(null)
  const { t } = useLanguage()

  const handleVideoClick = (videoId: string) => {
    setActiveVideo(videoId)
    setIsPlaying(true)
    stShowVideo(true)
  }

  const closeVideo = () => {
    setActiveVideo(null)
    setIsPlaying(false)
    setProgress(0)
    stShowVideo(false)
  }

  const getVideoById = (id: string) => {
    return videoData.find((video) => video.id === id)
  }

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

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleTimeUpdate = () => {
      const currentProgress = (video.currentTime / video.duration) * 100
      setProgress(currentProgress)
    }

    const handleVideoEnd = () => {
      setIsPlaying(false)
    }

    video.addEventListener("timeupdate", handleTimeUpdate)
    video.addEventListener("ended", handleVideoEnd)

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate)
      video.removeEventListener("ended", handleVideoEnd)
    }
  }, [activeVideo])

  return (
    <section id="home" className="h-screen flex flex-col items-center justify-center p-6 relative">
      {/* Logo */}
      <div className="mb-12">
        <Image src="/logo_text.png" alt="Rokosz" width={720} height={720} className="mx-auto" />
      </div>

      {/* Video Thumbnails */}
      <div className="flex flex-wrap justify-center gap-6 max-w-5xl mx-auto">
        {videoData.map((video) => (
          <div
            key={video.id}
            className="relative w-[280px] h-[160px] md:w-[320px] md:h-[180px] overflow-hidden cursor-pointer border border-white/20 hover:border-white/50 transition-all group"
            onClick={() => handleVideoClick(video.id)}
          >
            <img
              src={video.thumbnailUrl}
              alt={video.title}
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
            />
            <div className="absolute inset-0 bg-[#111b3f]/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Play className="text-white w-12 h-12" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-3 bg-[#111b3f]/70">
              <h3 className="text-white text-sm font-medium truncate">{video.title}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Video Player Modal */}
      {activeVideo && showVideo && (
        <div className="fixed inset-0 bg-[#111b3f] z-50 flex items-center justify-center">
          <div className="relative w-full h-full">
            <Button onClick={closeVideo} className="absolute top-[8vh] right-4 z-20">
              <X size={20} />
            </Button>

            <div className="absolute inset-0">
              <video
                ref={videoRef}
                src={getVideoById(activeVideo)?.videoUrl}
                className="w-full h-full object-contain"
                autoPlay
                onClick={togglePlay}
              >
                Your browser does not support the video tag.
              </video>
            </div>

            <button
              onClick={closeVideo}
              className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-20 flex items-center"
              aria-label="Back"
            >
              <ArrowLeft size={20} className="mr-2" />
              <span className="text-sm uppercase tracking-wider">BACK</span>
            </button>

            <div className="absolute bottom-16 left-6 flex items-center z-20">
              <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
              <h3 className="text-white text-sm uppercase tracking-wider">{getVideoById(activeVideo)?.title}</h3>
            </div>

            <div className="absolute bottom-0 left-0 right-0 bg-[#111b3f]/50 p-4 z-20">
              <div className="w-full h-1 bg-white/30 mb-4 cursor-pointer" onClick={handleProgressClick}>
                <div className="h-full bg-white" style={{ width: `${progress}%` }}></div>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <button onClick={togglePlay} className="text-white hover:text-gray-300 transition-colors">
                    {isPlaying ? <Pause size={24} /> : <Play size={24} />}
                  </button>
                  <button onClick={toggleMute} className="text-white hover:text-gray-300 transition-colors">
                    {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
                  </button>
                </div>
                <div className="text-white text-sm">
                  {videoRef.current
                    ? `${Math.floor(videoRef.current.currentTime / 60)}:${Math.floor(videoRef.current.currentTime % 60)
                        .toString()
                        .padStart(2, "0")} / ${Math.floor((videoRef.current.duration || 0) / 60)}:${Math.floor(
                        (videoRef.current.duration || 0) % 60
                      )
                        .toString()
                        .padStart(2, "0")}`
                    : "0:00 / 0:00"}
                </div>
              </div>
            </div>

            <div className="absolute inset-0 flex items-center justify-center z-10 cursor-pointer" onClick={togglePlay}>
              {!isPlaying && (
                <div className="bg-white/20 rounded-full p-6">
                  <Play size={48} className="text-white" />
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="absolute bottom-6 left-0 w-full px-6">
        <div className="flex justify-between items-center text-xs text-gray-400">
          <div>Design by: WHATTHEBRAND</div>
          <div>©2025</div>
          <div className="flex gap-4">
            <span className="hover:text-white cursor-pointer transition-colors">YOUTUBE</span>
            <span className="hover:text-white cursor-pointer transition-colors">INSTAGRAM</span>
            <span className="hover:text-white cursor-pointer transition-colors">FACEBOOK</span>
          </div>
        </div>
      </div>
    </section>
  )
}
