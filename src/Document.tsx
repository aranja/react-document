import * as React from 'react'
import { Html, Head, Body, App, Footer } from './parts'

export interface DocumentProps {
  htmlProps?: { [key: string]: string }
  bodyProps?: { [key: string]: string }
  children?: string
  title?: string
  viewport?: string
  head?: React.ReactElement<any>[]
  footer?: React.ReactElement<any>[]
  css?: string[]
  js?: string[]
  appMountId?: string,
  app?: string,
  window?: { [key: string]: any }
}

class Document extends React.Component<DocumentProps, any> {
  static childContextTypes = {
    documentProps: React.PropTypes.object.isRequired,
  }

  getChildContext() {
    const props: any = Object.assign({}, this.props)
    if (props.children && !props.app) {
      props.app = props.children
      delete props.children
    }

    return {
      documentProps: props,
    }
  }

  static defaultProps = {
    app: '',
    appMountId: 'app',
    viewport: 'width=device-width, initial-scale=1',
  }

  render() {
    return (
      <Html>
        <Head>
        </Head>
        <Body>
          <App />
          <Footer />
        </Body>
      </Html>
    )
  }
}

export default Document
