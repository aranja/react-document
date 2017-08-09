import * as React from 'react'
import * as PropTypes from 'prop-types'
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

export const documentPropTypes = {
  htmlProps: PropTypes.object,
  bodyProps: PropTypes.object,
  children: PropTypes.string,
  title: PropTypes.string,
  viewport: PropTypes.string,
  head: PropTypes.node,
  footer: PropTypes.node,
  css: PropTypes.arrayOf(PropTypes.string),
  js: PropTypes.arrayOf(PropTypes.string),
  appMountId: PropTypes.string,
  app: PropTypes.string,
  window: PropTypes.object,
}

class Document extends React.Component<DocumentProps, any> {
  static childContextTypes = {
    documentProps: PropTypes.shape(documentPropTypes).isRequired,
  }

  static propTypes = documentPropTypes

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
