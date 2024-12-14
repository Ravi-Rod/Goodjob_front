import { IconName } from "@fortawesome/fontawesome-svg-core"

export type CategoryName = "ALL" | "DEMENAGEMENT" | "NETTOYAGE" | "MONTAGE DE MEUBLES" | "ELECTRONIQUE" | "TRANSPORT" | "PEINTURE" | "PETSITTING" | "BABYSITTING" | "COURSES" | "REPARATIONS" | "LUXE"

export interface Category {
    icon: IconName,
    displayName: string,
    technicalName: CategoryName,
    activated: boolean
}
