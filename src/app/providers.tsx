"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { type ReactNode, useState } from "react"
import config from "@/rainbowKitConfig"
import { WagmiProvider } from "wagmi"
import { RainbowKitProvider, lightTheme, Theme } from "@rainbow-me/rainbowkit"
import "@rainbow-me/rainbowkit/styles.css"

export function Providers(props: {children: ReactNode}) {
    const [queryClient] = useState(() => new QueryClient())

    const myCustomTheme: Theme = {
        blurs: {
            modalOverlay: 'small',
        },
        colors: {
            accentColor: '#000000',
            accentColorForeground: 'white',
            actionButtonBorder: '...',
            actionButtonBorderMobile: '...',
            actionButtonSecondaryBackground: 'white',
            closeButton: '#DE3A43',
            closeButtonBackground: '#EFE6DD',
            connectButtonBackground: '#000000',
            connectButtonBackgroundError: '#DE3A43',
            connectButtonInnerBackground: 'white',
            connectButtonText: 'white',
            connectButtonTextError: '#DE3A43',
            connectionIndicator: '#C3EA4F',
            downloadBottomCardBackground: 'white',
            downloadTopCardBackground: 'white',
            error: '#DE3A43',
            generalBorder: 'white',
            generalBorderDim: 'white',
            menuItemBackground: 'white',
            modalBackdrop: 'rgba(0, 0, 0, 0.5)',
            modalBackground: 'white',
            modalBorder: 'white',
            modalText: 'black',
            modalTextDim: 'white',
            modalTextSecondary: 'black',
            profileAction: '...',
            profileActionHover: '...',
            profileForeground: '...',
            selectedOptionBorder: '...',
            standby: '...',
        },
        fonts: {
            body: 'Inter, sans-serif',
        },
        radii: {
            actionButton: '50px',
            connectButton: '50px',
            menuButton: '50px',
            modal: '20px',
            modalMobile: '20px',
        },
        shadows: {
            connectButton: '...',
            dialog: '...',
            profileDetailsAction: '...',
            selectedOption: '...',
            selectedWallet: '...',
            walletLogo: '...',
        },
    };

    return (
        <WagmiProvider config={config} reconnectOnMount={false}>
            <QueryClientProvider client={queryClient}>
                <RainbowKitProvider theme={myCustomTheme}>
                    {props.children}
                </RainbowKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    )
}