import * as React from 'react'
import * as PropTypes from 'prop-types'
import * as serialize from 'serialize-javascript'
import { DocumentProps, documentPropTypes } from './Document'

export abstract class DocumentPart<Props> extends React.Component<Props, any> {
  static contextTypes = {
    documentProps: PropTypes.shape(documentPropTypes).isRequired
  }

  context: {
    documentProps: DocumentProps,
  }
}

export class Html extends DocumentPart<any> {
  render() {
    return (
      <html
        {...this.context.documentProps.htmlProps}
        {...this.props}
      />
    )
  }
}

export class Head extends DocumentPart<any> {
  render() {
    const { title, viewport, head, css, js } =
      { ...this.context.documentProps, ...this.props } as DocumentProps

    return (
      <head>
        <meta charSet="utf-8" />
        {title && <title>{title}</title>}
        <meta name="viewport" content={viewport} />
        {head && head.map((element, i) => React.cloneElement(element, { key: i }))}
        {css && css.map(file => <link key={file} href={file} rel="stylesheet" />)}
        {js && js.map(file => <script key={file} src={file} defer />)}
        {this.props.children}
      </head>
    )
  }
}

export class Body extends DocumentPart<any> {
  render() {
    return (
      <body
        {...this.context.documentProps.bodyProps}
        {...this.props}
      />
    )
  }
}

export class App extends DocumentPart<{ id?: string, children?: any }> {
  render() {
    const id = this.props.id || this.context.documentProps.appMountId
    const content = this.props.children || this.context.documentProps.app
    return (
      <div id={id} dangerouslySetInnerHTML={{ __html: content || '' }} />
    )
  }
}

export class Footer extends DocumentPart<any> {
  render() {
    const { window, footer } =
      { ...this.context.documentProps, ...this.props } as DocumentProps
    const { children } = this.props
    if (!window && !footer && !children) {
      return null
    }

    return (
      <div>
        {window && (
          <script dangerouslySetInnerHTML={{ __html:
            Object.keys(window).map(key =>
              `window[${key}] = ${serialize(window[key])};`
            ).join('\n')
          }} />
        )}
        {footer &&
          footer.map((element, i) => React.cloneElement(element, { key: i }))
        }
        {children}
      </div>
    )
  }
}
