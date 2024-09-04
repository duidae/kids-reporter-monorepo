import { createContext, useContext } from 'react'
import { FontSizeLevel } from '@/app/constants'

type Article = {
  fontSize: FontSizeLevel
  images: HTMLCollection | undefined
  onFontSizeChange: () => void
  handleImgModalOpen: (
    imgProps: React.ImgHTMLAttributes<HTMLImageElement>
  ) => void
  handleImgModalClose: () => void
  handleCollectImgs: (imgs: HTMLCollection | undefined) => void
}

export const ArticleContext = createContext<Article>({
  fontSize: FontSizeLevel.NORMAL,
  images: undefined,
  onFontSizeChange: () => undefined,
  handleImgModalOpen: () => undefined,
  handleImgModalClose: () => undefined,
  handleCollectImgs: () => undefined,
})

export const useArticleContext = () => useContext(ArticleContext)
