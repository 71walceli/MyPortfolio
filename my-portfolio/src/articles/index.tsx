import { TranslateContext, useTranslations } from "@/translations"
import { useContext } from "react"
import { translations } from "@/translations/articles"

export const articles = {
  1: {
    href: "blog/LockRightNowApp",
    date: new Date(2023, 5, 13, 15, 57),
  },
  2: {
    href: "blog/LockRightNowApp",
    date: new Date(2023, 5, 13, 15, 57),
  },
}

export const ArticlesCardListView = ({ ...props }) => {
  const { language } = useContext(TranslateContext)
  const { T } = useTranslations(translations)

  return <>
    {Object.entries(articles).map(([id, a]) => 
      <div className="col-md-4" key={id}>
        <div className="work-box">
          <a href={a.mainPicSrc} data-gallery="portfolioGallery" className="portfolio-lightbox">
            <div className="work-img">
              <img src={T[id].mainPicSrc} alt="" className="img-fluid" />
            </div>
          </a>
          <a href={a.href}> 
            <div className="work-content" key={a.href}>
              <div className="row">
                <div className="col-sm-8">
                  <h2 className="w-title">{T[id].title}</h2>
                  <div className="w-more">
                    <span className="w-ctegory">{T[id].category}</span>
                    <span className="px-2">/</span>
                    <span className="w-date">{a.date.toLocaleString(language)}</span>
                  </div>
                </div>
                <div className="col-sm-4">
                  <div className="w-like">
                    <span className="bi bi-plus-circle"></span>
                  </div>
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>
    )}
  </>
}