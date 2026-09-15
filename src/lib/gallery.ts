import type { GalleryGroup, GalleryItem, GalleryShot } from '#/data/gallery'
import { m } from '#/paraglide/messages.js'

/**
 * `openIndex` selects a gallery item; `shotIndex` selects the photo shown full-screen.
 * An album item with `shotIndex === null` shows the album overview.
 */
export interface GalleryState {
  openIndex: number | null
  shotIndex: number | null
}

export type GalleryAction =
  | { type: 'open'; index: number }
  | { type: 'openShot'; shotIndex: number }
  | { type: 'step'; delta: number }
  | { type: 'stepShot'; delta: number }
  | { type: 'closeShot' }
  | { type: 'close' }

export const initialGalleryState: GalleryState = { openIndex: null, shotIndex: null }

const wrap = (value: number, length: number) => (value + length) % length

export function groupIndices(items: GalleryItem[], group: GalleryGroup): number[] {
  return items.flatMap((item, index) => (item.group === group ? [index] : []))
}

function openState(items: GalleryItem[], index: number): GalleryState {
  return { openIndex: index, shotIndex: items[index].shots ? null : 0 }
}

export function galleryReducer(items: GalleryItem[], state: GalleryState, action: GalleryAction): GalleryState {
  const active = state.openIndex === null ? null : items[state.openIndex]

  switch (action.type) {
    case 'open':
      return openState(items, action.index)
    case 'close':
      return initialGalleryState
    case 'openShot':
      return active ? { ...state, shotIndex: action.shotIndex } : state
    case 'step': {
      if (!active || state.openIndex === null) return state
      const ids = groupIndices(items, active.group)
      const at = ids.indexOf(state.openIndex)
      return openState(items, ids[wrap(at + action.delta, ids.length)])
    }
    case 'stepShot': {
      if (!active || state.shotIndex === null) return state
      // Single photos have no shots of their own, so stepping moves to the next item in the group.
      if (!active.shots) return galleryReducer(items, state, { type: 'step', delta: action.delta })
      return { ...state, shotIndex: wrap(state.shotIndex + action.delta, active.shots.length) }
    }
    case 'closeShot':
      // Album photos return to the album; single photos close the gallery entirely.
      return active?.shots ? { ...state, shotIndex: null } : initialGalleryState
  }
}

export interface GalleryView {
  active: GalleryItem | null
  isAlbumOpen: boolean
  isShotOpen: boolean
  groupLabel: string
  /** Position of the active item within its group, e.g. "2 / 6". */
  counter: string
  shot: (GalleryShot & { heading: string; meta: string; counter: string }) | null
}

export function getGalleryView(items: GalleryItem[], state: GalleryState): GalleryView {
  const { openIndex, shotIndex } = state
  const active = openIndex === null ? null : items[openIndex]

  if (!active || openIndex === null) {
    return { active: null, isAlbumOpen: false, isShotOpen: false, groupLabel: '', counter: '', shot: null }
  }

  const ids = groupIndices(items, active.group)
  const counter = `${ids.indexOf(openIndex) + 1} / ${ids.length}`

  let shot: GalleryView['shot'] = null
  if (shotIndex !== null) {
    shot = active.shots
      ? {
          ...active.shots[shotIndex],
          heading: active.title,
          meta: '',
          counter: `${shotIndex + 1} / ${active.shots.length}`,
        }
      : {
          label: active.title,
          caption: active.caption,
          photo: active.photo,
          heading: m.gallery_work_heading(),
          meta: active.meta,
          counter,
        }
  }

  return {
    active,
    isAlbumOpen: Boolean(active.shots) && shotIndex === null,
    isShotOpen: shot !== null,
    groupLabel: active.group === 'intl' ? m.gallery_program_label() : m.gallery_work_label(),
    counter,
    shot,
  }
}
