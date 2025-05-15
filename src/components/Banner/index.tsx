import { FC } from "react"

export const Banner: FC = () => {
  return (
    <div className="slideshow-container">
      <div className="fade">
        <img src="/images/img_1.jpg" alt="1" style={{ width: "100%" }} />
      </div>

      <div className="slideshow fade">
        <img src="/images/img_2.jpg" alt="2" style={{ width: "100%" }} />
      </div>

      <div className="slideshow fade">
        <img src="/images/img_3.jpg" alt="3" style={{ width: "100%" }} />
      </div>

      <a className="prev">&#10094;</a>
      <a className="next">&#10095;</a>
    </div>
  )
}
