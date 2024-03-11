import Layout from "../src/layout";
import NestedLayout from "../src/nestedLayout";
import '../public/global.css'
import '../public/queries.css'
import '@mantine/core/styles.css' 
import { MantineProvider ,CSSVariablesResolver, createTheme} from "@mantine/core";
 
export default function app({ Component, pageProps }) {

    const getLayout = Component.getLayout
    const theme = createTheme({
        other:{
            bodyColor:'var(--lightblue)'
        }
    }) 
    const resolver: CSSVariablesResolver = (theme) => ({
        variables: {
            '--mantine-color-body':theme.other.bodyColor
        },light: {
            '--mantine-color-body':theme.other.bodyColor
            
        },dark: {
            '--mantine-color-body':theme.other.bodyColor
        },
      });
    return<MantineProvider theme={theme} cssVariablesResolver={resolver}><Layout>
            {getLayout?<NestedLayout><Component {...pageProps}/></NestedLayout>:<Component {...pageProps}/>}
        </Layout></MantineProvider>
}