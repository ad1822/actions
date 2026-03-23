import { useState, useRef } from "react"

interface ImageUploadProps {
  onUploadSuccess?: (imageUrl: string) => void
}

function ImageUpload({ onUploadSuccess }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setUploading(true)
    setError(null)

    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
    const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET

    if (!cloudName || !uploadPreset) {
      setError("Cloudinary configuration missing")
      setUploading(false)
      return
    }

    const formData = new FormData()
    formData.append("file", file)
    formData.append("upload_preset", uploadPreset)

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      )

      if (!response.ok) {
        throw new Error("Upload failed")
      }

      const data = await response.json()
      setImageUrl(data.secure_url)
      onUploadSuccess?.(data.secure_url)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed")
    } finally {
      setUploading(false)
    }
  }

  const handleButtonClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="image-upload">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleUpload}
        accept="image/*"
        style={{ display: "none" }}
      />
      <button
        onClick={handleButtonClick}
        disabled={uploading}
        className="upload-button"
      >
        {uploading ? "Uploading..." : "Upload Image"}
      </button>

      {error && <p className="upload-error">{error}</p>}

      {imageUrl && (
        <div className="upload-preview">
          <img src={imageUrl} alt="Uploaded" />
        </div>
      )}
    </div>
  )
}

export default ImageUpload
