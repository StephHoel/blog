import { PencilSimple, Trash } from '@phosphor-icons/react'
import { Style } from '../lib/props'

interface LinesProps {
  firstLine?: boolean
  date: string
  title: string
  content: string
  clickTrash?: () => void
  clickPencil?: () => void
}

export default function LinesList({
  firstLine = false,
  date,
  title,
  content,
  clickTrash = () => null,
  clickPencil = () => null,
}: LinesProps) {
  function firstLineStyle(firstLine: boolean) {
    return `${firstLine ? Style.table.title : ''}` + Style.table.separator
  }

  return (
    <>
      <div
        className={`${firstLine ? Style.table.title : ''}` + Style.table.icons}
      >
        <Trash
          className={
            firstLine ? Style.table.iconsInactive : Style.table.iconsActive
          }
          onClick={clickTrash}
        />
        <PencilSimple
          className={
            firstLine ? Style.table.iconsInactive : Style.table.iconsActive
          }
          onClick={clickPencil}
        />
      </div>
      <div className={firstLineStyle(firstLine)}>
        <p>{date}</p>
      </div>
      <div className={firstLineStyle(firstLine)}>
        <p>{title}</p>
      </div>
      <div className={firstLineStyle(firstLine)}>
        <p>{content}</p>
      </div>
    </>
  )
}
