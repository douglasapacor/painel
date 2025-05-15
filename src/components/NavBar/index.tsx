import { Box, Container, Icon } from "@mui/material"
import type { FC } from "react"

export const NavBar: FC = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: 100,
        display: "flex",
        background: theme => theme.palette.primary.main
      }}
    >
      <Container>
        <nav style={{ width: "100%", height: 100, display: "inline-flex" }}>
          <ul
            style={{
              width: "100%",
              height: 100,
              margin: 0,
              padding: 0,
              listStyleType: "none"
            }}
          >
            <li className="list-item">
              <div className="item-container">
                <div className="item-title">
                  <a href="/site/institucional">Institucional</a>
                </div>
              </div>
            </li>

            <li className="list-item">
              <div className="item-container">
                <div className="item-title">
                  <a>Boletim</a>
                  <a>Eletrônico INR</a>
                </div>
                <div className="item-content">
                  <a href="/site/boletim/noticias">
                    <Icon>library_books</Icon>Notícias
                  </a>
                  <a href="/site/boletim/legislacoes">
                    <Icon>library_books</Icon>Legislação
                  </a>
                  <a href="/site/boletim/jurisprudencias">
                    <Icon>menu_book</Icon>
                    Jurisprudência
                  </a>
                  <a href="/site/boletim/opinioes">
                    <Icon>question_answer</Icon>
                    Opnião
                  </a>
                  <a href="/site/boletim/perguntas-e-respostas">
                    <Icon>live_help</Icon>
                    Perguntas e Respostas
                  </a>
                  <a href="/site/boletim/mensagens-editores">
                    <Icon>description</Icon>
                    Mensagen dos Editores
                  </a>
                  <a href="/site/boletim/pareceresCGJ">
                    <Icon>description</Icon>
                    Pareceres CGJ SP
                  </a>
                  <a href="/site/boletim/suplementos">
                    <Icon>format_quote</Icon>
                    Suplementos da consultoria INR
                  </a>
                  <a href="/site/boletim/historias">
                    <Icon>format_quote</Icon>
                    Histórias do ofício
                  </a>
                </div>
              </div>
            </li>

            <li className="list-item">
              <div className="item-container">
                <div className="item-title">
                  <a>Classificadores</a>
                  <a>INR</a>
                </div>
                <div className="item-content">
                  <a href="/site/classificadores/PR">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      xmlSpace="preserve"
                      width="6.35mm"
                      height="6.35mm"
                      version="1.1"
                      shapeRendering="geometricPrecision"
                      textRendering="geometricPrecision"
                      imageRendering="optimizeQuality"
                      fillRule="evenodd"
                      clipRule="evenodd"
                      viewBox="0 0 13.74 13.74"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                    >
                      <g id="Layer_x0020_1">
                        <metadata id="CorelCorpID_0Corel-Layer" />
                        <g id="_2257896274288">
                          <polygon
                            fill="none"
                            points="-0,0 13.74,0 13.74,13.74 -0,13.74 "
                          />
                          <path
                            fill="white"
                            fillRule="nonzero"
                            d="M8.02 1.15l-4.58 0c-0.63,0 -1.14,0.52 -1.14,1.15l-0.01 9.16c0,0.63 0.51,1.15 1.14,1.15l6.88 -0c0.63,0 1.15,-0.52 1.15,-1.15l0 -6.87 -3.44 -3.44zm-0.57 4.01l0 -3.15 3.15 3.15 -3.15 0zm-4.54 1.24l2.13 0c0.46,0 0.81,0.11 1.04,0.33 0.23,0.22 0.35,0.53 0.35,0.94 0,0.42 -0.13,0.75 -0.38,0.98 -0.25,0.24 -0.64,0.35 -1.15,0.35l-0.7 0 0 1.53 -1.28 0 0 -4.14zm1.28 1.77l0.31 0c0.25,0 0.42,-0.04 0.52,-0.13 0.1,-0.09 0.15,-0.2 0.15,-0.33 0,-0.13 -0.04,-0.24 -0.13,-0.33 -0.09,-0.09 -0.25,-0.14 -0.49,-0.14l-0.37 0 0 0.92zm2.58 2.37l0 -4.14 2.13 0c0.39,0 0.7,0.03 0.9,0.1 0.21,0.07 0.38,0.19 0.51,0.38 0.13,0.18 0.19,0.41 0.19,0.67 0,0.23 -0.05,0.43 -0.15,0.59 -0.1,0.17 -0.23,0.3 -0.4,0.41 -0.11,0.07 -0.26,0.12 -0.45,0.16 0.15,0.05 0.26,0.1 0.33,0.15 0.05,0.03 0.11,0.11 0.2,0.22 0.09,0.11 0.15,0.2 0.18,0.26l0.62 1.19 -1.44 0 -0.68 -1.26c-0.09,-0.16 -0.16,-0.27 -0.23,-0.32 -0.09,-0.06 -0.2,-0.1 -0.31,-0.1l-0.11 0 0 1.68 -1.28 0zm1.28 -2.46l0.54 0c0.06,0 0.17,-0.02 0.34,-0.06 0.08,-0.02 0.15,-0.06 0.21,-0.13 0.05,-0.07 0.08,-0.15 0.08,-0.24 0,-0.13 -0.04,-0.24 -0.13,-0.31 -0.08,-0.07 -0.24,-0.11 -0.48,-0.11l-0.56 0 0 0.84z"
                          />
                        </g>
                      </g>
                    </svg>
                    Classificadores INR PR
                  </a>

                  <a href="/site/classificadores/RS">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      xmlSpace="preserve"
                      width="6.35mm"
                      height="6.35mm"
                      version="1.1"
                      shapeRendering="geometricPrecision"
                      textRendering="geometricPrecision"
                      imageRendering="optimizeQuality"
                      fillRule="evenodd"
                      clipRule="evenodd"
                      viewBox="0 0 12.64 12.64"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                    >
                      <g id="Layer_x0020_1">
                        <metadata id="CorelCorpID_0Corel-Layer" />
                        <g id="_2258124358576">
                          <polygon
                            fill="none"
                            points="-0,0 12.64,0 12.64,12.64 -0,12.64 "
                          />
                          <path
                            fill="white"
                            fillRule="nonzero"
                            d="M7.37 1.05l-4.21 0c-0.58,0 -1.05,0.47 -1.05,1.05l-0.01 8.43c0,0.58 0.47,1.05 1.05,1.05l6.33 -0c0.58,0 1.05,-0.47 1.05,-1.05l0 -6.32 -3.16 -3.16zm-0.53 3.69l0 -2.9 2.9 2.9 -2.9 0zm-4.06 4.94l0 -3.8 1.96 0c0.36,0 0.64,0.03 0.83,0.09 0.19,0.06 0.35,0.18 0.47,0.35 0.12,0.17 0.18,0.38 0.18,0.62 0,0.21 -0.05,0.39 -0.14,0.55 -0.09,0.15 -0.21,0.28 -0.37,0.37 -0.1,0.06 -0.24,0.11 -0.41,0.15 0.14,0.05 0.24,0.09 0.31,0.14 0.04,0.03 0.11,0.1 0.19,0.2 0.08,0.1 0.14,0.18 0.16,0.24l0.57 1.1 -1.33 0 -0.63 -1.16c-0.08,-0.15 -0.15,-0.25 -0.21,-0.29 -0.09,-0.06 -0.18,-0.09 -0.29,-0.09l-0.1 0 0 1.54 -1.18 0zm1.18 -2.26l0.5 0c0.05,0 0.16,-0.02 0.31,-0.05 0.08,-0.02 0.14,-0.05 0.19,-0.12 0.05,-0.06 0.07,-0.14 0.07,-0.22 0,-0.12 -0.04,-0.22 -0.12,-0.28 -0.08,-0.07 -0.22,-0.1 -0.44,-0.1l-0.52 0 0 0.78zm2.43 1l1.12 -0.07c0.02,0.18 0.07,0.32 0.15,0.41 0.12,0.15 0.29,0.23 0.52,0.23 0.17,0 0.3,-0.04 0.39,-0.12 0.09,-0.08 0.14,-0.17 0.14,-0.27 0,-0.1 -0.04,-0.19 -0.13,-0.26 -0.09,-0.08 -0.29,-0.15 -0.6,-0.22 -0.52,-0.12 -0.88,-0.27 -1.1,-0.46 -0.22,-0.19 -0.33,-0.44 -0.33,-0.73 0,-0.19 0.06,-0.38 0.17,-0.55 0.11,-0.17 0.28,-0.31 0.51,-0.41 0.23,-0.1 0.54,-0.15 0.94,-0.15 0.49,0 0.86,0.09 1.11,0.27 0.26,0.18 0.41,0.47 0.46,0.86l-1.11 0.07c-0.03,-0.17 -0.09,-0.3 -0.19,-0.38 -0.09,-0.08 -0.22,-0.12 -0.39,-0.12 -0.14,0 -0.24,0.03 -0.31,0.09 -0.07,0.06 -0.1,0.13 -0.1,0.21 0,0.06 0.03,0.11 0.08,0.16 0.05,0.05 0.19,0.1 0.39,0.14 0.51,0.11 0.88,0.22 1.1,0.34 0.22,0.11 0.38,0.25 0.49,0.42 0.1,0.17 0.15,0.36 0.15,0.56 0,0.24 -0.07,0.47 -0.2,0.67 -0.14,0.21 -0.32,0.36 -0.57,0.47 -0.24,0.11 -0.55,0.16 -0.92,0.16 -0.65,0 -1.09,-0.12 -1.34,-0.37 -0.25,-0.25 -0.39,-0.57 -0.42,-0.95z"
                          />
                        </g>
                      </g>
                    </svg>
                    Classificadores INR RS
                  </a>

                  <a href="/site/classificadores/SP">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      xmlSpace="preserve"
                      width="6.35mm"
                      height="6.35mm"
                      version="1.1"
                      shapeRendering="geometricPrecision"
                      textRendering="geometricPrecision"
                      imageRendering="optimizeQuality"
                      fillRule="evenodd"
                      clipRule="evenodd"
                      viewBox="0 0 15.17 15.17"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                    >
                      <g id="Layer_x0020_1">
                        <metadata id="CorelCorpID_0Corel-Layer" />
                        <g id="_2258036997216">
                          <polygon
                            fill="none"
                            points="-0,0 15.17,0 15.17,15.17 -0,15.17 "
                          />
                          <path
                            fill="white"
                            fillRule="nonzero"
                            d="M8.85 1.26l-5.06 0c-0.7,0 -1.26,0.57 -1.26,1.26l-0.01 10.11c0,0.7 0.56,1.26 1.26,1.26l7.59 -0c0.7,0 1.26,-0.57 1.26,-1.26l0 -7.58 -3.79 -3.79zm-0.63 4.42l0 -3.48 3.48 3.48 -3.48 0zm-4.81 4.42l1.34 -0.08c0.03,0.22 0.09,0.38 0.18,0.5 0.15,0.18 0.35,0.28 0.62,0.28 0.2,0 0.36,-0.05 0.46,-0.14 0.11,-0.09 0.16,-0.2 0.16,-0.33 0,-0.12 -0.05,-0.22 -0.15,-0.32 -0.1,-0.09 -0.34,-0.18 -0.72,-0.26 -0.62,-0.14 -1.06,-0.32 -1.32,-0.55 -0.27,-0.23 -0.4,-0.52 -0.4,-0.88 0,-0.23 0.07,-0.45 0.2,-0.66 0.14,-0.21 0.34,-0.37 0.61,-0.49 0.27,-0.12 0.65,-0.18 1.12,-0.18 0.58,0 1.03,0.11 1.33,0.33 0.31,0.22 0.49,0.56 0.55,1.04l-1.33 0.08c-0.04,-0.21 -0.11,-0.36 -0.22,-0.45 -0.11,-0.09 -0.27,-0.14 -0.47,-0.14 -0.16,0 -0.29,0.04 -0.37,0.1 -0.08,0.07 -0.12,0.15 -0.12,0.25 0,0.07 0.03,0.14 0.1,0.2 0.06,0.06 0.22,0.12 0.47,0.17 0.62,0.13 1.06,0.27 1.32,0.4 0.27,0.14 0.46,0.3 0.58,0.51 0.12,0.2 0.18,0.43 0.18,0.68 0,0.29 -0.08,0.56 -0.24,0.81 -0.16,0.25 -0.39,0.43 -0.68,0.56 -0.29,0.13 -0.66,0.19 -1.1,0.19 -0.78,0 -1.31,-0.15 -1.61,-0.45 -0.3,-0.3 -0.47,-0.68 -0.51,-1.14zm4.47 -3.06l2.35 0c0.51,0 0.89,0.12 1.15,0.36 0.25,0.24 0.38,0.59 0.38,1.04 0,0.46 -0.14,0.82 -0.42,1.08 -0.28,0.26 -0.7,0.39 -1.27,0.39l-0.77 0 0 1.69 -1.42 0 0 -4.56zm1.42 1.95l0.35 0c0.27,0 0.47,-0.05 0.58,-0.14 0.11,-0.09 0.17,-0.22 0.17,-0.36 0,-0.14 -0.05,-0.26 -0.14,-0.36 -0.1,-0.1 -0.28,-0.15 -0.54,-0.15l-0.4 0 0 1.02z"
                          />
                        </g>
                      </g>
                    </svg>
                    Classificadores INR SP
                  </a>

                  <a href="/site/classificadores/atos_anteriores">
                    <Icon>library_books</Icon> Arquivos Acumulados dos
                    Classificadores SP
                  </a>
                </div>
              </div>
            </li>

            <li className="list-item">
              <div className="item-container">
                <div className="item-title">
                  <a>Salas</a>
                  <a>Temáticas</a>
                </div>
              </div>
            </li>

            <li className="list-item">
              <div className="item-container">
                <div className="item-title">
                  <a>Serviços</a>
                </div>
                <div className="item-content">
                  <a href="#">
                    <Icon>find_in_page</Icon>Consultoria INR
                  </a>
                  <a href="#">
                    <Icon>library_books</Icon>INR Cursos
                  </a>
                  <a href="#">
                    <Icon>tv</Icon>TV INR
                  </a>
                  <a href="#">
                    <Icon>receipt_long</Icon>Consultoria Notorial e Registral
                  </a>
                </div>
              </div>
            </li>

            <li className="list-item">
              <div className="item-container">
                <div className="item-title">
                  <a>Base de</a>
                  <a>Dados</a>
                </div>
              </div>
            </li>

            <li className="list-item">
              <div className="item-container">
                <div className="item-title">
                  <a>Consultoria</a>
                </div>
              </div>
            </li>

            <li className="list-item">
              <div className="item-container">
                <div className="item-title">
                  <a>Download</a>
                </div>
              </div>
            </li>

            <li className="list-item">
              <div className="item-container">
                <div className="item-title">
                  <a>INR Contábil</a>
                </div>
              </div>
            </li>
          </ul>
        </nav>
      </Container>
    </Box>
  )
}
