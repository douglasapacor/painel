import {
  advertisingType,
  destaqueLinksType,
  inicioServerProps
} from "@/serverside/types/inicio"
import { Banner, SiteFrame } from "@/components"
import BannerHighlight from "@/components/BannerHighlight"
import Highlight from "@/components/Highlight"
import serverSide from "../../serverside/inicio"
import { Box, Container, Grid } from "@mui/material"
import { GetServerSideProps, NextPage } from "next"

export const getServerSideProps: GetServerSideProps<
  inicioServerProps
> = async context => {
  return serverSide(context)
}

const inicio: NextPage<inicioServerProps> = props => {
  const HighlightItems = (params: {
    destaques: destaqueLinksType[]
    publicidades: advertisingType[]
  }) => {
    let bannerIndex = 0

    const itensWithBanners = params.destaques.map((dtq, i) => {
      const elements = [
        <Highlight
          key={`highlight-item-${i}`}
          img={dtq.content ? dtq.content[0].img : ""}
          label={dtq.label}
          titulo={dtq.content ? dtq.content[0].titulo : ""}
        />
      ]

      if ((i + 1) % 3 === 0 && bannerIndex < params.publicidades.length) {
        elements.push(
          <BannerHighlight
            key={`banner-${bannerIndex}`}
            textImg={params.publicidades[bannerIndex].texto}
          />
        )
        bannerIndex++
      }

      return elements
    })

    return <>{itensWithBanners}</>
  }

  return (
    <SiteFrame>
      <Banner />
      <Container>
        <Box sx={{ paddingY: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <Box
                sx={{
                  widht: "100%",
                  textAlign: "center",
                  fontFamily: "RobotoSlab !important",
                  marginBottom: 4,
                  color: "#006092",
                  fontWeight: "500",
                  lineHeight: "1.1",
                  fontSize: "1.9rem"
                }}
              >
                <h4>DESTAQUES</h4>
              </Box>
            </Grid>

            <HighlightItems
              destaques={props.links}
              publicidades={props.publicidade}
            />
          </Grid>
        </Box>
      </Container>
    </SiteFrame>
  )
}

export default inicio
