import type { GalleryPhoto as GalleryPhotoData } from '#/data/gallery'

/** Every gallery photo is exported at these widths, as `<src>-<width>.<ext>`. */
const PHOTO_WIDTHS = [540, 1080]

function photoSrcSet(src: string, ext: 'avif' | 'webp' | 'jpg') {
  return PHOTO_WIDTHS.map((w) => `${src}-${w}.${ext} ${w}w`).join(', ')
}

interface GalleryPhotoProps {
  photo: GalleryPhotoData
  sizes: string
  className?: string
}

export function GalleryPhoto({ photo, sizes, className }: GalleryPhotoProps) {
  return (
    <picture>
      <source type="image/avif" srcSet={photoSrcSet(photo.src, 'avif')} sizes={sizes} />
      <source type="image/webp" srcSet={photoSrcSet(photo.src, 'webp')} sizes={sizes} />
      <img
        src={`${photo.src}-1080.jpg`}
        srcSet={photoSrcSet(photo.src, 'jpg')}
        sizes={sizes}
        width={photo.width}
        height={photo.height}
        alt={photo.alt}
        loading="lazy"
        decoding="async"
        className={className}
      />
    </picture>
  )
}
