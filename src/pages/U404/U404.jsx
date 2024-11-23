import React from 'react'
import { useTranslation } from 'react-i18next'
import "./U404.scss"
import { useNavigate } from 'react-router-dom'

const U404 = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const goToHome = () => {
    navigate("/")
  }
  return (
    <section id="u-404">
      <h1>{t("u404.unfoundText")}</h1>
      <p>{t("u404.unfoundText2")}</p>
      <button onClick={goToHome}>{t("u404.back")}</button>
    </section>
  )
}

export default U404