export type ProductNavigationProps = {
    id?: string
}

export type OrderNavigationProps = {
    id: string
}

export declare global {
    namespace RactNavigation {
        interface RootParamList {
            home: undefined
            product: ProductNavigationProps
            order: OrderNavigationProps
            orders: undefined
        }
    }
}