import security from "@/config/actions/security"
import fetchApi from "@/lib/fetch"
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next"
import colors from "../lib/colors"
import { contructor, groupType } from "./types/group"

const serverSide = async (
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<groupType>> => {
  try {
    if (!context.req.cookies["inrCredencial"])
      throw new Error("no Authentication")

    const urlSlug = context.params?.slug
    if (!urlSlug) throw new Error("no Slug")

    const content = contructor()
    content.colors = colors

    const featureList = await fetchApi.get(
      security.feature.getAll,
      context.req.cookies["inrCredencial"]
    )

    if (!featureList.success) throw new Error("no feature list")

    if (urlSlug[0] === "new") {
      content.locationIcon = "create"
      content.pageMode = "creating"
      content.features = featureList.data.map((fi: any) => ({
        id: fi.id,
        name: fi.name,
        icon: fi.icon,
        path: fi.path,
        visible: fi.visible,
        deviceComponentsName: fi.devicecomponentsname,
        checked: false,
        freeForGroup: false
      }))
    } else {
      const grp = await fetchApi.get(
        security.group.select(+urlSlug[0]),
        context.req.cookies["inrCredencial"]
      )

      if (!grp.success) throw new Error("group not finded")

      content.group.id = grp.data.id
      content.group.name = grp.data.name
      content.group.canonical = grp.data.canonical
      content.group.color = grp.data.color
      content.group.active = grp.data.active
      content.group.super = grp.data.super
      content.group.createdName = grp.data.createdByName
      content.group.createdAt = grp.data.createdAt
      content.group.updatedName = grp.data.updatedByName
      content.group.updatedAt = grp.data.updatedAt

      content.features = []

      for (let i = 0; i < featureList.data.length; i++) {
        const c = grp.data.features.find(
          (el: any) => el.id === featureList.data[i].id
        )

        content.features.push({
          id: featureList.data[i].id,
          name: featureList.data[i].name,
          icon: featureList.data[i].icon,
          path: featureList.data[i].path,
          visible: featureList.data[i].visible,
          deviceComponentsName: featureList.data[i].devicecomponentsname,
          checked: c ? true : false,
          freeForGroup: c ? c.freeforgroup : false
        })
      }
    }

    return { props: content }
  } catch (error: any) {
    console.log(error)
    return { props: contructor() }
  }
}

export { serverSide }
