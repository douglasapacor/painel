import apiConfigs from "../api"

const security = {
  user: {
    new: `${apiConfigs.security}/user/new`,
    select: (id: string) => `${apiConfigs.security}/user/${id}`,
    update: (id: string) => `${apiConfigs.security}/user/${id}/update`,
    delete: (id: string) => `${apiConfigs.security}/user/${id}/delete`,
    search: `${apiConfigs.security}/user`,
    authentication: `${apiConfigs.security}/user/authentication`,
    recoveryPassword: `${apiConfigs.security}/user/recovery_password`,
    confirmRecovery: `${apiConfigs.security}/user/confirm_recovery`
  },
  group: {
    new: `${apiConfigs.security}/group/new`,
    select: (id: number) => `${apiConfigs.security}/group/${id}`,
    update: (id: number) => `${apiConfigs.security}/group/${id}/update`,
    delete: (id: number) => `${apiConfigs.security}/group/${id}/delete`,
    search: `${apiConfigs.security}/group`
  },
  feature: {
    new: `${apiConfigs.security}/feature/new`,
    select: (id: number) => `${apiConfigs.security}/feature/${id}`,
    update: (id: number) => `${apiConfigs.security}/feature/${id}/update`,
    delete: (id: number) => `${apiConfigs.security}/feature/${id}/delete`,
    search: `${apiConfigs.security}/feature`,
    actions: (id: number) => `${apiConfigs.security}/feature/actions/${id}`,
    getAll: `${apiConfigs.security}/feature/get-all`
  },
  deviceComponent: {
    new: `${apiConfigs.security}/device_component/new`,
    select: (id: number) => `${apiConfigs.security}/device_component/${id}`,
    update: (id: number) =>
      `${apiConfigs.security}/device_component/${id}/update`,
    delete: (id: number) =>
      `${apiConfigs.security}/device_component/${id}/delete`,
    search: `${apiConfigs.security}/device_component`
  },
  action: {
    new: `${apiConfigs.security}/action/new`,
    select: (id: number) => `${apiConfigs.security}/action/${id}`,
    update: (id: number) => `${apiConfigs.security}/action/${id}/update`,
    delete: (id: number) => `${apiConfigs.security}/action/${id}/delete`,
    search: `${apiConfigs.security}/action`,
    getAll: `${apiConfigs.security}/action/get-all`
  }
}

export default security
